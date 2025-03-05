import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      const sessionExpireTime = parseInt(process.env.SESSION_EXPIRE_TIME || "86400"); // Mặc định là 1 ngày

      if (!existingUser) {
        // Tạo mới người dùng nếu chưa tồn tại
        const createdUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            avatar: user.image,
            providerId: account?.providerAccountId || "",
            lastLoginTime: new Date(),
            role: "user", // Mặc định role là user
          },
        });

        // Tạo session cho người dùng
        await prisma.userSessionPoint.create({
          data: {
            userId: createdUser.id,
            sessionToken: account?.access_token || "",
            deviceInfo: account?.providerAccountId || "",
            expiresAt: new Date(new Date().getTime() + sessionExpireTime * 1000), // Set time expire
          },
        });
      } else {
        // Nếu người dùng đã tồn tại, cập nhật thông tin và token
        await prisma.user.update({
          where: { email: user.email },
          data: {
            lastLoginTime: new Date(),
          },
        });

        // Xóa tất cả các phiên cũ và tạo phiên mới
        await prisma.userSessionPoint.deleteMany({
          where: {
            userId: existingUser.id,
            sessionToken: {
              not: account?.access_token, // Tìm các phiên không phải phiên hiện tại
            },
          },
        });

        await prisma.userSessionPoint.create({
          data: {
            userId: existingUser.id,
            sessionToken: account?.access_token || "",
            deviceInfo: account?.providerAccountId || "",
            expiresAt: new Date(new Date().getTime() + sessionExpireTime * 1000), // Set time expire
          },
        });
      }

      return true;
    },

    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role;

        const session = await prisma.userSessionPoint.findFirst({
          where: {
            userId: dbUser.id,
            sessionToken: token.currentSessionToken,
          },
        });

        if (!session || new Date(session.expiresAt) < new Date()) {
          // Nếu session hết hạn hoặc không tồn tại, yêu cầu đăng nhập lại
          console.log("Session hết hạn hoặc không hợp lệ.");
          return {}; // Trả về token rỗng, yêu cầu đăng nhập lại
        }
      } else {
        console.log("User không tồn tại, xoá token...");
        return {}; // Trả về token rỗng => mất session
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.currentSessionToken = token.currentSessionToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.SESSION_EXPIRE_TIME || "86400"), // Max age theo .env
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

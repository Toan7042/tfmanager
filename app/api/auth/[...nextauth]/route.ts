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

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            avatar: user.image,
            providerId: account?.providerAccountId || "",
            lastLoginTime: new Date(),
            role: "user",
          },
        });
      } else {
        await prisma.user.update({
          where: { email: user.email },
          data: { lastLoginTime: new Date() },
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
      } else {
        console.log("User không tồn tại, xoá token...");
        return {};
      }
    
      return token;
    },    

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "@/lib/prisma";

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (!user.email) return false;

//       const existingUser = await prisma.user.findUnique({
//         where: { email: user.email },
//       });

//       if (!existingUser) {
//         await prisma.user.create({
//           data: {
//             email: user.email,
//             name: user.name,
//             avatar: user.image,
//             providerId: account?.providerAccountId || "",
//             lastLoginTime: new Date(),
//             role: "user", // Mặc định user có role "user"
//           },
//         });
//       } else {
//         await prisma.user.update({
//           where: { email: user.email },
//           data: { lastLoginTime: new Date() },
//         });
//       }

//       return true;
//     },

//     async jwt({ token }) {
//       // Kiểm tra user trong database mỗi lần refresh token
//       const dbUser = await prisma.user.findUnique({
//         where: { email: token.email! },
//       });
    
//       if (dbUser) {
//         token.id = dbUser.id;
//         token.role = dbUser.role; // ✅ Lưu role vào token
//       } else {
//         // Nếu user đã bị xóa khỏi database, xóa session ngay lập tức
//         console.log("User không tồn tại, xoá token...");
//         return {}; // Trả về token rỗng => mất session
//       }
    
//       console.log("Token in JWT callback:", token); // Debug token
//       return token;
//     },    

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string; // ✅ Lưu role vào session
//       }
//       return session;
//     },
//   },
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

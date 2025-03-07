import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const handler = NextAuth({
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

      const sessionExpireTime = parseInt(process.env.SESSION_EXPIRE_TIME || "86400"); // 1 ngày

      if (!existingUser) {
        const createdUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            avatar: user.image,
            providerId: account?.providerAccountId || "",
            lastLoginTime: new Date(),
            role: "user",
          },
        });

        await prisma.userSessionPoint.create({
          data: {
            userId: createdUser.id,
            sessionToken: account?.access_token || "",
            deviceInfo: account?.providerAccountId || "",
            expiresAt: new Date(Date.now() + sessionExpireTime * 1000),
          },
        });
      } else {
        await prisma.user.update({
          where: { email: user.email },
          data: { lastLoginTime: new Date() },
        });

        await prisma.userSessionPoint.deleteMany({
          where: {
            userId: existingUser.id,
            sessionToken: { not: account?.access_token },
          },
        });

        await prisma.userSessionPoint.create({
          data: {
            userId: existingUser.id,
            sessionToken: account?.access_token || "",
            deviceInfo: account?.providerAccountId || "",
            expiresAt: new Date(Date.now() + sessionExpireTime * 1000),
          },
        });
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.email) return {};

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role;

        const session = await prisma.userSessionPoint.findFirst({
          where: {
            userId: dbUser.id,
            sessionToken: token.currentSessionToken as string | undefined,
          },
        });

        if (!session || new Date(session.expiresAt) < new Date()) {
          console.log("Session expired or invalid.");
          return {};
        }
      } else {
        console.log("User does not exist, removing token...");
        return {};
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.currentSessionToken = token.currentSessionToken as string | undefined;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.SESSION_EXPIRE_TIME || "86400"),
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
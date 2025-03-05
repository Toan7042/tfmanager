import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // Thêm role vào user
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

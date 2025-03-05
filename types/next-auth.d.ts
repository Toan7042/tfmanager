import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      currentSessionToken?: string; // Thêm trường currentSessionToken vào session
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    currentSessionToken?: string; // Thêm trường currentSessionToken vào user
  }
}

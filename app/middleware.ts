import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl;
    const token = req.nextauth.token;

    console.log("Middleware running - URL:", url.pathname);
    console.log("Token in middleware:", token);

    const role = token?.role;
    const userId = token?.id ? Number(token.id) : null;

    if (!role || !userId) {
      console.log("⚠️ Không tìm thấy role hoặc userId trong token. Chuyển hướng về /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Cập nhật trạng thái Online qua Pusher
    try {
      await pusher.trigger("community-chat", "user-status", {
        userId,
        isOnline: true,
      });
      console.log(`User ${userId} is Online - Pusher notified`);
    } catch (error) {
      console.error("Error notifying Pusher of online status:", error);
    }

    // Chặn User truy cập trang Admin
    if (url.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Authorized check - Token:", token);
        return !!token; // Chỉ cho phép user đăng nhập
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/mydevices/:path*"], // Bảo vệ trang Admin & Dashboard
};
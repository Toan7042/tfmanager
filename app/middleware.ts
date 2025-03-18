import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl;
    const token = req.nextauth.token;

    console.log("Middleware running - URL:", url.pathname);
    console.log("Token in middleware:", token);

    const role = token?.role;

    if (!role) {
      console.log("⚠️ Không tìm thấy role trong token. Chuyển hướng về /login");
      return NextResponse.redirect(new URL("/login", req.url));
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

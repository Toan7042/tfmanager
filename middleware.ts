import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl;
    const token = req.nextauth.token;
    const role = token?.role;

    console.log("Middleware running - URL:", url.pathname);
    console.log("User role:", role || "Chưa đăng nhập");

    // Chặn truy cập trang /admin nếu không phải admin
    if (url.pathname.startsWith("/admin") && role !== "admin") {
      console.log("Người dùng không có quyền admin, chuyển hướng về trang chủ...");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Bảo mật: Chặn API nếu không có token
    if (url.pathname.startsWith("/api") && !token) {
      console.log("Người dùng chưa đăng nhập, chặn API...");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Token kiểm tra trong middleware:", token);
        return !!token; // Nếu không có token, chặn luôn
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/community/:path*",
    "/mydevices/:path*",
    "/servicepackage/:path*",
    "/profile/:path*",
    "/api/:path*", // Chặn API nếu chưa đăng nhập
  ],
};


// import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     const url = req.nextUrl;
//     const role = req.nextauth.token?.role;

//     console.log("Middleware running - URL:", url.pathname);
//     console.log("User role:", role);

//     if (url.pathname.startsWith("/admin") && role !== "admin") {
//       console.log("Redirecting non-admin user to home...");
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log("Token in middleware:", token);
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ["/admin/:path*", "/dashboard/:path*", "/community/:path*", "/mydevices/:path*", "/servicepackage/:path*", "/profile/:path*"],
// };

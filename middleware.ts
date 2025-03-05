import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl;
    const role = req.nextauth.token?.role;

    console.log("Middleware running - URL:", url.pathname);
    console.log("User role:", role);

    if (url.pathname.startsWith("/admin") && role !== "admin") {
      console.log("Redirecting non-admin user to home...");
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Token in middleware:", token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

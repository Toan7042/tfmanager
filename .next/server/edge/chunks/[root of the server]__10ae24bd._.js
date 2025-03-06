(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__10ae24bd._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/middleware.js [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["withAuth"])(function middleware(req) {
    const url = req.nextUrl;
    const token = req.nextauth.token;
    const role = token?.role;
    console.log("Middleware running - URL:", url.pathname);
    console.log("User role:", role || "Chưa đăng nhập");
    // Chặn truy cập trang /admin nếu không phải admin
    if (url.pathname.startsWith("/admin") && role !== "admin") {
        console.log("Người dùng không có quyền admin, chuyển hướng về trang chủ...");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", req.url));
    }
    // Bảo mật: Chặn API nếu không có token
    if (url.pathname.startsWith("/api") && !token) {
        console.log("Người dùng chưa đăng nhập, chặn API...");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}, {
    callbacks: {
        authorized: ({ token })=>{
            console.log("Token kiểm tra trong middleware:", token);
            return !!token; // Nếu không có token, chặn luôn
        }
    }
});
const config = {
    matcher: [
        "/admin/:path*",
        "/dashboard/:path*",
        "/community/:path*",
        "/mydevices/:path*",
        "/servicepackage/:path*",
        "/profile/:path*",
        "/api/:path*"
    ]
}; // import { NextResponse } from "next/server";
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
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__10ae24bd._.js.map
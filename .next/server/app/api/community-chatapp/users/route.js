/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/community-chatapp/users/route";
exports.ids = ["app/api/community-chatapp/users/route"];
exports.modules = {

/***/ "(rsc)/./app/api/community-chatapp/users/route.ts":
/*!**************************************************!*\
  !*** ./app/api/community-chatapp/users/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var pusher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pusher */ \"(rsc)/./node_modules/pusher/lib/pusher.js\");\n/* harmony import */ var pusher__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(pusher__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst pusher = new (pusher__WEBPACK_IMPORTED_MODULE_4___default())({\n    appId: process.env.PUSHER_APP_ID,\n    key: \"cb2abd19936ed09d7892\",\n    secret: process.env.PUSHER_SECRET,\n    cluster: \"ap1\",\n    useTLS: true\n});\nasync function GET() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const users = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].user.findMany({\n        include: {\n            sessions: true\n        }\n    });\n    const usersWithStatus = users.map((user)=>({\n            ...user,\n            isOnline: user.sessions.some((s)=>new Date(s.expiresAt) > new Date())\n        }));\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(usersWithStatus);\n}\n// Cập nhật trạng thái khi user online/offline (gọi từ middleware hoặc client)\nasync function POST(request) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const { userId, isOnline } = await request.json();\n    await pusher.trigger(\"community-chat\", \"user-status\", {\n        userId,\n        isOnline\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvbW11bml0eS1jaGF0YXBwL3VzZXJzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUEyQztBQUNFO0FBQ0o7QUFDUDtBQUNOO0FBRTVCLE1BQU1LLFNBQVMsSUFBSUQsK0NBQU1BLENBQUM7SUFDeEJFLE9BQU9DLFFBQVFDLEdBQUcsQ0FBQ0MsYUFBYTtJQUNoQ0MsS0FBS0gsc0JBQWtDO0lBQ3ZDSyxRQUFRTCxRQUFRQyxHQUFHLENBQUNLLGFBQWE7SUFDakNDLFNBQVNQLEtBQXNDO0lBQy9DUyxRQUFRO0FBQ1Y7QUFFTyxlQUFlQztJQUNwQixNQUFNQyxVQUFVLE1BQU1qQiwyREFBZ0JBLENBQUNDLGtEQUFXQTtJQUNsRCxJQUFJLENBQUNnQixTQUFTLE9BQU9sQixxREFBWUEsQ0FBQ21CLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQWUsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFFaEYsTUFBTUMsUUFBUSxNQUFNbkIsbURBQU1BLENBQUNvQixJQUFJLENBQUNDLFFBQVEsQ0FBQztRQUN2Q0MsU0FBUztZQUFFQyxVQUFVO1FBQUs7SUFDNUI7SUFFQSxNQUFNQyxrQkFBa0JMLE1BQU1NLEdBQUcsQ0FBQyxDQUFDTCxPQUFVO1lBQzNDLEdBQUdBLElBQUk7WUFDUE0sVUFBVU4sS0FBS0csUUFBUSxDQUFDSSxJQUFJLENBQUMsQ0FBQ0MsSUFBTSxJQUFJQyxLQUFLRCxFQUFFRSxTQUFTLElBQUksSUFBSUQ7UUFDbEU7SUFFQSxPQUFPaEMscURBQVlBLENBQUNtQixJQUFJLENBQUNRO0FBQzNCO0FBRUEsOEVBQThFO0FBQ3ZFLGVBQWVPLEtBQUtDLE9BQWdCO0lBQ3pDLE1BQU1qQixVQUFVLE1BQU1qQiwyREFBZ0JBLENBQUNDLGtEQUFXQTtJQUNsRCxJQUFJLENBQUNnQixTQUFTLE9BQU9sQixxREFBWUEsQ0FBQ21CLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQWUsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFFaEYsTUFBTSxFQUFFZSxNQUFNLEVBQUVQLFFBQVEsRUFBRSxHQUFHLE1BQU1NLFFBQVFoQixJQUFJO0lBRS9DLE1BQU1kLE9BQU9nQyxPQUFPLENBQUMsa0JBQWtCLGVBQWU7UUFDcEREO1FBQ0FQO0lBQ0Y7SUFFQSxPQUFPN0IscURBQVlBLENBQUNtQixJQUFJLENBQUM7UUFBRW1CLFNBQVM7SUFBSztBQUMzQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcYXBwXFxhcGlcXGNvbW11bml0eS1jaGF0YXBwXFx1c2Vyc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcclxuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcbmltcG9ydCBQdXNoZXIgZnJvbSBcInB1c2hlclwiO1xyXG5cclxuY29uc3QgcHVzaGVyID0gbmV3IFB1c2hlcih7XHJcbiAgYXBwSWQ6IHByb2Nlc3MuZW52LlBVU0hFUl9BUFBfSUQhLFxyXG4gIGtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUFVTSEVSX0tFWSEsXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5QVVNIRVJfU0VDUkVUISxcclxuICBjbHVzdGVyOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19QVVNIRVJfQ0xVU1RFUiEsXHJcbiAgdXNlVExTOiB0cnVlLFxyXG59KTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gIGlmICghc2Vzc2lvbikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuXHJcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kTWFueSh7XHJcbiAgICBpbmNsdWRlOiB7IHNlc3Npb25zOiB0cnVlIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHVzZXJzV2l0aFN0YXR1cyA9IHVzZXJzLm1hcCgodXNlcikgPT4gKHtcclxuICAgIC4uLnVzZXIsXHJcbiAgICBpc09ubGluZTogdXNlci5zZXNzaW9ucy5zb21lKChzKSA9PiBuZXcgRGF0ZShzLmV4cGlyZXNBdCkgPiBuZXcgRGF0ZSgpKSxcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1c2Vyc1dpdGhTdGF0dXMpO1xyXG59XHJcblxyXG4vLyBD4bqtcCBuaOG6rXQgdHLhuqFuZyB0aMOhaSBraGkgdXNlciBvbmxpbmUvb2ZmbGluZSAoZ+G7jWkgdOG7qyBtaWRkbGV3YXJlIGhv4bq3YyBjbGllbnQpXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcbiAgaWYgKCFzZXNzaW9uKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG5cclxuICBjb25zdCB7IHVzZXJJZCwgaXNPbmxpbmUgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICBhd2FpdCBwdXNoZXIudHJpZ2dlcihcImNvbW11bml0eS1jaGF0XCIsIFwidXNlci1zdGF0dXNcIiwge1xyXG4gICAgdXNlcklkLFxyXG4gICAgaXNPbmxpbmUsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiUHVzaGVyIiwicHVzaGVyIiwiYXBwSWQiLCJwcm9jZXNzIiwiZW52IiwiUFVTSEVSX0FQUF9JRCIsImtleSIsIk5FWFRfUFVCTElDX1BVU0hFUl9LRVkiLCJzZWNyZXQiLCJQVVNIRVJfU0VDUkVUIiwiY2x1c3RlciIsIk5FWFRfUFVCTElDX1BVU0hFUl9DTFVTVEVSIiwidXNlVExTIiwiR0VUIiwic2Vzc2lvbiIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVzZXJzIiwidXNlciIsImZpbmRNYW55IiwiaW5jbHVkZSIsInNlc3Npb25zIiwidXNlcnNXaXRoU3RhdHVzIiwibWFwIiwiaXNPbmxpbmUiLCJzb21lIiwicyIsIkRhdGUiLCJleHBpcmVzQXQiLCJQT1NUIiwicmVxdWVzdCIsInVzZXJJZCIsInRyaWdnZXIiLCJzdWNjZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/community-chatapp/users/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account }) {\n            if (!user.email) return false;\n            const existingUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                where: {\n                    email: user.email\n                }\n            });\n            const sessionExpireTime = parseInt(process.env.SESSION_EXPIRE_TIME || \"86400\"); // 1 ngày\n            if (!existingUser) {\n                const createdUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.create({\n                    data: {\n                        email: user.email,\n                        name: user.name,\n                        avatar: user.image,\n                        providerId: account?.providerAccountId || \"\",\n                        lastLoginTime: new Date(),\n                        role: \"user\"\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.create({\n                    data: {\n                        userId: createdUser.id,\n                        sessionToken: account?.access_token || \"\",\n                        deviceInfo: account?.providerAccountId || \"\",\n                        expiresAt: new Date(Date.now() + sessionExpireTime * 1000)\n                    }\n                });\n            } else {\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.update({\n                    where: {\n                        email: user.email\n                    },\n                    data: {\n                        lastLoginTime: new Date()\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.deleteMany({\n                    where: {\n                        userId: existingUser.id,\n                        sessionToken: {\n                            not: account?.access_token\n                        }\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.create({\n                    data: {\n                        userId: existingUser.id,\n                        sessionToken: account?.access_token || \"\",\n                        deviceInfo: account?.providerAccountId || \"\",\n                        expiresAt: new Date(Date.now() + sessionExpireTime * 1000)\n                    }\n                });\n            }\n            return true;\n        },\n        async jwt ({ token }) {\n            if (!token.email) return {};\n            const dbUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                where: {\n                    email: token.email\n                }\n            });\n            if (dbUser) {\n                token.id = dbUser.id;\n                token.role = dbUser.role;\n                const session = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.findFirst({\n                    where: {\n                        userId: dbUser.id,\n                        sessionToken: token.currentSessionToken\n                    }\n                });\n                if (!session || new Date(session.expiresAt) < new Date()) {\n                    console.log(\"Session expired or invalid.\");\n                    return {};\n                }\n            } else {\n                console.log(\"User does not exist, removing token...\");\n                return {};\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.currentSessionToken = token.currentSessionToken;\n            }\n            return session;\n        }\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: parseInt(process.env.SESSION_EXPIRE_TIME || \"86400\")\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUU7d0JBQ2pCQyxjQUFjUyxNQUFNSSxtQkFBbUI7b0JBQ3pDO2dCQUNGO2dCQUVBLElBQUksQ0FBQ0YsV0FBVyxJQUFJaEIsS0FBS2dCLFFBQVFSLFNBQVMsSUFBSSxJQUFJUixRQUFRO29CQUN4RG1CLFFBQVFDLEdBQUcsQ0FBQztvQkFDWixPQUFPLENBQUM7Z0JBQ1Y7WUFDRixPQUFPO2dCQUNMRCxRQUFRQyxHQUFHLENBQUM7Z0JBQ1osT0FBTyxDQUFDO1lBQ1Y7WUFFQSxPQUFPTjtRQUNUO1FBRUEsTUFBTUUsU0FBUSxFQUFFQSxPQUFPLEVBQUVGLEtBQUssRUFBRTtZQUM5QixJQUFJRSxRQUFRbEMsSUFBSSxFQUFFO2dCQUNoQmtDLFFBQVFsQyxJQUFJLENBQUNzQixFQUFFLEdBQUdVLE1BQU1WLEVBQUU7Z0JBQzFCWSxRQUFRbEMsSUFBSSxDQUFDbUIsSUFBSSxHQUFHYSxNQUFNYixJQUFJO2dCQUM5QmUsUUFBUWxDLElBQUksQ0FBQ29DLG1CQUFtQixHQUFHSixNQUFNSSxtQkFBbUI7WUFDOUQ7WUFDQSxPQUFPRjtRQUNUO0lBQ0Y7SUFDQUEsU0FBUztRQUNQSyxVQUFVO1FBQ1ZDLFFBQVFqQyxTQUFTZCxRQUFRQyxHQUFHLENBQUNjLG1CQUFtQixJQUFJO0lBQ3REO0lBQ0FpQyxRQUFRaEQsUUFBUUMsR0FBRyxDQUFDZ0QsZUFBZTtBQUNyQyxFQUFFO0FBRUYsaUVBQWV2RCxnREFBUUEsQ0FBQ0csWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcbGliXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCwgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcclxuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEdvb2dsZVByb3ZpZGVyKHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQhLFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUISxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50IH0pIHtcclxuICAgICAgaWYgKCF1c2VyLmVtYWlsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICB3aGVyZTogeyBlbWFpbDogdXNlci5lbWFpbCB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHNlc3Npb25FeHBpcmVUaW1lID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuU0VTU0lPTl9FWFBJUkVfVElNRSB8fCBcIjg2NDAwXCIpOyAvLyAxIG5nw6B5XHJcblxyXG4gICAgICBpZiAoIWV4aXN0aW5nVXNlcikge1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuY3JlYXRlKHtcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgYXZhdGFyOiB1c2VyLmltYWdlLFxyXG4gICAgICAgICAgICBwcm92aWRlcklkOiBhY2NvdW50Py5wcm92aWRlckFjY291bnRJZCB8fCBcIlwiLFxyXG4gICAgICAgICAgICBsYXN0TG9naW5UaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICByb2xlOiBcInVzZXJcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHByaXNtYS5zZXNzaW9uUG9pbnQuY3JlYXRlKHtcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdXNlcklkOiBjcmVhdGVkVXNlci5pZCxcclxuICAgICAgICAgICAgc2Vzc2lvblRva2VuOiBhY2NvdW50Py5hY2Nlc3NfdG9rZW4gfHwgXCJcIixcclxuICAgICAgICAgICAgZGV2aWNlSW5mbzogYWNjb3VudD8ucHJvdmlkZXJBY2NvdW50SWQgfHwgXCJcIixcclxuICAgICAgICAgICAgZXhwaXJlc0F0OiBuZXcgRGF0ZShEYXRlLm5vdygpICsgc2Vzc2lvbkV4cGlyZVRpbWUgKiAxMDAwKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgcHJpc21hLnVzZXIudXBkYXRlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiB1c2VyLmVtYWlsIH0sXHJcbiAgICAgICAgICBkYXRhOiB7IGxhc3RMb2dpblRpbWU6IG5ldyBEYXRlKCkgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgcHJpc21hLnNlc3Npb25Qb2ludC5kZWxldGVNYW55KHtcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogZXhpc3RpbmdVc2VyLmlkLFxyXG4gICAgICAgICAgICBzZXNzaW9uVG9rZW46IHsgbm90OiBhY2NvdW50Py5hY2Nlc3NfdG9rZW4gfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHByaXNtYS5zZXNzaW9uUG9pbnQuY3JlYXRlKHtcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdXNlcklkOiBleGlzdGluZ1VzZXIuaWQsXHJcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogYWNjb3VudD8uYWNjZXNzX3Rva2VuIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIGRldmljZUluZm86IGFjY291bnQ/LnByb3ZpZGVyQWNjb3VudElkIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdDogbmV3IERhdGUoRGF0ZS5ub3coKSArIHNlc3Npb25FeHBpcmVUaW1lICogMTAwMCksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgand0KHsgdG9rZW4gfSkge1xyXG4gICAgICBpZiAoIXRva2VuLmVtYWlsKSByZXR1cm4ge307XHJcblxyXG4gICAgICBjb25zdCBkYlVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICB3aGVyZTogeyBlbWFpbDogdG9rZW4uZW1haWwgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGJVc2VyKSB7XHJcbiAgICAgICAgdG9rZW4uaWQgPSBkYlVzZXIuaWQ7XHJcbiAgICAgICAgdG9rZW4ucm9sZSA9IGRiVXNlci5yb2xlO1xyXG5cclxuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgcHJpc21hLnNlc3Npb25Qb2ludC5maW5kRmlyc3Qoe1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgdXNlcklkOiBkYlVzZXIuaWQsXHJcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogdG9rZW4uY3VycmVudFNlc3Npb25Ub2tlbiBhcyBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXNlc3Npb24gfHwgbmV3IERhdGUoc2Vzc2lvbi5leHBpcmVzQXQpIDwgbmV3IERhdGUoKSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJTZXNzaW9uIGV4cGlyZWQgb3IgaW52YWxpZC5cIik7XHJcbiAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBkb2VzIG5vdCBleGlzdCwgcmVtb3ZpbmcgdG9rZW4uLi5cIik7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlIGFzIHN0cmluZztcclxuICAgICAgICBzZXNzaW9uLnVzZXIuY3VycmVudFNlc3Npb25Ub2tlbiA9IHRva2VuLmN1cnJlbnRTZXNzaW9uVG9rZW4gYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gICAgbWF4QWdlOiBwYXJzZUludChwcm9jZXNzLmVudi5TRVNTSU9OX0VYUElSRV9USU1FIHx8IFwiODY0MDBcIiksXHJcbiAgfSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKGF1dGhPcHRpb25zKTsiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsInByaXNtYSIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwiY2FsbGJhY2tzIiwic2lnbkluIiwidXNlciIsImFjY291bnQiLCJlbWFpbCIsImV4aXN0aW5nVXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInNlc3Npb25FeHBpcmVUaW1lIiwicGFyc2VJbnQiLCJTRVNTSU9OX0VYUElSRV9USU1FIiwiY3JlYXRlZFVzZXIiLCJjcmVhdGUiLCJkYXRhIiwibmFtZSIsImF2YXRhciIsImltYWdlIiwicHJvdmlkZXJJZCIsInByb3ZpZGVyQWNjb3VudElkIiwibGFzdExvZ2luVGltZSIsIkRhdGUiLCJyb2xlIiwic2Vzc2lvblBvaW50IiwidXNlcklkIiwiaWQiLCJzZXNzaW9uVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJkZXZpY2VJbmZvIiwiZXhwaXJlc0F0Iiwibm93IiwidXBkYXRlIiwiZGVsZXRlTWFueSIsIm5vdCIsImp3dCIsInRva2VuIiwiZGJVc2VyIiwic2Vzc2lvbiIsImZpbmRGaXJzdCIsImN1cnJlbnRTZXNzaW9uVG9rZW4iLCJjb25zb2xlIiwibG9nIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQTtBQUMvQixpRUFBZUMsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbmV4cG9ydCBkZWZhdWx0IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_community_chatapp_users_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/community-chatapp/users/route.ts */ \"(rsc)/./app/api/community-chatapp/users/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/community-chatapp/users/route\",\n        pathname: \"/api/community-chatapp/users\",\n        filename: \"route\",\n        bundlePath: \"app/api/community-chatapp/users/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\TON\\\\Desktop\\\\WEBCODE\\\\NextJS\\\\tf-manager\\\\app\\\\api\\\\community-chatapp\\\\users\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_community_chatapp_users_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjb21tdW5pdHktY2hhdGFwcCUyRnVzZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZjb21tdW5pdHktY2hhdGFwcCUyRnVzZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY29tbXVuaXR5LWNoYXRhcHAlMkZ1c2VycyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNUT04lNUNEZXNrdG9wJTVDV0VCQ09ERSU1Q05leHRKUyU1Q3RmLW1hbmFnZXIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1RPTiU1Q0Rlc2t0b3AlNUNXRUJDT0RFJTVDTmV4dEpTJTVDdGYtbWFuYWdlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDa0Q7QUFDL0g7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFRPTlxcXFxEZXNrdG9wXFxcXFdFQkNPREVcXFxcTmV4dEpTXFxcXHRmLW1hbmFnZXJcXFxcYXBwXFxcXGFwaVxcXFxjb21tdW5pdHktY2hhdGFwcFxcXFx1c2Vyc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY29tbXVuaXR5LWNoYXRhcHAvdXNlcnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jb21tdW5pdHktY2hhdGFwcC91c2Vyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY29tbXVuaXR5LWNoYXRhcHAvdXNlcnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxUT05cXFxcRGVza3RvcFxcXFxXRUJDT0RFXFxcXE5leHRKU1xcXFx0Zi1tYW5hZ2VyXFxcXGFwcFxcXFxhcGlcXFxcY29tbXVuaXR5LWNoYXRhcHBcXFxcdXNlcnNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/tr46","vendor-chunks/tweetnacl","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/pusher","vendor-chunks/event-target-shim","vendor-chunks/webidl-conversions","vendor-chunks/abort-controller","vendor-chunks/tweetnacl-util","vendor-chunks/is-base64"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
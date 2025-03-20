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
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/.pnpm/next-auth@4.24.11_next@15.2_5b96aa69bc13f76b3da5e9f27c639322/node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/.pnpm/next-auth@4.24.11_next@15.2_5b96aa69bc13f76b3da5e9f27c639322/node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account }) {\n            if (!user.email) return false;\n            const existingUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                where: {\n                    email: user.email\n                }\n            });\n            const sessionExpireTime = parseInt(process.env.SESSION_EXPIRE_TIME || \"86400\"); // 1 ngày\n            if (!existingUser) {\n                const createdUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.create({\n                    data: {\n                        email: user.email,\n                        name: user.name,\n                        avatar: user.image,\n                        providerId: account?.providerAccountId || \"\",\n                        lastLoginTime: new Date(),\n                        role: \"user\"\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.create({\n                    data: {\n                        userId: createdUser.id,\n                        sessionToken: account?.access_token || \"\",\n                        deviceInfo: account?.providerAccountId || \"\",\n                        expiresAt: new Date(Date.now() + sessionExpireTime * 1000)\n                    }\n                });\n            } else {\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.update({\n                    where: {\n                        email: user.email\n                    },\n                    data: {\n                        lastLoginTime: new Date()\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.deleteMany({\n                    where: {\n                        userId: existingUser.id,\n                        sessionToken: {\n                            not: account?.access_token\n                        }\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.create({\n                    data: {\n                        userId: existingUser.id,\n                        sessionToken: account?.access_token || \"\",\n                        deviceInfo: account?.providerAccountId || \"\",\n                        expiresAt: new Date(Date.now() + sessionExpireTime * 1000)\n                    }\n                });\n            }\n            return true;\n        },\n        async jwt ({ token }) {\n            if (!token.email) return {};\n            const dbUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                where: {\n                    email: token.email\n                }\n            });\n            if (dbUser) {\n                token.id = dbUser.id;\n                token.role = dbUser.role;\n                const session = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.findFirst({\n                    where: {\n                        userId: dbUser.id,\n                        sessionToken: token.currentSessionToken\n                    }\n                });\n                if (!session || new Date(session.expiresAt) < new Date()) {\n                    console.log(\"Session expired or invalid.\");\n                    return {};\n                }\n            } else {\n                console.log(\"User does not exist, removing token...\");\n                return {};\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.currentSessionToken = token.currentSessionToken;\n            }\n            return session;\n        }\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: parseInt(process.env.SESSION_EXPIRE_TIME || \"86400\")\n    },\n    secret: process.env.NEXTAUTH_SECRET\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBaUM7QUFDdUI7QUFDdEI7QUFFbEMsTUFBTUcsVUFBVUgsZ0RBQVFBLENBQUM7SUFDdkJJLFdBQVc7UUFDVEgsc0VBQWNBLENBQUM7WUFDYkksVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7WUFDdENDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csb0JBQW9CO1FBQ2hEO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLFFBQU8sRUFBRUMsSUFBSSxFQUFFQyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDRCxLQUFLRSxLQUFLLEVBQUUsT0FBTztZQUV4QixNQUFNQyxlQUFlLE1BQU1kLG1EQUFNQSxDQUFDVyxJQUFJLENBQUNJLFVBQVUsQ0FBQztnQkFDaERDLE9BQU87b0JBQUVILE9BQU9GLEtBQUtFLEtBQUs7Z0JBQUM7WUFDN0I7WUFFQSxNQUFNSSxvQkFBb0JDLFNBQVNkLFFBQVFDLEdBQUcsQ0FBQ2MsbUJBQW1CLElBQUksVUFBVSxTQUFTO1lBRXpGLElBQUksQ0FBQ0wsY0FBYztnQkFDakIsTUFBTU0sY0FBYyxNQUFNcEIsbURBQU1BLENBQUNXLElBQUksQ0FBQ1UsTUFBTSxDQUFDO29CQUMzQ0MsTUFBTTt3QkFDSlQsT0FBT0YsS0FBS0UsS0FBSzt3QkFDakJVLE1BQU1aLEtBQUtZLElBQUk7d0JBQ2ZDLFFBQVFiLEtBQUtjLEtBQUs7d0JBQ2xCQyxZQUFZZCxTQUFTZSxxQkFBcUI7d0JBQzFDQyxlQUFlLElBQUlDO3dCQUNuQkMsTUFBTTtvQkFDUjtnQkFDRjtnQkFFQSxNQUFNOUIsbURBQU1BLENBQUMrQixZQUFZLENBQUNWLE1BQU0sQ0FBQztvQkFDL0JDLE1BQU07d0JBQ0pVLFFBQVFaLFlBQVlhLEVBQUU7d0JBQ3RCQyxjQUFjdEIsU0FBU3VCLGdCQUFnQjt3QkFDdkNDLFlBQVl4QixTQUFTZSxxQkFBcUI7d0JBQzFDVSxXQUFXLElBQUlSLEtBQUtBLEtBQUtTLEdBQUcsS0FBS3JCLG9CQUFvQjtvQkFDdkQ7Z0JBQ0Y7WUFDRixPQUFPO2dCQUNMLE1BQU1qQixtREFBTUEsQ0FBQ1csSUFBSSxDQUFDNEIsTUFBTSxDQUFDO29CQUN2QnZCLE9BQU87d0JBQUVILE9BQU9GLEtBQUtFLEtBQUs7b0JBQUM7b0JBQzNCUyxNQUFNO3dCQUFFTSxlQUFlLElBQUlDO29CQUFPO2dCQUNwQztnQkFFQSxNQUFNN0IsbURBQU1BLENBQUMrQixZQUFZLENBQUNTLFVBQVUsQ0FBQztvQkFDbkN4QixPQUFPO3dCQUNMZ0IsUUFBUWxCLGFBQWFtQixFQUFFO3dCQUN2QkMsY0FBYzs0QkFBRU8sS0FBSzdCLFNBQVN1Qjt3QkFBYTtvQkFDN0M7Z0JBQ0Y7Z0JBRUEsTUFBTW5DLG1EQUFNQSxDQUFDK0IsWUFBWSxDQUFDVixNQUFNLENBQUM7b0JBQy9CQyxNQUFNO3dCQUNKVSxRQUFRbEIsYUFBYW1CLEVBQUU7d0JBQ3ZCQyxjQUFjdEIsU0FBU3VCLGdCQUFnQjt3QkFDdkNDLFlBQVl4QixTQUFTZSxxQkFBcUI7d0JBQzFDVSxXQUFXLElBQUlSLEtBQUtBLEtBQUtTLEdBQUcsS0FBS3JCLG9CQUFvQjtvQkFDdkQ7Z0JBQ0Y7WUFDRjtZQUVBLE9BQU87UUFDVDtRQUVBLE1BQU15QixLQUFJLEVBQUVDLEtBQUssRUFBRTtZQUNqQixJQUFJLENBQUNBLE1BQU05QixLQUFLLEVBQUUsT0FBTyxDQUFDO1lBRTFCLE1BQU0rQixTQUFTLE1BQU01QyxtREFBTUEsQ0FBQ1csSUFBSSxDQUFDSSxVQUFVLENBQUM7Z0JBQzFDQyxPQUFPO29CQUFFSCxPQUFPOEIsTUFBTTlCLEtBQUs7Z0JBQUM7WUFDOUI7WUFFQSxJQUFJK0IsUUFBUTtnQkFDVkQsTUFBTVYsRUFBRSxHQUFHVyxPQUFPWCxFQUFFO2dCQUNwQlUsTUFBTWIsSUFBSSxHQUFHYyxPQUFPZCxJQUFJO2dCQUV4QixNQUFNZSxVQUFVLE1BQU03QyxtREFBTUEsQ0FBQytCLFlBQVksQ0FBQ2UsU0FBUyxDQUFDO29CQUNsRDlCLE9BQU87d0JBQ0xnQixRQUFRWSxPQUFPWCxFQUFFO3dCQUNqQkMsY0FBY1MsTUFBTUksbUJBQW1CO29CQUN6QztnQkFDRjtnQkFFQSxJQUFJLENBQUNGLFdBQVcsSUFBSWhCLEtBQUtnQixRQUFRUixTQUFTLElBQUksSUFBSVIsUUFBUTtvQkFDeERtQixRQUFRQyxHQUFHLENBQUM7b0JBQ1osT0FBTyxDQUFDO2dCQUNWO1lBQ0YsT0FBTztnQkFDTEQsUUFBUUMsR0FBRyxDQUFDO2dCQUNaLE9BQU8sQ0FBQztZQUNWO1lBRUEsT0FBT047UUFDVDtRQUVBLE1BQU1FLFNBQVEsRUFBRUEsT0FBTyxFQUFFRixLQUFLLEVBQUU7WUFDOUIsSUFBSUUsUUFBUWxDLElBQUksRUFBRTtnQkFDaEJrQyxRQUFRbEMsSUFBSSxDQUFDc0IsRUFBRSxHQUFHVSxNQUFNVixFQUFFO2dCQUMxQlksUUFBUWxDLElBQUksQ0FBQ21CLElBQUksR0FBR2EsTUFBTWIsSUFBSTtnQkFDOUJlLFFBQVFsQyxJQUFJLENBQUNvQyxtQkFBbUIsR0FBR0osTUFBTUksbUJBQW1CO1lBQzlEO1lBQ0EsT0FBT0Y7UUFDVDtJQUNGO0lBQ0FBLFNBQVM7UUFDUEssVUFBVTtRQUNWQyxRQUFRakMsU0FBU2QsUUFBUUMsR0FBRyxDQUFDYyxtQkFBbUIsSUFBSTtJQUN0RDtJQUNBaUMsUUFBUWhELFFBQVFDLEdBQUcsQ0FBQ2dELGVBQWU7QUFDckM7QUFFMkMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVE9OXFxEZXNrdG9wXFxXRUJDT0RFXFxOZXh0SlNcXHRmLW1hbmFnZXJcXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aCh7XG4gIHByb3ZpZGVyczogW1xuICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEISxcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQhLFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50IH0pIHtcbiAgICAgIGlmICghdXNlci5lbWFpbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgZW1haWw6IHVzZXIuZW1haWwgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZXNzaW9uRXhwaXJlVGltZSA9IHBhcnNlSW50KHByb2Nlc3MuZW52LlNFU1NJT05fRVhQSVJFX1RJTUUgfHwgXCI4NjQwMFwiKTsgLy8gMSBuZ8OgeVxuXG4gICAgICBpZiAoIWV4aXN0aW5nVXNlcikge1xuICAgICAgICBjb25zdCBjcmVhdGVkVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICBhdmF0YXI6IHVzZXIuaW1hZ2UsXG4gICAgICAgICAgICBwcm92aWRlcklkOiBhY2NvdW50Py5wcm92aWRlckFjY291bnRJZCB8fCBcIlwiLFxuICAgICAgICAgICAgbGFzdExvZ2luVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHJvbGU6IFwidXNlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS5zZXNzaW9uUG9pbnQuY3JlYXRlKHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB1c2VySWQ6IGNyZWF0ZWRVc2VyLmlkLFxuICAgICAgICAgICAgc2Vzc2lvblRva2VuOiBhY2NvdW50Py5hY2Nlc3NfdG9rZW4gfHwgXCJcIixcbiAgICAgICAgICAgIGRldmljZUluZm86IGFjY291bnQ/LnByb3ZpZGVyQWNjb3VudElkIHx8IFwiXCIsXG4gICAgICAgICAgICBleHBpcmVzQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgKyBzZXNzaW9uRXhwaXJlVGltZSAqIDEwMDApLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgcHJpc21hLnVzZXIudXBkYXRlKHtcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogdXNlci5lbWFpbCB9LFxuICAgICAgICAgIGRhdGE6IHsgbGFzdExvZ2luVGltZTogbmV3IERhdGUoKSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCBwcmlzbWEuc2Vzc2lvblBvaW50LmRlbGV0ZU1hbnkoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB1c2VySWQ6IGV4aXN0aW5nVXNlci5pZCxcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogeyBub3Q6IGFjY291bnQ/LmFjY2Vzc190b2tlbiB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS5zZXNzaW9uUG9pbnQuY3JlYXRlKHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB1c2VySWQ6IGV4aXN0aW5nVXNlci5pZCxcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogYWNjb3VudD8uYWNjZXNzX3Rva2VuIHx8IFwiXCIsXG4gICAgICAgICAgICBkZXZpY2VJbmZvOiBhY2NvdW50Py5wcm92aWRlckFjY291bnRJZCB8fCBcIlwiLFxuICAgICAgICAgICAgZXhwaXJlc0F0OiBuZXcgRGF0ZShEYXRlLm5vdygpICsgc2Vzc2lvbkV4cGlyZVRpbWUgKiAxMDAwKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGFzeW5jIGp3dCh7IHRva2VuIH0pIHtcbiAgICAgIGlmICghdG9rZW4uZW1haWwpIHJldHVybiB7fTtcblxuICAgICAgY29uc3QgZGJVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGVtYWlsOiB0b2tlbi5lbWFpbCB9LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChkYlVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSBkYlVzZXIuaWQ7XG4gICAgICAgIHRva2VuLnJvbGUgPSBkYlVzZXIucm9sZTtcblxuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgcHJpc21hLnNlc3Npb25Qb2ludC5maW5kRmlyc3Qoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB1c2VySWQ6IGRiVXNlci5pZCxcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogdG9rZW4uY3VycmVudFNlc3Npb25Ub2tlbiBhcyBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFzZXNzaW9uIHx8IG5ldyBEYXRlKHNlc3Npb24uZXhwaXJlc0F0KSA8IG5ldyBEYXRlKCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlc3Npb24gZXhwaXJlZCBvciBpbnZhbGlkLlwiKTtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBkb2VzIG5vdCBleGlzdCwgcmVtb3ZpbmcgdG9rZW4uLi5cIik7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG5cbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5jdXJyZW50U2Vzc2lvblRva2VuID0gdG9rZW4uY3VycmVudFNlc3Npb25Ub2tlbiBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgbWF4QWdlOiBwYXJzZUludChwcm9jZXNzLmVudi5TRVNTSU9OX0VYUElSRV9USU1FIHx8IFwiODY0MDBcIiksXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufSk7XG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTsiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsInByaXNtYSIsImhhbmRsZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJjYWxsYmFja3MiLCJzaWduSW4iLCJ1c2VyIiwiYWNjb3VudCIsImVtYWlsIiwiZXhpc3RpbmdVc2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwic2Vzc2lvbkV4cGlyZVRpbWUiLCJwYXJzZUludCIsIlNFU1NJT05fRVhQSVJFX1RJTUUiLCJjcmVhdGVkVXNlciIsImNyZWF0ZSIsImRhdGEiLCJuYW1lIiwiYXZhdGFyIiwiaW1hZ2UiLCJwcm92aWRlcklkIiwicHJvdmlkZXJBY2NvdW50SWQiLCJsYXN0TG9naW5UaW1lIiwiRGF0ZSIsInJvbGUiLCJzZXNzaW9uUG9pbnQiLCJ1c2VySWQiLCJpZCIsInNlc3Npb25Ub2tlbiIsImFjY2Vzc190b2tlbiIsImRldmljZUluZm8iLCJleHBpcmVzQXQiLCJub3ciLCJ1cGRhdGUiLCJkZWxldGVNYW55Iiwibm90Iiwiand0IiwidG9rZW4iLCJkYlVzZXIiLCJzZXNzaW9uIiwiZmluZEZpcnN0IiwiY3VycmVudFNlc3Npb25Ub2tlbiIsImNvbnNvbGUiLCJsb2ciLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCIsIkdFVCIsIlBPU1QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQTtBQUMvQixpRUFBZUMsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbmV4cG9ydCBkZWZhdWx0IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\TON\\\\Desktop\\\\WEBCODE\\\\NextJS\\\\tf-manager\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjFfcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjFfX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNUT04lNUNEZXNrdG9wJTVDV0VCQ09ERSU1Q05leHRKUyU1Q3RmLW1hbmFnZXIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1RPTiU1Q0Rlc2t0b3AlNUNXRUJDT0RFJTVDTmV4dEpTJTVDdGYtbWFuYWdlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNkM7QUFDMUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFRPTlxcXFxEZXNrdG9wXFxcXFdFQkNPREVcXFxcTmV4dEpTXFxcXHRmLW1hbmFnZXJcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcVE9OXFxcXERlc2t0b3BcXFxcV0VCQ09ERVxcXFxOZXh0SlNcXFxcdGYtbWFuYWdlclxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
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

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/next-auth@4.24.11_next@15.2_5b96aa69bc13f76b3da5e9f27c639322","vendor-chunks/@babel+runtime@7.26.9","vendor-chunks/jose@4.15.9","vendor-chunks/openid-client@5.7.1","vendor-chunks/uuid@8.3.2","vendor-chunks/oauth@0.9.15","vendor-chunks/@panva+hkdf@1.2.1","vendor-chunks/yallist@4.0.0","vendor-chunks/preact-render-to-string@5.2.6_preact@10.26.4","vendor-chunks/oidc-token-hash@5.1.0","vendor-chunks/preact@10.26.4","vendor-chunks/object-hash@2.2.0","vendor-chunks/lru-cache@6.0.0","vendor-chunks/cookie@0.7.2"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
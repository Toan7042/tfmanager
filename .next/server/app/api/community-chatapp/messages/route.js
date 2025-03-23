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
exports.id = "app/api/community-chatapp/messages/route";
exports.ids = ["app/api/community-chatapp/messages/route"];
exports.modules = {

/***/ "(rsc)/./app/api/community-chatapp/messages/route.ts":
/*!*****************************************************!*\
  !*** ./app/api/community-chatapp/messages/route.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_pusher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/pusher */ \"(rsc)/./lib/pusher.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_cloudinary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/cloudinary */ \"(rsc)/./lib/cloudinary.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nasync function GET() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_3__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n    // Nếu không có session, trả về mảng rỗng thay vì lỗi\n    if (!session?.user?.id) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json([]);\n    }\n    const messages = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].communityMessage.findMany({\n        include: {\n            user: {\n                select: {\n                    id: true,\n                    name: true,\n                    avatar: true\n                }\n            },\n            reactions: {\n                include: {\n                    user: {\n                        select: {\n                            id: true,\n                            name: true,\n                            avatar: true\n                        }\n                    }\n                }\n            },\n            seenBy: {\n                include: {\n                    user: {\n                        select: {\n                            id: true,\n                            name: true,\n                            avatar: true\n                        }\n                    }\n                }\n            }\n        },\n        orderBy: {\n            createdAt: \"asc\"\n        }\n    });\n    const formattedMessages = messages.map((msg)=>({\n            ...msg,\n            imageUrls: Array.isArray(msg.imageUrls) ? msg.imageUrls : msg.imageUrls ? [\n                msg.imageUrls\n            ] : []\n        }));\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(formattedMessages);\n}\nasync function POST(request) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_3__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n    if (!session?.user?.id) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const formData = await request.formData();\n    const content = formData.get(\"content\");\n    const replyToId = formData.get(\"replyToId\") ? Number(formData.get(\"replyToId\")) : undefined;\n    const files = formData.getAll(\"images\");\n    let imageUrls = [];\n    if (files.length > 0) {\n        try {\n            imageUrls = await Promise.all(files.map(async (file)=>{\n                const arrayBuffer = await file.arrayBuffer();\n                const buffer = Buffer.from(arrayBuffer);\n                const result = await new Promise((resolve, reject)=>{\n                    _lib_cloudinary__WEBPACK_IMPORTED_MODULE_5__[\"default\"].uploader.upload_stream({\n                        resource_type: \"image\"\n                    }, (error, result)=>{\n                        if (error) reject(error);\n                        else resolve(result);\n                    }).end(buffer);\n                });\n                return result.secure_url;\n            }));\n        } catch (error) {\n            console.error(\"Error uploading images to Cloudinary:\", error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to upload images\"\n            }, {\n                status: 500\n            });\n        }\n    }\n    const message = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].communityMessage.create({\n        data: {\n            userId: Number(session.user.id),\n            content: content || \"\",\n            imageUrls: imageUrls.length > 0 ? imageUrls : _prisma_client__WEBPACK_IMPORTED_MODULE_6__.Prisma.JsonNull,\n            replyToId\n        },\n        include: {\n            user: {\n                select: {\n                    id: true,\n                    name: true,\n                    avatar: true\n                }\n            },\n            reactions: {\n                include: {\n                    user: {\n                        select: {\n                            id: true,\n                            name: true,\n                            avatar: true\n                        }\n                    }\n                }\n            },\n            seenBy: {\n                include: {\n                    user: {\n                        select: {\n                            id: true,\n                            name: true,\n                            avatar: true\n                        }\n                    }\n                }\n            }\n        }\n    });\n    const formattedMessage = {\n        ...message,\n        imageUrls: Array.isArray(message.imageUrls) ? message.imageUrls : message.imageUrls ? [\n            message.imageUrls\n        ] : []\n    };\n    await _lib_pusher__WEBPACK_IMPORTED_MODULE_1__.pusher.trigger(\"community-chat\", \"new-message\", formattedMessage);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(formattedMessage);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvbW11bml0eS1jaGF0YXBwL21lc3NhZ2VzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ0w7QUFDSjtBQUNXO0FBQ0o7QUFDQztBQUNGO0FBTWpDLGVBQWVPO0lBQ3BCLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDQyxrREFBV0E7SUFFbEQscURBQXFEO0lBQ3JELElBQUksQ0FBQ0ksU0FBU0MsTUFBTUMsSUFBSTtRQUN0QixPQUFPVixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDLEVBQUU7SUFDN0I7SUFFQSxNQUFNQyxXQUFXLE1BQU1WLG1EQUFNQSxDQUFDVyxnQkFBZ0IsQ0FBQ0MsUUFBUSxDQUFDO1FBQ3REQyxTQUFTO1lBQ1BOLE1BQU07Z0JBQUVPLFFBQVE7b0JBQUVOLElBQUk7b0JBQU1PLE1BQU07b0JBQU1DLFFBQVE7Z0JBQUs7WUFBRTtZQUN2REMsV0FBVztnQkFBRUosU0FBUztvQkFBRU4sTUFBTTt3QkFBRU8sUUFBUTs0QkFBRU4sSUFBSTs0QkFBTU8sTUFBTTs0QkFBTUMsUUFBUTt3QkFBSztvQkFBRTtnQkFBRTtZQUFFO1lBQ25GRSxRQUFRO2dCQUFFTCxTQUFTO29CQUFFTixNQUFNO3dCQUFFTyxRQUFROzRCQUFFTixJQUFJOzRCQUFNTyxNQUFNOzRCQUFNQyxRQUFRO3dCQUFLO29CQUFFO2dCQUFFO1lBQUU7UUFDbEY7UUFDQUcsU0FBUztZQUFFQyxXQUFXO1FBQU07SUFDOUI7SUFFQSxNQUFNQyxvQkFBb0JYLFNBQVNZLEdBQUcsQ0FBQyxDQUFDQyxNQUFTO1lBQy9DLEdBQUdBLEdBQUc7WUFDTkMsV0FBV0MsTUFBTUMsT0FBTyxDQUFDSCxJQUFJQyxTQUFTLElBQUlELElBQUlDLFNBQVMsR0FBR0QsSUFBSUMsU0FBUyxHQUFHO2dCQUFDRCxJQUFJQyxTQUFTO2FBQUMsR0FBRyxFQUFFO1FBQ2hHO0lBRUEsT0FBTzFCLHFEQUFZQSxDQUFDVyxJQUFJLENBQUNZO0FBQzNCO0FBRU8sZUFBZU0sS0FBS0MsT0FBZ0I7SUFDekMsTUFBTXRCLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDQyxrREFBV0E7SUFDbEQsSUFBSSxDQUFDSSxTQUFTQyxNQUFNQyxJQUFJO1FBQ3RCLE9BQU9WLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRW9CLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRTtJQUVBLE1BQU1DLFdBQVcsTUFBTUgsUUFBUUcsUUFBUTtJQUN2QyxNQUFNQyxVQUFVRCxTQUFTRSxHQUFHLENBQUM7SUFDN0IsTUFBTUMsWUFBWUgsU0FBU0UsR0FBRyxDQUFDLGVBQWVFLE9BQU9KLFNBQVNFLEdBQUcsQ0FBQyxnQkFBZ0JHO0lBQ2xGLE1BQU1DLFFBQVFOLFNBQVNPLE1BQU0sQ0FBQztJQUU5QixJQUFJZCxZQUFzQixFQUFFO0lBQzVCLElBQUlhLE1BQU1FLE1BQU0sR0FBRyxHQUFHO1FBQ3BCLElBQUk7WUFDRmYsWUFBWSxNQUFNZ0IsUUFBUUMsR0FBRyxDQUMzQkosTUFBTWYsR0FBRyxDQUFDLE9BQU9vQjtnQkFDZixNQUFNQyxjQUFjLE1BQU1ELEtBQUtDLFdBQVc7Z0JBQzFDLE1BQU1DLFNBQVNDLE9BQU9DLElBQUksQ0FBQ0g7Z0JBQzNCLE1BQU1JLFNBQVMsTUFBTSxJQUFJUCxRQUFnQyxDQUFDUSxTQUFTQztvQkFDakU5Qyx1REFBVUEsQ0FBQytDLFFBQVEsQ0FBQ0MsYUFBYSxDQUMvQjt3QkFBRUMsZUFBZTtvQkFBUSxHQUN6QixDQUFDdkIsT0FBT2tCO3dCQUNOLElBQUlsQixPQUFPb0IsT0FBT3BCOzZCQUNibUIsUUFBUUQ7b0JBQ2YsR0FDQU0sR0FBRyxDQUFDVDtnQkFDUjtnQkFDQSxPQUFPRyxPQUFPTyxVQUFVO1lBQzFCO1FBRUosRUFBRSxPQUFPekIsT0FBTztZQUNkMEIsUUFBUTFCLEtBQUssQ0FBQyx5Q0FBeUNBO1lBQ3ZELE9BQU8vQixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO2dCQUFFb0IsT0FBTztZQUEwQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDL0U7SUFDRjtJQUVBLE1BQU0wQixVQUFVLE1BQU14RCxtREFBTUEsQ0FBQ1csZ0JBQWdCLENBQUM4QyxNQUFNLENBQUM7UUFDbkRDLE1BQU07WUFDSkMsUUFBUXhCLE9BQU83QixRQUFRQyxJQUFJLENBQUNDLEVBQUU7WUFDOUJ3QixTQUFTQSxXQUFXO1lBQ3BCUixXQUFXQSxVQUFVZSxNQUFNLEdBQUcsSUFBSWYsWUFBWXBCLGtEQUFNQSxDQUFDd0QsUUFBUTtZQUM3RDFCO1FBQ0Y7UUFDQXJCLFNBQVM7WUFDUE4sTUFBTTtnQkFBRU8sUUFBUTtvQkFBRU4sSUFBSTtvQkFBTU8sTUFBTTtvQkFBTUMsUUFBUTtnQkFBSztZQUFFO1lBQ3ZEQyxXQUFXO2dCQUFFSixTQUFTO29CQUFFTixNQUFNO3dCQUFFTyxRQUFROzRCQUFFTixJQUFJOzRCQUFNTyxNQUFNOzRCQUFNQyxRQUFRO3dCQUFLO29CQUFFO2dCQUFFO1lBQUU7WUFDbkZFLFFBQVE7Z0JBQUVMLFNBQVM7b0JBQUVOLE1BQU07d0JBQUVPLFFBQVE7NEJBQUVOLElBQUk7NEJBQU1PLE1BQU07NEJBQU1DLFFBQVE7d0JBQUs7b0JBQUU7Z0JBQUU7WUFBRTtRQUNsRjtJQUNGO0lBRUEsTUFBTTZDLG1CQUFtQjtRQUN2QixHQUFHTCxPQUFPO1FBQ1ZoQyxXQUFXQyxNQUFNQyxPQUFPLENBQUM4QixRQUFRaEMsU0FBUyxJQUFJZ0MsUUFBUWhDLFNBQVMsR0FBR2dDLFFBQVFoQyxTQUFTLEdBQUc7WUFBQ2dDLFFBQVFoQyxTQUFTO1NBQUMsR0FBRyxFQUFFO0lBQ2hIO0lBRUEsTUFBTXpCLCtDQUFNQSxDQUFDK0QsT0FBTyxDQUFDLGtCQUFrQixlQUFlRDtJQUN0RCxPQUFPL0QscURBQVlBLENBQUNXLElBQUksQ0FBQ29EO0FBQzNCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFRPTlxcRGVza3RvcFxcV0VCQ09ERVxcTmV4dEpTXFx0Zi1tYW5hZ2VyXFxhcHBcXGFwaVxcY29tbXVuaXR5LWNoYXRhcHBcXG1lc3NhZ2VzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcHVzaGVyIH0gZnJvbSBcIkAvbGliL3B1c2hlclwiO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xyXG5pbXBvcnQgY2xvdWRpbmFyeSBmcm9tIFwiQC9saWIvY2xvdWRpbmFyeVwiO1xyXG5pbXBvcnQgeyBQcmlzbWEgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuXHJcbmludGVyZmFjZSBDbG91ZGluYXJ5VXBsb2FkUmVzdWx0IHtcclxuICBzZWN1cmVfdXJsOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gIFxyXG4gIC8vIE7hur91IGtow7RuZyBjw7Mgc2Vzc2lvbiwgdHLhuqMgduG7gSBt4bqjbmcgcuG7l25nIHRoYXkgdsOsIGzhu5dpXHJcbiAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFtdKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgcHJpc21hLmNvbW11bml0eU1lc3NhZ2UuZmluZE1hbnkoe1xyXG4gICAgaW5jbHVkZToge1xyXG4gICAgICB1c2VyOiB7IHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgYXZhdGFyOiB0cnVlIH0gfSxcclxuICAgICAgcmVhY3Rpb25zOiB7IGluY2x1ZGU6IHsgdXNlcjogeyBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUsIGF2YXRhcjogdHJ1ZSB9IH0gfSB9LFxyXG4gICAgICBzZWVuQnk6IHsgaW5jbHVkZTogeyB1c2VyOiB7IHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgYXZhdGFyOiB0cnVlIH0gfSB9IH0sXHJcbiAgICB9LFxyXG4gICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiYXNjXCIgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZm9ybWF0dGVkTWVzc2FnZXMgPSBtZXNzYWdlcy5tYXAoKG1zZykgPT4gKHtcclxuICAgIC4uLm1zZyxcclxuICAgIGltYWdlVXJsczogQXJyYXkuaXNBcnJheShtc2cuaW1hZ2VVcmxzKSA/IG1zZy5pbWFnZVVybHMgOiBtc2cuaW1hZ2VVcmxzID8gW21zZy5pbWFnZVVybHNdIDogW10sXHJcbiAgfSkpO1xyXG5cclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZm9ybWF0dGVkTWVzc2FnZXMpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBmb3JtRGF0YSA9IGF3YWl0IHJlcXVlc3QuZm9ybURhdGEoKTtcclxuICBjb25zdCBjb250ZW50ID0gZm9ybURhdGEuZ2V0KFwiY29udGVudFwiKSBhcyBzdHJpbmc7XHJcbiAgY29uc3QgcmVwbHlUb0lkID0gZm9ybURhdGEuZ2V0KFwicmVwbHlUb0lkXCIpID8gTnVtYmVyKGZvcm1EYXRhLmdldChcInJlcGx5VG9JZFwiKSkgOiB1bmRlZmluZWQ7XHJcbiAgY29uc3QgZmlsZXMgPSBmb3JtRGF0YS5nZXRBbGwoXCJpbWFnZXNcIikgYXMgRmlsZVtdO1xyXG5cclxuICBsZXQgaW1hZ2VVcmxzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpbWFnZVVybHMgPSBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgICAgICBmaWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpO1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20oYXJyYXlCdWZmZXIpO1xyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8Q2xvdWRpbmFyeVVwbG9hZFJlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjbG91ZGluYXJ5LnVwbG9hZGVyLnVwbG9hZF9zdHJlYW0oXHJcbiAgICAgICAgICAgICAgeyByZXNvdXJjZV90eXBlOiBcImltYWdlXCIgfSxcclxuICAgICAgICAgICAgICAoZXJyb3IsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSByZXNvbHZlKHJlc3VsdCBhcyBDbG91ZGluYXJ5VXBsb2FkUmVzdWx0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZW5kKGJ1ZmZlcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuc2VjdXJlX3VybDtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwbG9hZGluZyBpbWFnZXMgdG8gQ2xvdWRpbmFyeTpcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gdXBsb2FkIGltYWdlc1wiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBtZXNzYWdlID0gYXdhaXQgcHJpc21hLmNvbW11bml0eU1lc3NhZ2UuY3JlYXRlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgdXNlcklkOiBOdW1iZXIoc2Vzc2lvbi51c2VyLmlkKSxcclxuICAgICAgY29udGVudDogY29udGVudCB8fCBcIlwiLFxyXG4gICAgICBpbWFnZVVybHM6IGltYWdlVXJscy5sZW5ndGggPiAwID8gaW1hZ2VVcmxzIDogUHJpc21hLkpzb25OdWxsLFxyXG4gICAgICByZXBseVRvSWQsXHJcbiAgICB9LFxyXG4gICAgaW5jbHVkZToge1xyXG4gICAgICB1c2VyOiB7IHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgYXZhdGFyOiB0cnVlIH0gfSxcclxuICAgICAgcmVhY3Rpb25zOiB7IGluY2x1ZGU6IHsgdXNlcjogeyBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUsIGF2YXRhcjogdHJ1ZSB9IH0gfSB9LFxyXG4gICAgICBzZWVuQnk6IHsgaW5jbHVkZTogeyB1c2VyOiB7IHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgYXZhdGFyOiB0cnVlIH0gfSB9IH0sXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmb3JtYXR0ZWRNZXNzYWdlID0ge1xyXG4gICAgLi4ubWVzc2FnZSxcclxuICAgIGltYWdlVXJsczogQXJyYXkuaXNBcnJheShtZXNzYWdlLmltYWdlVXJscykgPyBtZXNzYWdlLmltYWdlVXJscyA6IG1lc3NhZ2UuaW1hZ2VVcmxzID8gW21lc3NhZ2UuaW1hZ2VVcmxzXSA6IFtdLFxyXG4gIH07XHJcblxyXG4gIGF3YWl0IHB1c2hlci50cmlnZ2VyKFwiY29tbXVuaXR5LWNoYXRcIiwgXCJuZXctbWVzc2FnZVwiLCBmb3JtYXR0ZWRNZXNzYWdlKTtcclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZm9ybWF0dGVkTWVzc2FnZSk7XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHVzaGVyIiwicHJpc21hIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiY2xvdWRpbmFyeSIsIlByaXNtYSIsIkdFVCIsInNlc3Npb24iLCJ1c2VyIiwiaWQiLCJqc29uIiwibWVzc2FnZXMiLCJjb21tdW5pdHlNZXNzYWdlIiwiZmluZE1hbnkiLCJpbmNsdWRlIiwic2VsZWN0IiwibmFtZSIsImF2YXRhciIsInJlYWN0aW9ucyIsInNlZW5CeSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJmb3JtYXR0ZWRNZXNzYWdlcyIsIm1hcCIsIm1zZyIsImltYWdlVXJscyIsIkFycmF5IiwiaXNBcnJheSIsIlBPU1QiLCJyZXF1ZXN0IiwiZXJyb3IiLCJzdGF0dXMiLCJmb3JtRGF0YSIsImNvbnRlbnQiLCJnZXQiLCJyZXBseVRvSWQiLCJOdW1iZXIiLCJ1bmRlZmluZWQiLCJmaWxlcyIsImdldEFsbCIsImxlbmd0aCIsIlByb21pc2UiLCJhbGwiLCJmaWxlIiwiYXJyYXlCdWZmZXIiLCJidWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwicmVzdWx0IiwicmVzb2x2ZSIsInJlamVjdCIsInVwbG9hZGVyIiwidXBsb2FkX3N0cmVhbSIsInJlc291cmNlX3R5cGUiLCJlbmQiLCJzZWN1cmVfdXJsIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJjcmVhdGUiLCJkYXRhIiwidXNlcklkIiwiSnNvbk51bGwiLCJmb3JtYXR0ZWRNZXNzYWdlIiwidHJpZ2dlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/community-chatapp/messages/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account }) {\n            if (!user.email) return false;\n            const existingUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                where: {\n                    email: user.email\n                }\n            });\n            const sessionExpireTime = parseInt(process.env.SESSION_EXPIRE_TIME || \"86400\"); // 1 ngày\n            if (!existingUser) {\n                const createdUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.create({\n                    data: {\n                        email: user.email,\n                        name: user.name,\n                        avatar: user.image,\n                        providerId: account?.providerAccountId || \"\",\n                        lastLoginTime: new Date(),\n                        role: \"user\"\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.create({\n                    data: {\n                        userId: createdUser.id,\n                        sessionToken: account?.access_token || \"\",\n                        deviceInfo: account?.providerAccountId || \"\",\n                        expiresAt: new Date(Date.now() + sessionExpireTime * 1000)\n                    }\n                });\n            } else {\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.update({\n                    where: {\n                        email: user.email\n                    },\n                    data: {\n                        lastLoginTime: new Date()\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.deleteMany({\n                    where: {\n                        userId: existingUser.id,\n                        sessionToken: {\n                            not: account?.access_token\n                        }\n                    }\n                });\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.create({\n                    data: {\n                        userId: existingUser.id,\n                        sessionToken: account?.access_token || \"\",\n                        deviceInfo: account?.providerAccountId || \"\",\n                        expiresAt: new Date(Date.now() + sessionExpireTime * 1000)\n                    }\n                });\n            }\n            return true;\n        },\n        async jwt ({ token }) {\n            if (!token.email) return {};\n            const dbUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                where: {\n                    email: token.email\n                }\n            });\n            if (dbUser) {\n                token.id = dbUser.id;\n                token.role = dbUser.role;\n                const session = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sessionPoint.findFirst({\n                    where: {\n                        userId: dbUser.id,\n                        sessionToken: token.currentSessionToken\n                    }\n                });\n                if (!session || new Date(session.expiresAt) < new Date()) {\n                    console.log(\"Session expired or invalid.\");\n                    return {};\n                }\n            } else {\n                console.log(\"User does not exist, removing token...\");\n                return {};\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.currentSessionToken = token.currentSessionToken;\n            }\n            return session;\n        }\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: parseInt(process.env.SESSION_EXPIRE_TIME || \"86400\")\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUU7d0JBQ2pCQyxjQUFjUyxNQUFNSSxtQkFBbUI7b0JBQ3pDO2dCQUNGO2dCQUVBLElBQUksQ0FBQ0YsV0FBVyxJQUFJaEIsS0FBS2dCLFFBQVFSLFNBQVMsSUFBSSxJQUFJUixRQUFRO29CQUN4RG1CLFFBQVFDLEdBQUcsQ0FBQztvQkFDWixPQUFPLENBQUM7Z0JBQ1Y7WUFDRixPQUFPO2dCQUNMRCxRQUFRQyxHQUFHLENBQUM7Z0JBQ1osT0FBTyxDQUFDO1lBQ1Y7WUFFQSxPQUFPTjtRQUNUO1FBRUEsTUFBTUUsU0FBUSxFQUFFQSxPQUFPLEVBQUVGLEtBQUssRUFBRTtZQUM5QixJQUFJRSxRQUFRbEMsSUFBSSxFQUFFO2dCQUNoQmtDLFFBQVFsQyxJQUFJLENBQUNzQixFQUFFLEdBQUdVLE1BQU1WLEVBQUU7Z0JBQzFCWSxRQUFRbEMsSUFBSSxDQUFDbUIsSUFBSSxHQUFHYSxNQUFNYixJQUFJO2dCQUM5QmUsUUFBUWxDLElBQUksQ0FBQ29DLG1CQUFtQixHQUFHSixNQUFNSSxtQkFBbUI7WUFDOUQ7WUFDQSxPQUFPRjtRQUNUO0lBQ0Y7SUFDQUEsU0FBUztRQUNQSyxVQUFVO1FBQ1ZDLFFBQVFqQyxTQUFTZCxRQUFRQyxHQUFHLENBQUNjLG1CQUFtQixJQUFJO0lBQ3REO0lBQ0FpQyxRQUFRaEQsUUFBUUMsR0FBRyxDQUFDZ0QsZUFBZTtBQUNyQyxFQUFFO0FBRUYsaUVBQWV2RCxnREFBUUEsQ0FBQ0csWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcbGliXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCwgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcclxuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEdvb2dsZVByb3ZpZGVyKHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQhLFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUISxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50IH0pIHtcclxuICAgICAgaWYgKCF1c2VyLmVtYWlsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICB3aGVyZTogeyBlbWFpbDogdXNlci5lbWFpbCB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHNlc3Npb25FeHBpcmVUaW1lID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuU0VTU0lPTl9FWFBJUkVfVElNRSB8fCBcIjg2NDAwXCIpOyAvLyAxIG5nw6B5XHJcblxyXG4gICAgICBpZiAoIWV4aXN0aW5nVXNlcikge1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuY3JlYXRlKHtcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgYXZhdGFyOiB1c2VyLmltYWdlLFxyXG4gICAgICAgICAgICBwcm92aWRlcklkOiBhY2NvdW50Py5wcm92aWRlckFjY291bnRJZCB8fCBcIlwiLFxyXG4gICAgICAgICAgICBsYXN0TG9naW5UaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICByb2xlOiBcInVzZXJcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHByaXNtYS5zZXNzaW9uUG9pbnQuY3JlYXRlKHtcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdXNlcklkOiBjcmVhdGVkVXNlci5pZCxcclxuICAgICAgICAgICAgc2Vzc2lvblRva2VuOiBhY2NvdW50Py5hY2Nlc3NfdG9rZW4gfHwgXCJcIixcclxuICAgICAgICAgICAgZGV2aWNlSW5mbzogYWNjb3VudD8ucHJvdmlkZXJBY2NvdW50SWQgfHwgXCJcIixcclxuICAgICAgICAgICAgZXhwaXJlc0F0OiBuZXcgRGF0ZShEYXRlLm5vdygpICsgc2Vzc2lvbkV4cGlyZVRpbWUgKiAxMDAwKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgcHJpc21hLnVzZXIudXBkYXRlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiB1c2VyLmVtYWlsIH0sXHJcbiAgICAgICAgICBkYXRhOiB7IGxhc3RMb2dpblRpbWU6IG5ldyBEYXRlKCkgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgcHJpc21hLnNlc3Npb25Qb2ludC5kZWxldGVNYW55KHtcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogZXhpc3RpbmdVc2VyLmlkLFxyXG4gICAgICAgICAgICBzZXNzaW9uVG9rZW46IHsgbm90OiBhY2NvdW50Py5hY2Nlc3NfdG9rZW4gfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHByaXNtYS5zZXNzaW9uUG9pbnQuY3JlYXRlKHtcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdXNlcklkOiBleGlzdGluZ1VzZXIuaWQsXHJcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogYWNjb3VudD8uYWNjZXNzX3Rva2VuIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIGRldmljZUluZm86IGFjY291bnQ/LnByb3ZpZGVyQWNjb3VudElkIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdDogbmV3IERhdGUoRGF0ZS5ub3coKSArIHNlc3Npb25FeHBpcmVUaW1lICogMTAwMCksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgand0KHsgdG9rZW4gfSkge1xyXG4gICAgICBpZiAoIXRva2VuLmVtYWlsKSByZXR1cm4ge307XHJcblxyXG4gICAgICBjb25zdCBkYlVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICB3aGVyZTogeyBlbWFpbDogdG9rZW4uZW1haWwgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGJVc2VyKSB7XHJcbiAgICAgICAgdG9rZW4uaWQgPSBkYlVzZXIuaWQ7XHJcbiAgICAgICAgdG9rZW4ucm9sZSA9IGRiVXNlci5yb2xlO1xyXG5cclxuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgcHJpc21hLnNlc3Npb25Qb2ludC5maW5kRmlyc3Qoe1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgdXNlcklkOiBkYlVzZXIuaWQsXHJcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogdG9rZW4uY3VycmVudFNlc3Npb25Ub2tlbiBhcyBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXNlc3Npb24gfHwgbmV3IERhdGUoc2Vzc2lvbi5leHBpcmVzQXQpIDwgbmV3IERhdGUoKSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJTZXNzaW9uIGV4cGlyZWQgb3IgaW52YWxpZC5cIik7XHJcbiAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBkb2VzIG5vdCBleGlzdCwgcmVtb3ZpbmcgdG9rZW4uLi5cIik7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlIGFzIHN0cmluZztcclxuICAgICAgICBzZXNzaW9uLnVzZXIuY3VycmVudFNlc3Npb25Ub2tlbiA9IHRva2VuLmN1cnJlbnRTZXNzaW9uVG9rZW4gYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gICAgbWF4QWdlOiBwYXJzZUludChwcm9jZXNzLmVudi5TRVNTSU9OX0VYUElSRV9USU1FIHx8IFwiODY0MDBcIiksXHJcbiAgfSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKGF1dGhPcHRpb25zKTsiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsInByaXNtYSIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwiY2FsbGJhY2tzIiwic2lnbkluIiwidXNlciIsImFjY291bnQiLCJlbWFpbCIsImV4aXN0aW5nVXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInNlc3Npb25FeHBpcmVUaW1lIiwicGFyc2VJbnQiLCJTRVNTSU9OX0VYUElSRV9USU1FIiwiY3JlYXRlZFVzZXIiLCJjcmVhdGUiLCJkYXRhIiwibmFtZSIsImF2YXRhciIsImltYWdlIiwicHJvdmlkZXJJZCIsInByb3ZpZGVyQWNjb3VudElkIiwibGFzdExvZ2luVGltZSIsIkRhdGUiLCJyb2xlIiwic2Vzc2lvblBvaW50IiwidXNlcklkIiwiaWQiLCJzZXNzaW9uVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJkZXZpY2VJbmZvIiwiZXhwaXJlc0F0Iiwibm93IiwidXBkYXRlIiwiZGVsZXRlTWFueSIsIm5vdCIsImp3dCIsInRva2VuIiwiZGJVc2VyIiwic2Vzc2lvbiIsImZpbmRGaXJzdCIsImN1cnJlbnRTZXNzaW9uVG9rZW4iLCJjb25zb2xlIiwibG9nIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/cloudinary.ts":
/*!***************************!*\
  !*** ./lib/cloudinary.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"(rsc)/./node_modules/cloudinary/cloudinary.js\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n\ncloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.config({\n    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,\n    api_key: process.env.CLOUDINARY_API_KEY,\n    api_secret: process.env.CLOUDINARY_API_SECRET\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvY2xvdWRpbmFyeS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUNDLDBDQUFVQSxDQUFDQyxNQUFNLENBQUM7SUFDaEJDLFlBQVlDLFFBQVFDLEdBQUcsQ0FBQ0MscUJBQXFCO0lBQzdDQyxTQUFTSCxRQUFRQyxHQUFHLENBQUNHLGtCQUFrQjtJQUN2Q0MsWUFBWUwsUUFBUUMsR0FBRyxDQUFDSyxxQkFBcUI7QUFDL0M7QUFFQSxpRUFBZVQsMENBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVE9OXFxEZXNrdG9wXFxXRUJDT0RFXFxOZXh0SlNcXHRmLW1hbmFnZXJcXGxpYlxcY2xvdWRpbmFyeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2MiBhcyBjbG91ZGluYXJ5IH0gZnJvbSBcImNsb3VkaW5hcnlcIjtcclxuXHJcbmNsb3VkaW5hcnkuY29uZmlnKHtcclxuICBjbG91ZF9uYW1lOiBwcm9jZXNzLmVudi5DTE9VRElOQVJZX0NMT1VEX05BTUUsXHJcbiAgYXBpX2tleTogcHJvY2Vzcy5lbnYuQ0xPVURJTkFSWV9BUElfS0VZLFxyXG4gIGFwaV9zZWNyZXQ6IHByb2Nlc3MuZW52LkNMT1VESU5BUllfQVBJX1NFQ1JFVCxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbG91ZGluYXJ5OyJdLCJuYW1lcyI6WyJ2MiIsImNsb3VkaW5hcnkiLCJjb25maWciLCJjbG91ZF9uYW1lIiwicHJvY2VzcyIsImVudiIsIkNMT1VESU5BUllfQ0xPVURfTkFNRSIsImFwaV9rZXkiLCJDTE9VRElOQVJZX0FQSV9LRVkiLCJhcGlfc2VjcmV0IiwiQ0xPVURJTkFSWV9BUElfU0VDUkVUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/cloudinary.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQTtBQUMvQixpRUFBZUMsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbmV4cG9ydCBkZWZhdWx0IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/pusher.ts":
/*!***********************!*\
  !*** ./lib/pusher.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pusher: () => (/* binding */ pusher)\n/* harmony export */ });\n/* harmony import */ var pusher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pusher */ \"(rsc)/./node_modules/pusher/lib/pusher.js\");\n/* harmony import */ var pusher__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pusher__WEBPACK_IMPORTED_MODULE_0__);\n// lib/pusher.ts\n\nconst pusher = new (pusher__WEBPACK_IMPORTED_MODULE_0___default())({\n    appId: process.env.PUSHER_APP_ID,\n    key: \"cb2abd19936ed09d7892\",\n    secret: process.env.PUSHER_SECRET,\n    cluster: \"ap1\",\n    useTLS: true\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHVzaGVyLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUNZO0FBRXJCLE1BQU1DLFNBQVMsSUFBSUQsK0NBQU1BLENBQUM7SUFDL0JFLE9BQU9DLFFBQVFDLEdBQUcsQ0FBQ0MsYUFBYTtJQUNoQ0MsS0FBS0gsc0JBQWtDO0lBQ3ZDSyxRQUFRTCxRQUFRQyxHQUFHLENBQUNLLGFBQWE7SUFDakNDLFNBQVNQLEtBQXNDO0lBQy9DUyxRQUFRO0FBQ1YsR0FBRyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcbGliXFxwdXNoZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3B1c2hlci50c1xyXG5pbXBvcnQgUHVzaGVyIGZyb20gXCJwdXNoZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBwdXNoZXIgPSBuZXcgUHVzaGVyKHtcclxuICBhcHBJZDogcHJvY2Vzcy5lbnYuUFVTSEVSX0FQUF9JRCEsXHJcbiAga2V5OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19QVVNIRVJfS0VZISxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52LlBVU0hFUl9TRUNSRVQhLFxyXG4gIGNsdXN0ZXI6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1BVU0hFUl9DTFVTVEVSISxcclxuICB1c2VUTFM6IHRydWUsXHJcbn0pOyJdLCJuYW1lcyI6WyJQdXNoZXIiLCJwdXNoZXIiLCJhcHBJZCIsInByb2Nlc3MiLCJlbnYiLCJQVVNIRVJfQVBQX0lEIiwia2V5IiwiTkVYVF9QVUJMSUNfUFVTSEVSX0tFWSIsInNlY3JldCIsIlBVU0hFUl9TRUNSRVQiLCJjbHVzdGVyIiwiTkVYVF9QVUJMSUNfUFVTSEVSX0NMVVNURVIiLCJ1c2VUTFMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/pusher.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_community_chatapp_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/community-chatapp/messages/route.ts */ \"(rsc)/./app/api/community-chatapp/messages/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/community-chatapp/messages/route\",\n        pathname: \"/api/community-chatapp/messages\",\n        filename: \"route\",\n        bundlePath: \"app/api/community-chatapp/messages/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\TON\\\\Desktop\\\\WEBCODE\\\\NextJS\\\\tf-manager\\\\app\\\\api\\\\community-chatapp\\\\messages\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_community_chatapp_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjb21tdW5pdHktY2hhdGFwcCUyRm1lc3NhZ2VzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZjb21tdW5pdHktY2hhdGFwcCUyRm1lc3NhZ2VzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY29tbXVuaXR5LWNoYXRhcHAlMkZtZXNzYWdlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNUT04lNUNEZXNrdG9wJTVDV0VCQ09ERSU1Q05leHRKUyU1Q3RmLW1hbmFnZXIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1RPTiU1Q0Rlc2t0b3AlNUNXRUJDT0RFJTVDTmV4dEpTJTVDdGYtbWFuYWdlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDcUQ7QUFDbEk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFRPTlxcXFxEZXNrdG9wXFxcXFdFQkNPREVcXFxcTmV4dEpTXFxcXHRmLW1hbmFnZXJcXFxcYXBwXFxcXGFwaVxcXFxjb21tdW5pdHktY2hhdGFwcFxcXFxtZXNzYWdlc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY29tbXVuaXR5LWNoYXRhcHAvbWVzc2FnZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jb21tdW5pdHktY2hhdGFwcC9tZXNzYWdlc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY29tbXVuaXR5LWNoYXRhcHAvbWVzc2FnZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxUT05cXFxcRGVza3RvcFxcXFxXRUJDT0RFXFxcXE5leHRKU1xcXFx0Zi1tYW5hZ2VyXFxcXGFwcFxcXFxhcGlcXFxcY29tbXVuaXR5LWNoYXRhcHBcXFxcbWVzc2FnZXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/tr46","vendor-chunks/tweetnacl","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/pusher","vendor-chunks/event-target-shim","vendor-chunks/webidl-conversions","vendor-chunks/abort-controller","vendor-chunks/tweetnacl-util","vendor-chunks/is-base64","vendor-chunks/lodash","vendor-chunks/cloudinary","vendor-chunks/q"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&page=%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcommunity-chatapp%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
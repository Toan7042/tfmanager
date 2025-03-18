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
exports.id = "app/api/loadOptionsInitialinitialization/route";
exports.ids = ["app/api/loadOptionsInitialinitialization/route"];
exports.modules = {

/***/ "(rsc)/./app/api/loadOptionsInitialinitialization/route.ts":
/*!***********************************************************!*\
  !*** ./app/api/loadOptionsInitialinitialization/route.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET() {\n    try {\n        const basePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), \"app/data/optionapiinitialinitialization\");\n        // LOAD .TXT, MỖI DÒNG LÀ 1 PHẦN TỬ\n        const countryData = [\n            \"NONE\",\n            ...fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_country.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean)\n        ];\n        const nameGenData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_namegen.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const phoneGenData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_phonegen.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const mailGenData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_mailgen.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const languageData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_language.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const userAgentData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_useragent.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        // LOAD JSON\n        const phoneModels = [\n            \"NONE\",\n            \"RAND-ITEM\",\n            ...JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"jsonPhoneInfo_data.json\"), \"utf-8\")).devices.map((device)=>device.MODEL)\n        ];\n        const carrierData = [\n            \"NONE\",\n            \"AS-COUNTRY\",\n            ...JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"jsonCarrier_data.json\"), \"utf-8\")).map((device)=>device.ISO)\n        ];\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            staperchangetypePHONEINFO: phoneModels,\n            staperchangeUSERAGENT: userAgentData,\n            staperchangetypeNAME: nameGenData,\n            staperchangeCOUNTRY: countryData,\n            staperchangeCarrier: carrierData,\n            staperchangePHONENUMBER: phoneGenData,\n            staperchangeEMAIL: mailGenData,\n            staperchangeLANGUAGE: languageData\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Lỗi API:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Có lỗi xảy ra\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvYWRPcHRpb25zSW5pdGlhbGluaXRpYWxpemF0aW9uL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyQztBQUN2QjtBQUNJO0FBRWpCLGVBQWVHO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxXQUFXRixnREFBUyxDQUFDSSxRQUFRQyxHQUFHLElBQUk7UUFFMUMsbUNBQW1DO1FBQ25DLE1BQU1DLGNBQWM7WUFBQztlQUFXUCxzREFBZSxDQUFDQyxnREFBUyxDQUFDRSxVQUFVLDRCQUE0QixTQUFTTSxLQUFLLENBQUMsTUFBTUMsR0FBRyxDQUFDQyxDQUFBQSxPQUFRQSxLQUFLQyxJQUFJLElBQUlDLE1BQU0sQ0FBQ0M7U0FBUztRQUM5SixNQUFNQyxjQUFjZixzREFBZSxDQUFDQyxnREFBUyxDQUFDRSxVQUFVLDRCQUE0QixTQUFTTSxLQUFLLENBQUMsTUFBTUMsR0FBRyxDQUFDQyxDQUFBQSxPQUFRQSxLQUFLQyxJQUFJLElBQUlDLE1BQU0sQ0FBQ0M7UUFDekksTUFBTUUsZUFBZWhCLHNEQUFlLENBQUNDLGdEQUFTLENBQUNFLFVBQVUsNkJBQTZCLFNBQVNNLEtBQUssQ0FBQyxNQUFNQyxHQUFHLENBQUNDLENBQUFBLE9BQVFBLEtBQUtDLElBQUksSUFBSUMsTUFBTSxDQUFDQztRQUMzSSxNQUFNRyxjQUFjakIsc0RBQWUsQ0FBQ0MsZ0RBQVMsQ0FBQ0UsVUFBVSw0QkFBNEIsU0FBU00sS0FBSyxDQUFDLE1BQU1DLEdBQUcsQ0FBQ0MsQ0FBQUEsT0FBUUEsS0FBS0MsSUFBSSxJQUFJQyxNQUFNLENBQUNDO1FBQ3pJLE1BQU1JLGVBQWVsQixzREFBZSxDQUFDQyxnREFBUyxDQUFDRSxVQUFVLDZCQUE2QixTQUFTTSxLQUFLLENBQUMsTUFBTUMsR0FBRyxDQUFDQyxDQUFBQSxPQUFRQSxLQUFLQyxJQUFJLElBQUlDLE1BQU0sQ0FBQ0M7UUFDM0ksTUFBTUssZ0JBQWdCbkIsc0RBQWUsQ0FBQ0MsZ0RBQVMsQ0FBQ0UsVUFBVSw4QkFBOEIsU0FBU00sS0FBSyxDQUFDLE1BQU1DLEdBQUcsQ0FBQ0MsQ0FBQUEsT0FBUUEsS0FBS0MsSUFBSSxJQUFJQyxNQUFNLENBQUNDO1FBQzdJLFlBQVk7UUFDWixNQUFNTSxjQUFjO1lBQUM7WUFBUTtlQUFnQkMsS0FBS0MsS0FBSyxDQUFDdEIsc0RBQWUsQ0FBQ0MsZ0RBQVMsQ0FBQ0UsVUFBVSw0QkFBNEIsVUFBVW9CLE9BQU8sQ0FBQ2IsR0FBRyxDQUFDLENBQUNjLFNBQThCQSxPQUFPQyxLQUFLO1NBQUU7UUFDM0wsTUFBTUMsY0FBYztZQUFDO1lBQVE7ZUFBaUJMLEtBQUtDLEtBQUssQ0FBQ3RCLHNEQUFlLENBQUNDLGdEQUFTLENBQUNFLFVBQVUsMEJBQTBCLFVBQVVPLEdBQUcsQ0FBQyxDQUFDYyxTQUE0QkEsT0FBT0csR0FBRztTQUFFO1FBRTlLLE9BQU81QixxREFBWUEsQ0FBQzZCLElBQUksQ0FBQztZQUN2QkMsMkJBQTJCVDtZQUMzQlUsdUJBQXVCWDtZQUN2Qlksc0JBQXNCaEI7WUFDdEJpQixxQkFBcUJ6QjtZQUNyQjBCLHFCQUFxQlA7WUFDckJRLHlCQUF5QmxCO1lBQ3pCbUIsbUJBQW1CbEI7WUFDbkJtQixzQkFBc0JsQjtRQUN4QixHQUFHO1lBQUVtQixRQUFRO1FBQUk7SUFFbkIsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxZQUFZQTtRQUMxQixPQUFPdkMscURBQVlBLENBQUM2QixJQUFJLENBQUM7WUFBRVUsT0FBTztRQUFnQixHQUFHO1lBQUVELFFBQVE7UUFBSTtJQUNyRTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFRPTlxcRGVza3RvcFxcV0VCQ09ERVxcTmV4dEpTXFx0Zi1tYW5hZ2VyXFxhcHBcXGFwaVxcbG9hZE9wdGlvbnNJbml0aWFsaW5pdGlhbGl6YXRpb25cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBiYXNlUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcImFwcC9kYXRhL29wdGlvbmFwaWluaXRpYWxpbml0aWFsaXphdGlvblwiKTtcclxuXHJcbiAgICAvLyBMT0FEIC5UWFQsIE3hu5ZJIETDkk5HIEzDgCAxIFBI4bqmTiBU4busXHJcbiAgICBjb25zdCBjb3VudHJ5RGF0YSA9IFtcIk5PTkVcIiwgLi4uZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlUGF0aCwgXCJmaWxlX29wdGlvbl9jb3VudHJ5LnR4dFwiKSwgXCJ1dGYtOFwiKS5zcGxpdChcIlxcblwiKS5tYXAobGluZSA9PiBsaW5lLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pXTtcclxuICAgIGNvbnN0IG5hbWVHZW5EYXRhID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlUGF0aCwgXCJmaWxlX29wdGlvbl9uYW1lZ2VuLnR4dFwiKSwgXCJ1dGYtOFwiKS5zcGxpdChcIlxcblwiKS5tYXAobGluZSA9PiBsaW5lLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgY29uc3QgcGhvbmVHZW5EYXRhID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlUGF0aCwgXCJmaWxlX29wdGlvbl9waG9uZWdlbi50eHRcIiksIFwidXRmLThcIikuc3BsaXQoXCJcXG5cIikubWFwKGxpbmUgPT4gbGluZS50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcclxuICAgIGNvbnN0IG1haWxHZW5EYXRhID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlUGF0aCwgXCJmaWxlX29wdGlvbl9tYWlsZ2VuLnR4dFwiKSwgXCJ1dGYtOFwiKS5zcGxpdChcIlxcblwiKS5tYXAobGluZSA9PiBsaW5lLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgY29uc3QgbGFuZ3VhZ2VEYXRhID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlUGF0aCwgXCJmaWxlX29wdGlvbl9sYW5ndWFnZS50eHRcIiksIFwidXRmLThcIikuc3BsaXQoXCJcXG5cIikubWFwKGxpbmUgPT4gbGluZS50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcclxuICAgIGNvbnN0IHVzZXJBZ2VudERhdGEgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJhc2VQYXRoLCBcImZpbGVfb3B0aW9uX3VzZXJhZ2VudC50eHRcIiksIFwidXRmLThcIikuc3BsaXQoXCJcXG5cIikubWFwKGxpbmUgPT4gbGluZS50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcclxuICAgIC8vIExPQUQgSlNPTlxyXG4gICAgY29uc3QgcGhvbmVNb2RlbHMgPSBbXCJOT05FXCIsIFwiUkFORC1JVEVNXCIsIC4uLkpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlUGF0aCwgXCJqc29uUGhvbmVJbmZvX2RhdGEuanNvblwiKSwgXCJ1dGYtOFwiKSkuZGV2aWNlcy5tYXAoKGRldmljZTogeyBNT0RFTDogc3RyaW5nIH0pID0+IGRldmljZS5NT0RFTCldO1xyXG4gICAgY29uc3QgY2FycmllckRhdGEgPSBbXCJOT05FXCIsIFwiQVMtQ09VTlRSWVwiLCAuLi5KU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYmFzZVBhdGgsIFwianNvbkNhcnJpZXJfZGF0YS5qc29uXCIpLCBcInV0Zi04XCIpKS5tYXAoKGRldmljZTogeyBJU086IHN0cmluZyB9KSA9PiBkZXZpY2UuSVNPKV07ICAgIFxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN0YXBlcmNoYW5nZXR5cGVQSE9ORUlORk86IHBob25lTW9kZWxzLFxyXG4gICAgICBzdGFwZXJjaGFuZ2VVU0VSQUdFTlQ6IHVzZXJBZ2VudERhdGEsXHJcbiAgICAgIHN0YXBlcmNoYW5nZXR5cGVOQU1FOiBuYW1lR2VuRGF0YSxcclxuICAgICAgc3RhcGVyY2hhbmdlQ09VTlRSWTogY291bnRyeURhdGEsXHJcbiAgICAgIHN0YXBlcmNoYW5nZUNhcnJpZXI6IGNhcnJpZXJEYXRhLFxyXG4gICAgICBzdGFwZXJjaGFuZ2VQSE9ORU5VTUJFUjogcGhvbmVHZW5EYXRhLFxyXG4gICAgICBzdGFwZXJjaGFuZ2VFTUFJTDogbWFpbEdlbkRhdGEsXHJcbiAgICAgIHN0YXBlcmNoYW5nZUxBTkdVQUdFOiBsYW5ndWFnZURhdGFcclxuICAgIH0sIHsgc3RhdHVzOiAyMDAgfSk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiTOG7l2kgQVBJOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJDw7MgbOG7l2kgeOG6o3kgcmFcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZnMiLCJwYXRoIiwiR0VUIiwiYmFzZVBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsImNvdW50cnlEYXRhIiwicmVhZEZpbGVTeW5jIiwic3BsaXQiLCJtYXAiLCJsaW5lIiwidHJpbSIsImZpbHRlciIsIkJvb2xlYW4iLCJuYW1lR2VuRGF0YSIsInBob25lR2VuRGF0YSIsIm1haWxHZW5EYXRhIiwibGFuZ3VhZ2VEYXRhIiwidXNlckFnZW50RGF0YSIsInBob25lTW9kZWxzIiwiSlNPTiIsInBhcnNlIiwiZGV2aWNlcyIsImRldmljZSIsIk1PREVMIiwiY2FycmllckRhdGEiLCJJU08iLCJqc29uIiwic3RhcGVyY2hhbmdldHlwZVBIT05FSU5GTyIsInN0YXBlcmNoYW5nZVVTRVJBR0VOVCIsInN0YXBlcmNoYW5nZXR5cGVOQU1FIiwic3RhcGVyY2hhbmdlQ09VTlRSWSIsInN0YXBlcmNoYW5nZUNhcnJpZXIiLCJzdGFwZXJjaGFuZ2VQSE9ORU5VTUJFUiIsInN0YXBlcmNoYW5nZUVNQUlMIiwic3RhcGVyY2hhbmdlTEFOR1VBR0UiLCJzdGF0dXMiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/loadOptionsInitialinitialization/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FloadOptionsInitialinitialization%2Froute&page=%2Fapi%2FloadOptionsInitialinitialization%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FloadOptionsInitialinitialization%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FloadOptionsInitialinitialization%2Froute&page=%2Fapi%2FloadOptionsInitialinitialization%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FloadOptionsInitialinitialization%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_loadOptionsInitialinitialization_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/loadOptionsInitialinitialization/route.ts */ \"(rsc)/./app/api/loadOptionsInitialinitialization/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/loadOptionsInitialinitialization/route\",\n        pathname: \"/api/loadOptionsInitialinitialization\",\n        filename: \"route\",\n        bundlePath: \"app/api/loadOptionsInitialinitialization/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\TON\\\\Desktop\\\\WEBCODE\\\\NextJS\\\\tf-manager\\\\app\\\\api\\\\loadOptionsInitialinitialization\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_TON_Desktop_WEBCODE_NextJS_tf_manager_app_api_loadOptionsInitialinitialization_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjFfcmVhY3QtZG9tQDE5LjAuMF9yZWFjdEAxOS4wLjBfX3JlYWN0QDE5LjAuMC9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsb2FkT3B0aW9uc0luaXRpYWxpbml0aWFsaXphdGlvbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbG9hZE9wdGlvbnNJbml0aWFsaW5pdGlhbGl6YXRpb24lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsb2FkT3B0aW9uc0luaXRpYWxpbml0aWFsaXphdGlvbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNUT04lNUNEZXNrdG9wJTVDV0VCQ09ERSU1Q05leHRKUyU1Q3RmLW1hbmFnZXIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1RPTiU1Q0Rlc2t0b3AlNUNXRUJDT0RFJTVDTmV4dEpTJTVDdGYtbWFuYWdlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEQ7QUFDdkk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFRPTlxcXFxEZXNrdG9wXFxcXFdFQkNPREVcXFxcTmV4dEpTXFxcXHRmLW1hbmFnZXJcXFxcYXBwXFxcXGFwaVxcXFxsb2FkT3B0aW9uc0luaXRpYWxpbml0aWFsaXphdGlvblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbG9hZE9wdGlvbnNJbml0aWFsaW5pdGlhbGl6YXRpb24vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sb2FkT3B0aW9uc0luaXRpYWxpbml0aWFsaXphdGlvblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9hZE9wdGlvbnNJbml0aWFsaW5pdGlhbGl6YXRpb24vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxUT05cXFxcRGVza3RvcFxcXFxXRUJDT0RFXFxcXE5leHRKU1xcXFx0Zi1tYW5hZ2VyXFxcXGFwcFxcXFxhcGlcXFxcbG9hZE9wdGlvbnNJbml0aWFsaW5pdGlhbGl6YXRpb25cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FloadOptionsInitialinitialization%2Froute&page=%2Fapi%2FloadOptionsInitialinitialization%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FloadOptionsInitialinitialization%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FloadOptionsInitialinitialization%2Froute&page=%2Fapi%2FloadOptionsInitialinitialization%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FloadOptionsInitialinitialization%2Froute.ts&appDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTON%5CDesktop%5CWEBCODE%5CNextJS%5Ctf-manager&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET() {\n    try {\n        const basePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), \"app/data/optionapiinitialinitialization\");\n        // LOAD .TXT, MỖI DÒNG LÀ 1 PHẦN TỬ\n        const countryData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_country.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const nameGenData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_namegen.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const phoneGenData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_phonegen.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const mailGenData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_mailgen.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const languageData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_language.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        const userAgentData = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"file_option_useragent.txt\"), \"utf-8\").split(\"\\n\").map((line)=>line.trim()).filter(Boolean);\n        // LOAD JSON\n        const phoneModels = [\n            \"RAND\",\n            ...JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"jsonPhoneInfo_data.json\"), \"utf-8\")).devices.map((device)=>device.MODEL)\n        ];\n        const carrierData = [\n            \"AS-COUNTRY\",\n            ...JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(basePath, \"jsonCarrier_data.json\"), \"utf-8\")).map((device)=>device.ISO)\n        ];\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            staperchangetypePHONEINFO: phoneModels,\n            staperchangeUSERAGENT: userAgentData,\n            staperchangetypeNAME: nameGenData,\n            staperchangeCOUNTRY: countryData,\n            staperchangeCarrier: carrierData,\n            staperchangePHONENUMBER: phoneGenData,\n            staperchangeEMAIL: mailGenData,\n            staperchangeLANGUAGE: languageData\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Lỗi API:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Có lỗi xảy ra\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvYWRPcHRpb25zSW5pdGlhbGluaXRpYWxpemF0aW9uL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyQztBQUN2QjtBQUNJO0FBRWpCLGVBQWVHO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxXQUFXRixnREFBUyxDQUFDSSxRQUFRQyxHQUFHLElBQUk7UUFFMUMsbUNBQW1DO1FBQ25DLE1BQU1DLGNBQWNQLHNEQUFlLENBQUNDLGdEQUFTLENBQUNFLFVBQVUsNEJBQTRCLFNBQVNNLEtBQUssQ0FBQyxNQUFNQyxHQUFHLENBQUNDLENBQUFBLE9BQVFBLEtBQUtDLElBQUksSUFBSUMsTUFBTSxDQUFDQztRQUN6SSxNQUFNQyxjQUFjZixzREFBZSxDQUFDQyxnREFBUyxDQUFDRSxVQUFVLDRCQUE0QixTQUFTTSxLQUFLLENBQUMsTUFBTUMsR0FBRyxDQUFDQyxDQUFBQSxPQUFRQSxLQUFLQyxJQUFJLElBQUlDLE1BQU0sQ0FBQ0M7UUFDekksTUFBTUUsZUFBZWhCLHNEQUFlLENBQUNDLGdEQUFTLENBQUNFLFVBQVUsNkJBQTZCLFNBQVNNLEtBQUssQ0FBQyxNQUFNQyxHQUFHLENBQUNDLENBQUFBLE9BQVFBLEtBQUtDLElBQUksSUFBSUMsTUFBTSxDQUFDQztRQUMzSSxNQUFNRyxjQUFjakIsc0RBQWUsQ0FBQ0MsZ0RBQVMsQ0FBQ0UsVUFBVSw0QkFBNEIsU0FBU00sS0FBSyxDQUFDLE1BQU1DLEdBQUcsQ0FBQ0MsQ0FBQUEsT0FBUUEsS0FBS0MsSUFBSSxJQUFJQyxNQUFNLENBQUNDO1FBQ3pJLE1BQU1JLGVBQWVsQixzREFBZSxDQUFDQyxnREFBUyxDQUFDRSxVQUFVLDZCQUE2QixTQUFTTSxLQUFLLENBQUMsTUFBTUMsR0FBRyxDQUFDQyxDQUFBQSxPQUFRQSxLQUFLQyxJQUFJLElBQUlDLE1BQU0sQ0FBQ0M7UUFDM0ksTUFBTUssZ0JBQWdCbkIsc0RBQWUsQ0FBQ0MsZ0RBQVMsQ0FBQ0UsVUFBVSw4QkFBOEIsU0FBU00sS0FBSyxDQUFDLE1BQU1DLEdBQUcsQ0FBQ0MsQ0FBQUEsT0FBUUEsS0FBS0MsSUFBSSxJQUFJQyxNQUFNLENBQUNDO1FBRTdJLFlBQVk7UUFDWixNQUFNTSxjQUFjO1lBQUM7ZUFBV0MsS0FBS0MsS0FBSyxDQUFDdEIsc0RBQWUsQ0FBQ0MsZ0RBQVMsQ0FBQ0UsVUFBVSw0QkFBNEIsVUFBVW9CLE9BQU8sQ0FBQ2IsR0FBRyxDQUFDLENBQUNjLFNBQThCQSxPQUFPQyxLQUFLO1NBQUU7UUFDOUssTUFBTUMsY0FBYztZQUFDO2VBQWlCTCxLQUFLQyxLQUFLLENBQUN0QixzREFBZSxDQUFDQyxnREFBUyxDQUFDRSxVQUFVLDBCQUEwQixVQUFVTyxHQUFHLENBQUMsQ0FBQ2MsU0FBNEJBLE9BQU9HLEdBQUc7U0FBRTtRQUV0SyxPQUFPNUIscURBQVlBLENBQUM2QixJQUFJLENBQUM7WUFDdkJDLDJCQUEyQlQ7WUFDM0JVLHVCQUF1Qlg7WUFDdkJZLHNCQUFzQmhCO1lBQ3RCaUIscUJBQXFCekI7WUFDckIwQixxQkFBcUJQO1lBQ3JCUSx5QkFBeUJsQjtZQUN6Qm1CLG1CQUFtQmxCO1lBQ25CbUIsc0JBQXNCbEI7UUFDeEIsR0FBRztZQUFFbUIsUUFBUTtRQUFJO0lBRW5CLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsWUFBWUE7UUFDMUIsT0FBT3ZDLHFEQUFZQSxDQUFDNkIsSUFBSSxDQUFDO1lBQUVVLE9BQU87UUFBZ0IsR0FBRztZQUFFRCxRQUFRO1FBQUk7SUFDckU7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUT05cXERlc2t0b3BcXFdFQkNPREVcXE5leHRKU1xcdGYtbWFuYWdlclxcYXBwXFxhcGlcXGxvYWRPcHRpb25zSW5pdGlhbGluaXRpYWxpemF0aW9uXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYmFzZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJhcHAvZGF0YS9vcHRpb25hcGlpbml0aWFsaW5pdGlhbGl6YXRpb25cIik7XHJcblxyXG4gICAgLy8gTE9BRCAuVFhULCBN4buWSSBEw5JORyBMw4AgMSBQSOG6pk4gVOG7rFxyXG4gICAgY29uc3QgY291bnRyeURhdGEgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJhc2VQYXRoLCBcImZpbGVfb3B0aW9uX2NvdW50cnkudHh0XCIpLCBcInV0Zi04XCIpLnNwbGl0KFwiXFxuXCIpLm1hcChsaW5lID0+IGxpbmUudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XHJcbiAgICBjb25zdCBuYW1lR2VuRGF0YSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYmFzZVBhdGgsIFwiZmlsZV9vcHRpb25fbmFtZWdlbi50eHRcIiksIFwidXRmLThcIikuc3BsaXQoXCJcXG5cIikubWFwKGxpbmUgPT4gbGluZS50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcclxuICAgIGNvbnN0IHBob25lR2VuRGF0YSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYmFzZVBhdGgsIFwiZmlsZV9vcHRpb25fcGhvbmVnZW4udHh0XCIpLCBcInV0Zi04XCIpLnNwbGl0KFwiXFxuXCIpLm1hcChsaW5lID0+IGxpbmUudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XHJcbiAgICBjb25zdCBtYWlsR2VuRGF0YSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYmFzZVBhdGgsIFwiZmlsZV9vcHRpb25fbWFpbGdlbi50eHRcIiksIFwidXRmLThcIikuc3BsaXQoXCJcXG5cIikubWFwKGxpbmUgPT4gbGluZS50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcclxuICAgIGNvbnN0IGxhbmd1YWdlRGF0YSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYmFzZVBhdGgsIFwiZmlsZV9vcHRpb25fbGFuZ3VhZ2UudHh0XCIpLCBcInV0Zi04XCIpLnNwbGl0KFwiXFxuXCIpLm1hcChsaW5lID0+IGxpbmUudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XHJcbiAgICBjb25zdCB1c2VyQWdlbnREYXRhID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlUGF0aCwgXCJmaWxlX29wdGlvbl91c2VyYWdlbnQudHh0XCIpLCBcInV0Zi04XCIpLnNwbGl0KFwiXFxuXCIpLm1hcChsaW5lID0+IGxpbmUudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XHJcblxyXG4gICAgLy8gTE9BRCBKU09OXHJcbiAgICBjb25zdCBwaG9uZU1vZGVscyA9IFtcIlJBTkRcIiwgLi4uSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJhc2VQYXRoLCBcImpzb25QaG9uZUluZm9fZGF0YS5qc29uXCIpLCBcInV0Zi04XCIpKS5kZXZpY2VzLm1hcCgoZGV2aWNlOiB7IE1PREVMOiBzdHJpbmcgfSkgPT4gZGV2aWNlLk1PREVMKV07XHJcbiAgICBjb25zdCBjYXJyaWVyRGF0YSA9IFtcIkFTLUNPVU5UUllcIiwgLi4uSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJhc2VQYXRoLCBcImpzb25DYXJyaWVyX2RhdGEuanNvblwiKSwgXCJ1dGYtOFwiKSkubWFwKChkZXZpY2U6IHsgSVNPOiBzdHJpbmcgfSkgPT4gZGV2aWNlLklTTyldOyAgICBcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdGFwZXJjaGFuZ2V0eXBlUEhPTkVJTkZPOiBwaG9uZU1vZGVscyxcclxuICAgICAgc3RhcGVyY2hhbmdlVVNFUkFHRU5UOiB1c2VyQWdlbnREYXRhLFxyXG4gICAgICBzdGFwZXJjaGFuZ2V0eXBlTkFNRTogbmFtZUdlbkRhdGEsXHJcbiAgICAgIHN0YXBlcmNoYW5nZUNPVU5UUlk6IGNvdW50cnlEYXRhLFxyXG4gICAgICBzdGFwZXJjaGFuZ2VDYXJyaWVyOiBjYXJyaWVyRGF0YSxcclxuICAgICAgc3RhcGVyY2hhbmdlUEhPTkVOVU1CRVI6IHBob25lR2VuRGF0YSxcclxuICAgICAgc3RhcGVyY2hhbmdlRU1BSUw6IG1haWxHZW5EYXRhLFxyXG4gICAgICBzdGFwZXJjaGFuZ2VMQU5HVUFHRTogbGFuZ3VhZ2VEYXRhXHJcbiAgICB9LCB7IHN0YXR1czogMjAwIH0pO1xyXG5cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkzhu5dpIEFQSTpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQ8OzIGzhu5dpIHjhuqN5IHJhXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImZzIiwicGF0aCIsIkdFVCIsImJhc2VQYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJjb3VudHJ5RGF0YSIsInJlYWRGaWxlU3luYyIsInNwbGl0IiwibWFwIiwibGluZSIsInRyaW0iLCJmaWx0ZXIiLCJCb29sZWFuIiwibmFtZUdlbkRhdGEiLCJwaG9uZUdlbkRhdGEiLCJtYWlsR2VuRGF0YSIsImxhbmd1YWdlRGF0YSIsInVzZXJBZ2VudERhdGEiLCJwaG9uZU1vZGVscyIsIkpTT04iLCJwYXJzZSIsImRldmljZXMiLCJkZXZpY2UiLCJNT0RFTCIsImNhcnJpZXJEYXRhIiwiSVNPIiwianNvbiIsInN0YXBlcmNoYW5nZXR5cGVQSE9ORUlORk8iLCJzdGFwZXJjaGFuZ2VVU0VSQUdFTlQiLCJzdGFwZXJjaGFuZ2V0eXBlTkFNRSIsInN0YXBlcmNoYW5nZUNPVU5UUlkiLCJzdGFwZXJjaGFuZ2VDYXJyaWVyIiwic3RhcGVyY2hhbmdlUEhPTkVOVU1CRVIiLCJzdGFwZXJjaGFuZ2VFTUFJTCIsInN0YXBlcmNoYW5nZUxBTkdVQUdFIiwic3RhdHVzIiwiZXJyb3IiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/loadOptionsInitialinitialization/route.ts\n");

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
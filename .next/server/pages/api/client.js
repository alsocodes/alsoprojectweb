"use strict";
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
exports.id = "pages/api/client";
exports.ids = ["pages/api/client"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\n\nif (false) {} else {\n  if (!global.prisma) {\n    global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n  }\n\n  prisma = global.prisma;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBRUEsSUFBSUMsTUFBSjs7QUFFQSxJQUFJLE9BQXVDLEVBQTNDLE1BRU87RUFDTCxJQUFJLENBQUNDLE1BQU0sQ0FBQ0QsTUFBWixFQUFvQjtJQUNsQkMsTUFBTSxDQUFDRCxNQUFQLEdBQWdCLElBQUlELHdEQUFKLEVBQWhCO0VBQ0Q7O0VBQ0RDLE1BQU0sR0FBR0MsTUFBTSxDQUFDRCxNQUFoQjtBQUNEOztBQUVELGlFQUFlQSxNQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWxzby8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmxldCBwcmlzbWE6IFByaXNtYUNsaWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xufSBlbHNlIHtcbiAgaWYgKCFnbG9iYWwucHJpc21hKSB7XG4gICAgZ2xvYmFsLnByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcbiAgfVxuICBwcmlzbWEgPSBnbG9iYWwucHJpc21hO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/client/index.ts":
/*!***********************************!*\
  !*** ./pages/api/client/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n\n// POST /api/post\n// Required fields in body: title\n// Optional fields in body: content\nasync function handle(req, res) {\n  try {\n    const {\n      email,\n      name,\n      address,\n      phone,\n      picName,\n      picPhone\n    } = req.body;\n    const result = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].client.create({\n      data: {\n        email: email,\n        name: name,\n        address: address,\n        phone: phone,\n        picName: picName,\n        picPhone: picPhone,\n        deletedAt: null\n      }\n    }); // const { name, description, periodTerm, date, amount,  } = req.body;\n    // const result = await prisma.service.create({\n    //   data: {},\n    // });\n\n    res.json(result);\n  } catch (error) {\n    console.log(error === null || error === void 0 ? void 0 : error.message);\n    res.status(500).json(error);\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2xpZW50L2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDZSxlQUFlQyxNQUFmLENBQ2JDLEdBRGEsRUFFYkMsR0FGYSxFQUdiO0VBQ0EsSUFBSTtJQUNGLE1BQU07TUFBRUMsS0FBRjtNQUFTQyxJQUFUO01BQWVDLE9BQWY7TUFBd0JDLEtBQXhCO01BQStCQyxPQUEvQjtNQUF3Q0M7SUFBeEMsSUFBcURQLEdBQUcsQ0FBQ1EsSUFBL0Q7SUFDQSxNQUFNQyxNQUFNLEdBQUcsTUFBTVgsaUVBQUEsQ0FBcUI7TUFDeENjLElBQUksRUFBRTtRQUNKVixLQUFLLEVBQUVBLEtBREg7UUFFSkMsSUFBSSxFQUFFQSxJQUZGO1FBR0pDLE9BQU8sRUFBRUEsT0FITDtRQUlKQyxLQUFLLEVBQUVBLEtBSkg7UUFLSkMsT0FBTyxFQUFFQSxPQUxMO1FBTUpDLFFBQVEsRUFBRUEsUUFOTjtRQU9KTSxTQUFTLEVBQUU7TUFQUDtJQURrQyxDQUFyQixDQUFyQixDQUZFLENBYUY7SUFDQTtJQUNBO0lBQ0E7O0lBQ0FaLEdBQUcsQ0FBQ2EsSUFBSixDQUFTTCxNQUFUO0VBQ0QsQ0FsQkQsQ0FrQkUsT0FBT00sS0FBUCxFQUFjO0lBQ2RDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaLGFBQVlBLEtBQVosdUJBQVlBLEtBQUssQ0FBRUcsT0FBbkI7SUFDQWpCLEdBQUcsQ0FBQ2tCLE1BQUosQ0FBVyxHQUFYLEVBQWdCTCxJQUFoQixDQUFxQkMsS0FBckI7RUFDRDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWxzby8uL3BhZ2VzL2FwaS9jbGllbnQvaW5kZXgudHM/OTg2ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gJy4uLy4uLy4uL2xpYi9wcmlzbWEnO1xuaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XG5cbi8vIFBPU1QgL2FwaS9wb3N0XG4vLyBSZXF1aXJlZCBmaWVsZHMgaW4gYm9keTogdGl0bGVcbi8vIE9wdGlvbmFsIGZpZWxkcyBpbiBib2R5OiBjb250ZW50XG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGUoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVtYWlsLCBuYW1lLCBhZGRyZXNzLCBwaG9uZSwgcGljTmFtZSwgcGljUGhvbmUgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByaXNtYS5jbGllbnQuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgIHBpY05hbWU6IHBpY05hbWUsXG4gICAgICAgIHBpY1Bob25lOiBwaWNQaG9uZSxcbiAgICAgICAgZGVsZXRlZEF0OiBudWxsLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBwZXJpb2RUZXJtLCBkYXRlLCBhbW91bnQsICB9ID0gcmVxLmJvZHk7XG4gICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJpc21hLnNlcnZpY2UuY3JlYXRlKHtcbiAgICAvLyAgIGRhdGE6IHt9LFxuICAgIC8vIH0pO1xuICAgIHJlcy5qc29uKHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3I/Lm1lc3NhZ2UpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycm9yKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInByaXNtYSIsImhhbmRsZSIsInJlcSIsInJlcyIsImVtYWlsIiwibmFtZSIsImFkZHJlc3MiLCJwaG9uZSIsInBpY05hbWUiLCJwaWNQaG9uZSIsImJvZHkiLCJyZXN1bHQiLCJjbGllbnQiLCJjcmVhdGUiLCJkYXRhIiwiZGVsZXRlZEF0IiwianNvbiIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/client/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/client/index.ts"));
module.exports = __webpack_exports__;

})();
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/modules/RemoveFriend.js":
/*!*******************************************!*\
  !*** ./assets/js/modules/RemoveFriend.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removefriend: () => (/* binding */ removefriend)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar RemoveFriend = /*#__PURE__*/function () {\n  function RemoveFriend() {\n    _classCallCheck(this, RemoveFriend);\n    this.events();\n  }\n  return _createClass(RemoveFriend, [{\n    key: \"events\",\n    value: function events() {\n      this.remove_friend();\n    }\n  }, {\n    key: \"remove_friend\",\n    value: function remove_friend() {\n      var removeFriend = document.getElementById(\"removeFriend\");\n      if (removeFriend) {\n        removeFriend.addEventListener(\"click\", function (e) {\n          e.preventDefault();\n          var bodyFormData = new FormData();\n          bodyFormData.append(\"remove_friend\", \"remove_friend\");\n          bodyFormData.append(\"user_to\", profileUsername);\n          bodyFormData.append(\"user_from\", userLoggedIn);\n          axios({\n            method: \"post\",\n            url: \"includes/handlers/send_requests.php\",\n            headers: {\n              \"Content-Type\": \"multipart/form-data\"\n            },\n            data: bodyFormData\n          }).then(function (res) {\n            removeFriend.value = \"Friend Removed\";\n            removeFriend.disabled = true;\n          })[\"catch\"](function (err) {\n            return console.error(err);\n          });\n        });\n      }\n    }\n  }]);\n}();\n;\nvar removefriend = new RemoveFriend();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvanMvbW9kdWxlcy9SZW1vdmVGcmllbmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxZQUFZO0VBRWhCLFNBQUFBLGFBQUEsRUFBYztJQUFBQyxlQUFBLE9BQUFELFlBQUE7SUFDWixJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0VBRWY7RUFBQyxPQUFBQyxZQUFBLENBQUFILFlBQUE7SUFBQUksR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQUgsTUFBTUEsQ0FBQSxFQUFHO01BRVAsSUFBSSxDQUFDSSxhQUFhLENBQUMsQ0FBQztJQUV0QjtFQUFDO0lBQUFGLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFDLGFBQWFBLENBQUEsRUFBRztNQUVkLElBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDO01BRTVELElBQUlGLFlBQVksRUFBRTtRQUVoQkEsWUFBWSxDQUFDRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVUMsQ0FBQyxFQUFFO1VBQ2xEQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO1VBRWxCLElBQUlDLFlBQVksR0FBRyxJQUFJQyxRQUFRLENBQUMsQ0FBQztVQUVqQ0QsWUFBWSxDQUFDRSxNQUFNLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztVQUNyREYsWUFBWSxDQUFDRSxNQUFNLENBQUMsU0FBUyxFQUFFQyxlQUFlLENBQUM7VUFDL0NILFlBQVksQ0FBQ0UsTUFBTSxDQUFDLFdBQVcsRUFBRUUsWUFBWSxDQUFDO1VBRTlDQyxLQUFLLENBQUM7WUFDSkMsTUFBTSxFQUFFLE1BQU07WUFDZEMsR0FBRyxFQUFFLHFDQUFxQztZQUMxQ0MsT0FBTyxFQUFFO2NBQ1AsY0FBYyxFQUFFO1lBQ2xCLENBQUM7WUFDREMsSUFBSSxFQUFFVDtVQUNSLENBQUMsQ0FBQyxDQUNDVSxJQUFJLENBQUMsVUFBQ0MsR0FBRyxFQUFLO1lBQ2JqQixZQUFZLENBQUNGLEtBQUssR0FBRyxnQkFBZ0I7WUFDckNFLFlBQVksQ0FBQ2tCLFFBQVEsR0FBRyxJQUFJO1VBQzlCLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQ0MsR0FBRztZQUFBLE9BQUtDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDRixHQUFHLENBQUM7VUFBQSxFQUFDO1FBQ3ZDLENBQUMsQ0FBQztNQUNKO0lBQ0Y7RUFBQztBQUFBO0FBQ0Y7QUFFTSxJQUFNRyxZQUFZLEdBQUcsSUFBSTdCLFlBQVksQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL2Fzc2V0cy9qcy9tb2R1bGVzL1JlbW92ZUZyaWVuZC5qcz8wN2Q0Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFJlbW92ZUZyaWVuZCB7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmV2ZW50cygpXHJcblxyXG4gIH1cclxuXHJcbiAgZXZlbnRzKCkge1xyXG5cclxuICAgIHRoaXMucmVtb3ZlX2ZyaWVuZCgpXHJcbiBcclxuICB9XHJcblxyXG4gIHJlbW92ZV9mcmllbmQoKSB7XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlRnJpZW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW1vdmVGcmllbmRcIik7XHJcbiAgICBcclxuICAgIGlmIChyZW1vdmVGcmllbmQpIHtcclxuXHJcbiAgICAgIHJlbW92ZUZyaWVuZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXHJcbiAgICAgICAgdmFyIGJvZHlGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIFxyXG4gICAgICAgIGJvZHlGb3JtRGF0YS5hcHBlbmQoXCJyZW1vdmVfZnJpZW5kXCIsIFwicmVtb3ZlX2ZyaWVuZFwiKTtcclxuICAgICAgICBib2R5Rm9ybURhdGEuYXBwZW5kKFwidXNlcl90b1wiLCBwcm9maWxlVXNlcm5hbWUpO1xyXG4gICAgICAgIGJvZHlGb3JtRGF0YS5hcHBlbmQoXCJ1c2VyX2Zyb21cIiwgdXNlckxvZ2dlZEluKTtcclxuICBcclxuICAgICAgICBheGlvcyh7XHJcbiAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgdXJsOiBcImluY2x1ZGVzL2hhbmRsZXJzL3NlbmRfcmVxdWVzdHMucGhwXCIsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRhdGE6IGJvZHlGb3JtRGF0YSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICByZW1vdmVGcmllbmQudmFsdWUgPSBcIkZyaWVuZCBSZW1vdmVkXCI7XHJcbiAgICAgICAgICAgIHJlbW92ZUZyaWVuZC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVmcmllbmQgPSBuZXcgUmVtb3ZlRnJpZW5kKCk7XHJcbiJdLCJuYW1lcyI6WyJSZW1vdmVGcmllbmQiLCJfY2xhc3NDYWxsQ2hlY2siLCJldmVudHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInJlbW92ZV9mcmllbmQiLCJyZW1vdmVGcmllbmQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImJvZHlGb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicHJvZmlsZVVzZXJuYW1lIiwidXNlckxvZ2dlZEluIiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJoZWFkZXJzIiwiZGF0YSIsInRoZW4iLCJyZXMiLCJkaXNhYmxlZCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlbW92ZWZyaWVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/js/modules/RemoveFriend.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/modules/RemoveFriend.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
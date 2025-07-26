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

/***/ "./assets/js/modules/AddFriend.js":
/*!****************************************!*\
  !*** ./assets/js/modules/AddFriend.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addfriend: () => (/* binding */ addfriend)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar AddFriend = /*#__PURE__*/function () {\n  function AddFriend() {\n    _classCallCheck(this, AddFriend);\n    this.events();\n  }\n  return _createClass(AddFriend, [{\n    key: \"events\",\n    value: function events() {\n      this.add_friend();\n    }\n  }, {\n    key: \"add_friend\",\n    value: function add_friend() {\n      var addFriend = document.getElementById(\"addFriend\");\n      if (addFriend) {\n        addFriend.addEventListener(\"click\", function (e) {\n          e.preventDefault();\n          var bodyFormData = new FormData();\n          bodyFormData.append(\"add_friend\", \"add_friend\");\n          bodyFormData.append(\"user_to\", profileUsername);\n          bodyFormData.append(\"user_from\", userLoggedIn);\n          axios({\n            method: \"post\",\n            url: \"includes/handlers/send_requests.php\",\n            headers: {\n              \"Content-Type\": \"multipart/form-data\"\n            },\n            data: bodyFormData\n          }).then(function (res) {\n            addFriend.value = \"Request Sent\";\n            addFriend.disabled = true;\n          })[\"catch\"](function (err) {\n            return console.error(err);\n          });\n        });\n      }\n    }\n  }]);\n}();\n;\nvar addfriend = new AddFriend();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvanMvbW9kdWxlcy9BZGRGcmllbmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxTQUFTO0VBRWIsU0FBQUEsVUFBQSxFQUFjO0lBQUFDLGVBQUEsT0FBQUQsU0FBQTtJQUNaLElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUM7RUFDZjtFQUFDLE9BQUFDLFlBQUEsQ0FBQUgsU0FBQTtJQUFBSSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBSCxNQUFNQSxDQUFBLEVBQUc7TUFFUCxJQUFJLENBQUNJLFVBQVUsQ0FBQyxDQUFDO0lBRW5CO0VBQUM7SUFBQUYsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQUMsVUFBVUEsQ0FBQSxFQUFHO01BRVgsSUFBTUMsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxXQUFXLENBQUM7TUFFdEQsSUFBSUYsU0FBUyxFQUFFO1FBQ2JBLFNBQVMsQ0FBQ0csZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVVDLENBQUMsRUFBRTtVQUMvQ0EsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztVQUVsQixJQUFJQyxZQUFZLEdBQUcsSUFBSUMsUUFBUSxDQUFDLENBQUM7VUFFakNELFlBQVksQ0FBQ0UsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7VUFDL0NGLFlBQVksQ0FBQ0UsTUFBTSxDQUFDLFNBQVMsRUFBRUMsZUFBZSxDQUFDO1VBQy9DSCxZQUFZLENBQUNFLE1BQU0sQ0FBQyxXQUFXLEVBQUVFLFlBQVksQ0FBQztVQUU5Q0MsS0FBSyxDQUFDO1lBQ0pDLE1BQU0sRUFBRSxNQUFNO1lBQ2RDLEdBQUcsRUFBRSxxQ0FBcUM7WUFDMUNDLE9BQU8sRUFBRTtjQUNQLGNBQWMsRUFBRTtZQUNsQixDQUFDO1lBQ0RDLElBQUksRUFBRVQ7VUFDUixDQUFDLENBQUMsQ0FDQ1UsSUFBSSxDQUFDLFVBQUNDLEdBQUcsRUFBSztZQUNiakIsU0FBUyxDQUFDRixLQUFLLEdBQUcsY0FBYztZQUNoQ0UsU0FBUyxDQUFDa0IsUUFBUSxHQUFHLElBQUk7VUFDM0IsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFDQyxHQUFHO1lBQUEsT0FBS0MsT0FBTyxDQUFDQyxLQUFLLENBQUNGLEdBQUcsQ0FBQztVQUFBLEVBQUM7UUFDdkMsQ0FBQyxDQUFDO01BQ0o7SUFHRjtFQUFDO0FBQUE7QUFDRjtBQUVNLElBQU1HLFNBQVMsR0FBRyxJQUFJN0IsU0FBUyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vYXNzZXRzL2pzL21vZHVsZXMvQWRkRnJpZW5kLmpzPzg4NWEiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQWRkRnJpZW5kIHtcclxuICBcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZXZlbnRzKClcclxuICB9XHJcblxyXG4gIGV2ZW50cygpIHtcclxuICAgIFxyXG4gICAgdGhpcy5hZGRfZnJpZW5kKClcclxuXHJcbiAgfVxyXG5cclxuICBhZGRfZnJpZW5kKCkge1xyXG5cclxuICAgIGNvbnN0IGFkZEZyaWVuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkRnJpZW5kXCIpO1xyXG5cclxuICAgIGlmIChhZGRGcmllbmQpIHtcclxuICAgICAgYWRkRnJpZW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICBcclxuICAgICAgICB2YXIgYm9keUZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgXHJcbiAgICAgICAgYm9keUZvcm1EYXRhLmFwcGVuZChcImFkZF9mcmllbmRcIiwgXCJhZGRfZnJpZW5kXCIpO1xyXG4gICAgICAgIGJvZHlGb3JtRGF0YS5hcHBlbmQoXCJ1c2VyX3RvXCIsIHByb2ZpbGVVc2VybmFtZSk7XHJcbiAgICAgICAgYm9keUZvcm1EYXRhLmFwcGVuZChcInVzZXJfZnJvbVwiLCB1c2VyTG9nZ2VkSW4pO1xyXG4gIFxyXG4gICAgICAgIGF4aW9zKHtcclxuICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICB1cmw6IFwiaW5jbHVkZXMvaGFuZGxlcnMvc2VuZF9yZXF1ZXN0cy5waHBcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGF0YTogYm9keUZvcm1EYXRhLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGFkZEZyaWVuZC52YWx1ZSA9IFwiUmVxdWVzdCBTZW50XCI7XHJcbiAgICAgICAgICAgIGFkZEZyaWVuZC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZGZyaWVuZCA9IG5ldyBBZGRGcmllbmQoKTsiXSwibmFtZXMiOlsiQWRkRnJpZW5kIiwiX2NsYXNzQ2FsbENoZWNrIiwiZXZlbnRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJhZGRfZnJpZW5kIiwiYWRkRnJpZW5kIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJib2R5Rm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2ZpbGVVc2VybmFtZSIsInVzZXJMb2dnZWRJbiIsImF4aW9zIiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRhdGEiLCJ0aGVuIiwicmVzIiwiZGlzYWJsZWQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRmcmllbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./assets/js/modules/AddFriend.js\n");

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
/******/ 	__webpack_modules__["./assets/js/modules/AddFriend.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addfriend\": () => (/* binding */ addfriend)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nvar AddFriend = /*#__PURE__*/function () {\n  function AddFriend() {\n    _classCallCheck(this, AddFriend);\n\n    this.events();\n  }\n\n  _createClass(AddFriend, [{\n    key: \"events\",\n    value: function events() {\n      this.add_friend();\n    }\n  }, {\n    key: \"add_friend\",\n    value: function add_friend() {\n      var addFriend = document.getElementById(\"addFriend\");\n\n      if (addFriend) {\n        addFriend.addEventListener(\"click\", function (e) {\n          e.preventDefault();\n          var bodyFormData = new FormData();\n          bodyFormData.append(\"add_friend\", \"add_friend\");\n          bodyFormData.append(\"user_to\", profileUsername);\n          bodyFormData.append(\"user_from\", userLoggedIn);\n          axios({\n            method: \"post\",\n            url: \"includes/handlers/send_requests.php\",\n            headers: {\n              \"Content-Type\": \"multipart/form-data\"\n            },\n            data: bodyFormData\n          }).then(function (res) {\n            addFriend.value = \"Request Sent\";\n            addFriend.disabled = true;\n          })[\"catch\"](function (err) {\n            return console.error(err);\n          });\n        });\n      }\n    }\n  }]);\n\n  return AddFriend;\n}();\n\n;\nvar addfriend = new AddFriend();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvanMvbW9kdWxlcy9BZGRGcmllbmQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQTtBQUVKLHVCQUFjO0FBQUE7O0FBQ1osU0FBS0MsTUFBTDtBQUNEOzs7O1dBRUQsa0JBQVM7QUFFUCxXQUFLQyxVQUFMO0FBRUQ7OztXQUVELHNCQUFhO0FBRVgsVUFBTUMsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbEI7O0FBRUEsVUFBSUYsU0FBSixFQUFlO0FBQ2JBLFFBQUFBLFNBQVMsQ0FBQ0csZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBVUMsQ0FBVixFQUFhO0FBQy9DQSxVQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFFQSxjQUFJQyxZQUFZLEdBQUcsSUFBSUMsUUFBSixFQUFuQjtBQUVBRCxVQUFBQSxZQUFZLENBQUNFLE1BQWIsQ0FBb0IsWUFBcEIsRUFBa0MsWUFBbEM7QUFDQUYsVUFBQUEsWUFBWSxDQUFDRSxNQUFiLENBQW9CLFNBQXBCLEVBQStCQyxlQUEvQjtBQUNBSCxVQUFBQSxZQUFZLENBQUNFLE1BQWIsQ0FBb0IsV0FBcEIsRUFBaUNFLFlBQWpDO0FBRUFDLFVBQUFBLEtBQUssQ0FBQztBQUNKQyxZQUFBQSxNQUFNLEVBQUUsTUFESjtBQUVKQyxZQUFBQSxHQUFHLEVBQUUscUNBRkQ7QUFHSkMsWUFBQUEsT0FBTyxFQUFFO0FBQ1AsOEJBQWdCO0FBRFQsYUFITDtBQU1KQyxZQUFBQSxJQUFJLEVBQUVUO0FBTkYsV0FBRCxDQUFMLENBUUdVLElBUkgsQ0FRUSxVQUFDQyxHQUFELEVBQVM7QUFDYmpCLFlBQUFBLFNBQVMsQ0FBQ2tCLEtBQVYsR0FBa0IsY0FBbEI7QUFDQWxCLFlBQUFBLFNBQVMsQ0FBQ21CLFFBQVYsR0FBcUIsSUFBckI7QUFDRCxXQVhILFdBWVMsVUFBQ0MsR0FBRDtBQUFBLG1CQUFTQyxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsR0FBZCxDQUFUO0FBQUEsV0FaVDtBQWFELFNBdEJEO0FBdUJEO0FBR0Y7Ozs7OztBQUNGO0FBRU0sSUFBTUcsU0FBUyxHQUFHLElBQUkxQixTQUFKLEVBQWxCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL2Fzc2V0cy9qcy9tb2R1bGVzL0FkZEZyaWVuZC5qcz84ODVhIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFkZEZyaWVuZCB7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmV2ZW50cygpXHJcbiAgfVxyXG5cclxuICBldmVudHMoKSB7XHJcbiAgICBcclxuICAgIHRoaXMuYWRkX2ZyaWVuZCgpXHJcblxyXG4gIH1cclxuXHJcbiAgYWRkX2ZyaWVuZCgpIHtcclxuXHJcbiAgICBjb25zdCBhZGRGcmllbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEZyaWVuZFwiKTtcclxuXHJcbiAgICBpZiAoYWRkRnJpZW5kKSB7XHJcbiAgICAgIGFkZEZyaWVuZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXHJcbiAgICAgICAgdmFyIGJvZHlGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIFxyXG4gICAgICAgIGJvZHlGb3JtRGF0YS5hcHBlbmQoXCJhZGRfZnJpZW5kXCIsIFwiYWRkX2ZyaWVuZFwiKTtcclxuICAgICAgICBib2R5Rm9ybURhdGEuYXBwZW5kKFwidXNlcl90b1wiLCBwcm9maWxlVXNlcm5hbWUpO1xyXG4gICAgICAgIGJvZHlGb3JtRGF0YS5hcHBlbmQoXCJ1c2VyX2Zyb21cIiwgdXNlckxvZ2dlZEluKTtcclxuICBcclxuICAgICAgICBheGlvcyh7XHJcbiAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgdXJsOiBcImluY2x1ZGVzL2hhbmRsZXJzL3NlbmRfcmVxdWVzdHMucGhwXCIsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRhdGE6IGJvZHlGb3JtRGF0YSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBhZGRGcmllbmQudmFsdWUgPSBcIlJlcXVlc3QgU2VudFwiO1xyXG4gICAgICAgICAgICBhZGRGcmllbmQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRmcmllbmQgPSBuZXcgQWRkRnJpZW5kKCk7Il0sIm5hbWVzIjpbIkFkZEZyaWVuZCIsImV2ZW50cyIsImFkZF9mcmllbmQiLCJhZGRGcmllbmQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImJvZHlGb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicHJvZmlsZVVzZXJuYW1lIiwidXNlckxvZ2dlZEluIiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJoZWFkZXJzIiwiZGF0YSIsInRoZW4iLCJyZXMiLCJ2YWx1ZSIsImRpc2FibGVkIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiYWRkZnJpZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./assets/js/modules/AddFriend.js\n");

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
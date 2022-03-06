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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"removefriend\": () => (/* binding */ removefriend)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nvar RemoveFriend = /*#__PURE__*/function () {\n  function RemoveFriend() {\n    _classCallCheck(this, RemoveFriend);\n\n    this.events();\n  }\n\n  _createClass(RemoveFriend, [{\n    key: \"events\",\n    value: function events() {\n      this.remove_friend();\n    }\n  }, {\n    key: \"remove_friend\",\n    value: function remove_friend() {\n      var removeFriend = document.getElementById(\"removeFriend\");\n\n      if (removeFriend) {\n        removeFriend.addEventListener(\"click\", function (e) {\n          e.preventDefault();\n          var bodyFormData = new FormData();\n          bodyFormData.append(\"remove_friend\", \"remove_friend\");\n          bodyFormData.append(\"user_to\", profileUsername);\n          bodyFormData.append(\"user_from\", userLoggedIn);\n          axios({\n            method: \"post\",\n            url: \"includes/handlers/send_requests.php\",\n            headers: {\n              \"Content-Type\": \"multipart/form-data\"\n            },\n            data: bodyFormData\n          }).then(function (res) {\n            removeFriend.value = \"Friend Removed\";\n            removeFriend.disabled = true;\n          })[\"catch\"](function (err) {\n            return console.error(err);\n          });\n        });\n      }\n    }\n  }]);\n\n  return RemoveFriend;\n}();\n\n;\nvar removefriend = new RemoveFriend();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvanMvbW9kdWxlcy9SZW1vdmVGcmllbmQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQTtBQUVKLDBCQUFjO0FBQUE7O0FBQ1osU0FBS0MsTUFBTDtBQUVEOzs7O1dBRUQsa0JBQVM7QUFFUCxXQUFLQyxhQUFMO0FBRUQ7OztXQUVELHlCQUFnQjtBQUVkLFVBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLGNBQXhCLENBQXJCOztBQUVBLFVBQUlGLFlBQUosRUFBa0I7QUFFaEJBLFFBQUFBLFlBQVksQ0FBQ0csZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsVUFBVUMsQ0FBVixFQUFhO0FBQ2xEQSxVQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFFQSxjQUFJQyxZQUFZLEdBQUcsSUFBSUMsUUFBSixFQUFuQjtBQUVBRCxVQUFBQSxZQUFZLENBQUNFLE1BQWIsQ0FBb0IsZUFBcEIsRUFBcUMsZUFBckM7QUFDQUYsVUFBQUEsWUFBWSxDQUFDRSxNQUFiLENBQW9CLFNBQXBCLEVBQStCQyxlQUEvQjtBQUNBSCxVQUFBQSxZQUFZLENBQUNFLE1BQWIsQ0FBb0IsV0FBcEIsRUFBaUNFLFlBQWpDO0FBRUFDLFVBQUFBLEtBQUssQ0FBQztBQUNKQyxZQUFBQSxNQUFNLEVBQUUsTUFESjtBQUVKQyxZQUFBQSxHQUFHLEVBQUUscUNBRkQ7QUFHSkMsWUFBQUEsT0FBTyxFQUFFO0FBQ1AsOEJBQWdCO0FBRFQsYUFITDtBQU1KQyxZQUFBQSxJQUFJLEVBQUVUO0FBTkYsV0FBRCxDQUFMLENBUUdVLElBUkgsQ0FRUSxVQUFDQyxHQUFELEVBQVM7QUFDYmpCLFlBQUFBLFlBQVksQ0FBQ2tCLEtBQWIsR0FBcUIsZ0JBQXJCO0FBQ0FsQixZQUFBQSxZQUFZLENBQUNtQixRQUFiLEdBQXdCLElBQXhCO0FBQ0QsV0FYSCxXQVlTLFVBQUNDLEdBQUQ7QUFBQSxtQkFBU0MsT0FBTyxDQUFDQyxLQUFSLENBQWNGLEdBQWQsQ0FBVDtBQUFBLFdBWlQ7QUFhRCxTQXRCRDtBQXVCRDtBQUNGOzs7Ozs7QUFDRjtBQUVNLElBQU1HLFlBQVksR0FBRyxJQUFJMUIsWUFBSixFQUFyQiIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi9hc3NldHMvanMvbW9kdWxlcy9SZW1vdmVGcmllbmQuanM/MDdkNCJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBSZW1vdmVGcmllbmQge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ldmVudHMoKVxyXG5cclxuICB9XHJcblxyXG4gIGV2ZW50cygpIHtcclxuXHJcbiAgICB0aGlzLnJlbW92ZV9mcmllbmQoKVxyXG4gXHJcbiAgfVxyXG5cclxuICByZW1vdmVfZnJpZW5kKCkge1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZUZyaWVuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVtb3ZlRnJpZW5kXCIpO1xyXG4gICAgXHJcbiAgICBpZiAocmVtb3ZlRnJpZW5kKSB7XHJcblxyXG4gICAgICByZW1vdmVGcmllbmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG4gICAgICAgIHZhciBib2R5Rm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICBcclxuICAgICAgICBib2R5Rm9ybURhdGEuYXBwZW5kKFwicmVtb3ZlX2ZyaWVuZFwiLCBcInJlbW92ZV9mcmllbmRcIik7XHJcbiAgICAgICAgYm9keUZvcm1EYXRhLmFwcGVuZChcInVzZXJfdG9cIiwgcHJvZmlsZVVzZXJuYW1lKTtcclxuICAgICAgICBib2R5Rm9ybURhdGEuYXBwZW5kKFwidXNlcl9mcm9tXCIsIHVzZXJMb2dnZWRJbik7XHJcbiAgXHJcbiAgICAgICAgYXhpb3Moe1xyXG4gICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgIHVybDogXCJpbmNsdWRlcy9oYW5kbGVycy9zZW5kX3JlcXVlc3RzLnBocFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkYXRhOiBib2R5Rm9ybURhdGEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgcmVtb3ZlRnJpZW5kLnZhbHVlID0gXCJGcmllbmQgUmVtb3ZlZFwiO1xyXG4gICAgICAgICAgICByZW1vdmVGcmllbmQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlZnJpZW5kID0gbmV3IFJlbW92ZUZyaWVuZCgpO1xyXG4iXSwibmFtZXMiOlsiUmVtb3ZlRnJpZW5kIiwiZXZlbnRzIiwicmVtb3ZlX2ZyaWVuZCIsInJlbW92ZUZyaWVuZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYm9keUZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJwcm9maWxlVXNlcm5hbWUiLCJ1c2VyTG9nZ2VkSW4iLCJheGlvcyIsIm1ldGhvZCIsInVybCIsImhlYWRlcnMiLCJkYXRhIiwidGhlbiIsInJlcyIsInZhbHVlIiwiZGlzYWJsZWQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJyZW1vdmVmcmllbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./assets/js/modules/RemoveFriend.js\n");

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
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

/***/ "./assets/js/modules/Parallax.js":
/*!***************************************!*\
  !*** ./assets/js/modules/Parallax.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parallax\": () => (/* binding */ parallax)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nvar Parallax = /*#__PURE__*/function () {\n  function Parallax() {\n    var _this = this;\n\n    _classCallCheck(this, Parallax);\n\n    this.scroll = document.querySelector(\".scroll\");\n    /**\r\n     * Add an event listener for the window object to detect\r\n     * a scroll event\r\n     *  */\n\n    document.addEventListener(\"scroll\", function (e) {\n      _this.addParallaxScrolling(e);\n    });\n  }\n\n  _createClass(Parallax, [{\n    key: \"addParallaxScrolling\",\n    value: function addParallaxScrolling(e) {\n      var target = document.querySelectorAll(\".scroll\");\n      var index = 0,\n          length = target.length;\n\n      for (index; index < length; index++) {\n        var pos = window.pageYOffset * target[index].dataset.rate;\n\n        if (target[index].dataset.direction === \"vertical\") {\n          target[index].style.transform = \"translate3d(0px,\" + pos + \"px, 0px)\";\n        } else {\n          var posX = window.pageYOffset * target[index].dataset.ratex;\n          var posY = window.pageYOffset * target[index].dataset.ratey;\n          target[index].style.transform = \"translate3d(\" + posX + \"px, \" + posY + \"px, 0px)\";\n        }\n      }\n    }\n  }]);\n\n  return Parallax;\n}();\n\nvar parallax = new Parallax();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvanMvbW9kdWxlcy9QYXJhbGxheC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BO0FBQ0osc0JBQWM7QUFBQTs7QUFBQTs7QUFDWixTQUFLQyxNQUFMLEdBQWNDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixTQUF2QixDQUFkO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0lELElBQUFBLFFBQVEsQ0FBQ0UsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3pDLFdBQUksQ0FBQ0Msb0JBQUwsQ0FBMEJELENBQTFCO0FBRUQsS0FIRDtBQUlEOzs7O1dBR0QsOEJBQXFCQSxDQUFyQixFQUF3QjtBQUN0QixVQUFNRSxNQUFNLEdBQUdMLFFBQVEsQ0FBQ00sZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBZjtBQUVBLFVBQUlDLEtBQUssR0FBRyxDQUFaO0FBQUEsVUFDRUMsTUFBTSxHQUFHSCxNQUFNLENBQUNHLE1BRGxCOztBQUVBLFdBQUtELEtBQUwsRUFBWUEsS0FBSyxHQUFHQyxNQUFwQixFQUE0QkQsS0FBSyxFQUFqQyxFQUFxQztBQUNuQyxZQUFJRSxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQk4sTUFBTSxDQUFDRSxLQUFELENBQU4sQ0FBY0ssT0FBZCxDQUFzQkMsSUFBckQ7O0FBRUEsWUFBSVIsTUFBTSxDQUFDRSxLQUFELENBQU4sQ0FBY0ssT0FBZCxDQUFzQkUsU0FBdEIsS0FBb0MsVUFBeEMsRUFBb0Q7QUFDbERULFVBQUFBLE1BQU0sQ0FBQ0UsS0FBRCxDQUFOLENBQWNRLEtBQWQsQ0FBb0JDLFNBQXBCLEdBQWdDLHFCQUFxQlAsR0FBckIsR0FBMkIsVUFBM0Q7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJUSxJQUFJLEdBQUdQLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQk4sTUFBTSxDQUFDRSxLQUFELENBQU4sQ0FBY0ssT0FBZCxDQUFzQk0sS0FBdEQ7QUFDQSxjQUFJQyxJQUFJLEdBQUdULE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQk4sTUFBTSxDQUFDRSxLQUFELENBQU4sQ0FBY0ssT0FBZCxDQUFzQlEsS0FBdEQ7QUFFQWYsVUFBQUEsTUFBTSxDQUFDRSxLQUFELENBQU4sQ0FBY1EsS0FBZCxDQUFvQkMsU0FBcEIsR0FDRSxpQkFBaUJDLElBQWpCLEdBQXdCLE1BQXhCLEdBQWlDRSxJQUFqQyxHQUF3QyxVQUQxQztBQUVEO0FBQ0Y7QUFDRjs7Ozs7O0FBR0ksSUFBTUUsUUFBUSxHQUFHLElBQUl2QixRQUFKLEVBQWpCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL2Fzc2V0cy9qcy9tb2R1bGVzL1BhcmFsbGF4LmpzP2IxNTYiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGFyYWxsYXgge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjcm9sbFwiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHdpbmRvdyBvYmplY3QgdG8gZGV0ZWN0XHJcbiAgICAgKiBhIHNjcm9sbCBldmVudFxyXG4gICAgICogICovXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIChlKSA9PiB7XHJcbiAgICAgIHRoaXMuYWRkUGFyYWxsYXhTY3JvbGxpbmcoZSk7XHJcbiAgICAgIFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkUGFyYWxsYXhTY3JvbGxpbmcoZSkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zY3JvbGxcIik7XHJcblxyXG4gICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgbGVuZ3RoID0gdGFyZ2V0Lmxlbmd0aDtcclxuICAgIGZvciAoaW5kZXg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBwb3MgPSB3aW5kb3cucGFnZVlPZmZzZXQgKiB0YXJnZXRbaW5kZXhdLmRhdGFzZXQucmF0ZTtcclxuXHJcbiAgICAgIGlmICh0YXJnZXRbaW5kZXhdLmRhdGFzZXQuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICB0YXJnZXRbaW5kZXhdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoMHB4LFwiICsgcG9zICsgXCJweCwgMHB4KVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBwb3NYID0gd2luZG93LnBhZ2VZT2Zmc2V0ICogdGFyZ2V0W2luZGV4XS5kYXRhc2V0LnJhdGV4O1xyXG4gICAgICAgIHZhciBwb3NZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICogdGFyZ2V0W2luZGV4XS5kYXRhc2V0LnJhdGV5O1xyXG5cclxuICAgICAgICB0YXJnZXRbaW5kZXhdLnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICBcInRyYW5zbGF0ZTNkKFwiICsgcG9zWCArIFwicHgsIFwiICsgcG9zWSArIFwicHgsIDBweClcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHBhcmFsbGF4ID0gbmV3IFBhcmFsbGF4KCk7XHJcbiJdLCJuYW1lcyI6WyJQYXJhbGxheCIsInNjcm9sbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiYWRkUGFyYWxsYXhTY3JvbGxpbmciLCJ0YXJnZXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5kZXgiLCJsZW5ndGgiLCJwb3MiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsImRhdGFzZXQiLCJyYXRlIiwiZGlyZWN0aW9uIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJwb3NYIiwicmF0ZXgiLCJwb3NZIiwicmF0ZXkiLCJwYXJhbGxheCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/js/modules/Parallax.js\n");

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
/******/ 	__webpack_modules__["./assets/js/modules/Parallax.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
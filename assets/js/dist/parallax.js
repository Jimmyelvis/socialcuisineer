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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parallax: () => (/* binding */ parallax)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Parallax = /*#__PURE__*/function () {\n  function Parallax() {\n    var _this = this;\n    _classCallCheck(this, Parallax);\n    this.scroll = document.querySelector(\".scroll\");\n\n    /**\r\n     * Add an event listener for the window object to detect\r\n     * a scroll event\r\n     *  */\n    document.addEventListener(\"scroll\", function (e) {\n      _this.addParallaxScrolling(e);\n    });\n  }\n  return _createClass(Parallax, [{\n    key: \"addParallaxScrolling\",\n    value: function addParallaxScrolling(e) {\n      var target = document.querySelectorAll(\".scroll\");\n      var index = 0,\n        length = target.length;\n      for (index; index < length; index++) {\n        var pos = window.pageYOffset * target[index].dataset.rate;\n        if (target[index].dataset.direction === \"vertical\") {\n          target[index].style.transform = \"translate3d(0px,\" + pos + \"px, 0px)\";\n        } else {\n          var posX = window.pageYOffset * target[index].dataset.ratex;\n          var posY = window.pageYOffset * target[index].dataset.ratey;\n          target[index].style.transform = \"translate3d(\" + posX + \"px, \" + posY + \"px, 0px)\";\n        }\n      }\n    }\n  }]);\n}();\nvar parallax = new Parallax();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvanMvbW9kdWxlcy9QYXJhbGxheC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFFBQVE7RUFDWixTQUFBQSxTQUFBLEVBQWM7SUFBQSxJQUFBQyxLQUFBO0lBQUFDLGVBQUEsT0FBQUYsUUFBQTtJQUNaLElBQUksQ0FBQ0csTUFBTSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7O0lBRS9DO0FBQ0o7QUFDQTtBQUNBO0lBQ0lELFFBQVEsQ0FBQ0UsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUNDLENBQUMsRUFBSztNQUN6Q04sS0FBSSxDQUFDTyxvQkFBb0IsQ0FBQ0QsQ0FBQyxDQUFDO0lBRTlCLENBQUMsQ0FBQztFQUNKO0VBQUMsT0FBQUUsWUFBQSxDQUFBVCxRQUFBO0lBQUFVLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUFILG9CQUFvQkEsQ0FBQ0QsQ0FBQyxFQUFFO01BQ3RCLElBQU1LLE1BQU0sR0FBR1IsUUFBUSxDQUFDUyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7TUFFbkQsSUFBSUMsS0FBSyxHQUFHLENBQUM7UUFDWEMsTUFBTSxHQUFHSCxNQUFNLENBQUNHLE1BQU07TUFDeEIsS0FBS0QsS0FBSyxFQUFFQSxLQUFLLEdBQUdDLE1BQU0sRUFBRUQsS0FBSyxFQUFFLEVBQUU7UUFDbkMsSUFBSUUsR0FBRyxHQUFHQyxNQUFNLENBQUNDLFdBQVcsR0FBR04sTUFBTSxDQUFDRSxLQUFLLENBQUMsQ0FBQ0ssT0FBTyxDQUFDQyxJQUFJO1FBRXpELElBQUlSLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUNLLE9BQU8sQ0FBQ0UsU0FBUyxLQUFLLFVBQVUsRUFBRTtVQUNsRFQsTUFBTSxDQUFDRSxLQUFLLENBQUMsQ0FBQ1EsS0FBSyxDQUFDQyxTQUFTLEdBQUcsa0JBQWtCLEdBQUdQLEdBQUcsR0FBRyxVQUFVO1FBQ3ZFLENBQUMsTUFBTTtVQUNMLElBQUlRLElBQUksR0FBR1AsTUFBTSxDQUFDQyxXQUFXLEdBQUdOLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUNLLE9BQU8sQ0FBQ00sS0FBSztVQUMzRCxJQUFJQyxJQUFJLEdBQUdULE1BQU0sQ0FBQ0MsV0FBVyxHQUFHTixNQUFNLENBQUNFLEtBQUssQ0FBQyxDQUFDSyxPQUFPLENBQUNRLEtBQUs7VUFFM0RmLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUNRLEtBQUssQ0FBQ0MsU0FBUyxHQUMzQixjQUFjLEdBQUdDLElBQUksR0FBRyxNQUFNLEdBQUdFLElBQUksR0FBRyxVQUFVO1FBQ3REO01BQ0Y7SUFDRjtFQUFDO0FBQUE7QUFHSSxJQUFNRSxRQUFRLEdBQUcsSUFBSTVCLFFBQVEsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL2Fzc2V0cy9qcy9tb2R1bGVzL1BhcmFsbGF4LmpzP2IxNTYiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGFyYWxsYXgge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjcm9sbFwiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHdpbmRvdyBvYmplY3QgdG8gZGV0ZWN0XHJcbiAgICAgKiBhIHNjcm9sbCBldmVudFxyXG4gICAgICogICovXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIChlKSA9PiB7XHJcbiAgICAgIHRoaXMuYWRkUGFyYWxsYXhTY3JvbGxpbmcoZSk7XHJcbiAgICAgIFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkUGFyYWxsYXhTY3JvbGxpbmcoZSkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zY3JvbGxcIik7XHJcblxyXG4gICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgbGVuZ3RoID0gdGFyZ2V0Lmxlbmd0aDtcclxuICAgIGZvciAoaW5kZXg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBwb3MgPSB3aW5kb3cucGFnZVlPZmZzZXQgKiB0YXJnZXRbaW5kZXhdLmRhdGFzZXQucmF0ZTtcclxuXHJcbiAgICAgIGlmICh0YXJnZXRbaW5kZXhdLmRhdGFzZXQuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICB0YXJnZXRbaW5kZXhdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoMHB4LFwiICsgcG9zICsgXCJweCwgMHB4KVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBwb3NYID0gd2luZG93LnBhZ2VZT2Zmc2V0ICogdGFyZ2V0W2luZGV4XS5kYXRhc2V0LnJhdGV4O1xyXG4gICAgICAgIHZhciBwb3NZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICogdGFyZ2V0W2luZGV4XS5kYXRhc2V0LnJhdGV5O1xyXG5cclxuICAgICAgICB0YXJnZXRbaW5kZXhdLnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICBcInRyYW5zbGF0ZTNkKFwiICsgcG9zWCArIFwicHgsIFwiICsgcG9zWSArIFwicHgsIDBweClcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHBhcmFsbGF4ID0gbmV3IFBhcmFsbGF4KCk7XHJcbiJdLCJuYW1lcyI6WyJQYXJhbGxheCIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwic2Nyb2xsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJhZGRQYXJhbGxheFNjcm9sbGluZyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwidGFyZ2V0IiwicXVlcnlTZWxlY3RvckFsbCIsImluZGV4IiwibGVuZ3RoIiwicG9zIiwid2luZG93IiwicGFnZVlPZmZzZXQiLCJkYXRhc2V0IiwicmF0ZSIsImRpcmVjdGlvbiIsInN0eWxlIiwidHJhbnNmb3JtIiwicG9zWCIsInJhdGV4IiwicG9zWSIsInJhdGV5IiwicGFyYWxsYXgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./assets/js/modules/Parallax.js\n");

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
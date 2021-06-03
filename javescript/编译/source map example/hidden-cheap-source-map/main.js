/******/ "use strict";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src-ori/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "minSwapsCouples": () => (/* binding */ minSwapsCouples)
/* harmony export */ });
function minSwapsCouples(row) {
  const n = row.length;
  const tot = n / 2;
  console.log("----");
  //构建数
  const f = new Array(tot).fill(0).map((_, index) => index);
  for (let i = 0; i < n; i += 2) {
    const l = Math.floor(row[i] / 2);
    const r = Math.floor(row[i + 1] / 2);
    add(f, l, r);
  }

  //遍历获取一个圈子内
  //需要交换的情侣数量
  const map = new Map();
  for (let i = 0; i < tot; i++) {
    const fx = getf(f, i);
    if (map.has(fx)) {
      map.set(fx, map.get(fx) + 1);
    } else {
      map.set(fx, 1);
    }
  }

  let ret = 0;
  for (const [f, sz] of map.entries()) {
    ret += sz - 1;
  }

  return ret;

  function getf(f, x) {
    if (f[x] === x) {
      return x;
    }
    const newf = getf(f, f[x]);
    f[x] = newf;
    return newf;
  }

  function add(f, x, y) {
    const fx = getf(f, x);
    const fy = getf(f, y);
    f[fx] = fy;
  }
}

minSwapsCouples(10);

var __webpack_exports__minSwapsCouples = __webpack_exports__.minSwapsCouples;
export { __webpack_exports__minSwapsCouples as minSwapsCouples };

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cursor__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polygon__ = __webpack_require__(4);




const polygonPointsA = [[100, 100], [200, 100], [200, 200], [100, 200]];
const polygonPointsB = [[300, 400], [450, 300], [500, 300], [470, 350]];
const polygonPointsC = [[0, 20], [20, 0], [40, 10], [40, 30], [30, 40]];

const strokeColor = '#000';
const fillColor = '#f00';
const poly1 = new __WEBPACK_IMPORTED_MODULE_2__polygon__["a" /* default */](polygonPointsA, strokeColor, fillColor);
const poly2 = new __WEBPACK_IMPORTED_MODULE_2__polygon__["a" /* default */](polygonPointsB, strokeColor, fillColor);
const poly3 = new __WEBPACK_IMPORTED_MODULE_2__polygon__["a" /* default */](polygonPointsC, strokeColor, fillColor);

const setting = {
  width: window.innerWidth - window.innerWidth * 0.02,
  height: window.innerHeight - window.innerWidth * 0.02,
  padding: 30,
  polygonMargin: 20,
};

const canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */]('example', setting);

window.addEventListener('load', canvas.init());

const polygons = [poly1, poly2, poly3];
canvas.addArr(polygons);

canvas.element.addEventListener('mousedown', (e) => {
  __WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].cursorDownPos = [e.offsetX, e.offsetY];
  canvas.selectedObject = canvas.getSelectedObject(__WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].cursorDownPos);
});

canvas.element.addEventListener('mouseup', (e) => {
  __WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].cursorUpPos = [e.offsetX, e.offsetY];
  const offset = __WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].getOffset();

  if (canvas.selectedObject) {
    canvas.selectedObject.shift(offset);
    canvas.update();
  }
  canvas.selectedObject = null;
});



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);


class Canvas {
  constructor(id, setting, objects) {
    this.setting = setting;
    this.objects = objects || [];
    this.selectedObject = false;
    this.element = document.getElementById(id);
    this.ctx = this.element.getContext('2d');
    this.nextObjListPos = [this.setting.padding, this.setting.padding];
  }

  init() {
    this.element.width = this.setting.width;
    this.element.height = this.setting.height;
  }

  add(object) {
    this.objects.push(object);
    object.setFrame();

    const offset = [this.nextObjListPos[0] - object.frame[0][0], this.nextObjListPos[1] - object.frame[0][1]];

    object.shift(offset);
    object.setFrame();
    this.nextObjListPos[1] = object.frame[object.frame.length - 1][1] + this.setting.polygonMargin;
    this.update();
  }

  addArr(objectArr) {
    objectArr.forEach((object) => {
      this.add(object);
    });
  }

  draw(object, isFill) {
    this.ctx.fillStyle = object.fillColor;
    this.ctx.strokeStyle = object.strokeColor;

    this.ctx.beginPath();
    this.ctx.moveTo(object.points[0], object.points[1]);
    object.points.forEach((point, index) => {
      this.ctx.lineTo(point[0], point[1]);
    });
    this.ctx.closePath();
    this.ctx.stroke();

    if (isFill) this.ctx.fill();
  }

  erase() {
    this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
  }

  update() {
    this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

    this.findAllOverlappedObjects();
 
    this.objects.forEach((object) => {
      //console.log(object);
      if (object.isOverlap) {
        this.draw(object, true);
      } else {
        this.draw(object);
      }
    });
  }

  getSelectedObject(cursorPos) {
    let selectedObject;
    this.objects.forEach((object) => {
      const isInside = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(cursorPos, object.points);
      if (isInside) selectedObject = object;
    });
    return selectedObject;
  }

  checkOverlap(polyA, polyB) {
    polyA = JSON.parse(JSON.stringify(polyA));
    polyB = JSON.parse(JSON.stringify(polyB));

    polyA.points.push(polyA.points[0]);
    polyB.points.push(polyB.points[0]);

    for (let i = 0; i < polyA.points.length - 1; i++) {
      const sideA = [polyA.points[i], polyA.points[i + 1]];

      for (let j = 0; j < polyB.points.length - 1; j++) {
        const sideB = [polyB.points[j], polyB.points[j + 1]];

        const isIntersect = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getIntersection(sideA, sideB);
        if (isIntersect) return true;
      }
    }
    return false;
  }

  findAllOverlappedObjects() {
    const overlapObjectIndeces = [];
    for (let i = 0; i < this.objects.length; i++) {
      const objectA = this.objects[i];

      for (let j = i + 1; j < this.objects.length; j++) {
        const objectB = this.objects[j];

        if (this.checkOverlap(objectA, objectB)) {
          overlapObjectIndeces.push(i);
          overlapObjectIndeces.push(j);
        }
      }
    }

    for(let i = 0; i < this.objects.length; i++) {
      this.objects[i].isOverlap = overlapObjectIndeces.indexOf(i) >= 0 ? true : false; 
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);


const cursor = {
  cursorDownPos: [0, 0],
  cursorUpPos: [0, 0],

  getOffset() {
    return [this.cursorUpPos[0] - this.cursorDownPos[0],
      this.cursorUpPos[1] - this.cursorDownPos[1]];

  },
  isCursorInPoly: __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly,

};

/* harmony default export */ __webpack_exports__["a"] = (cursor);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  isPointInPoly(point, poly) {
    let x = point[0],
      y = point[1];

    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      let xi = poly[i][0],
        yi = poly[i][1];
      let xj = poly[j][0],
        yj = poly[j][1];

      const intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  },

  getIntersection(segmentA, segmentB) {
    let x1 = segmentA[0][0],
      y1 = segmentA[0][1],
      x2 = segmentA[1][0],
      y2 = segmentA[1][1],

      x3 = segmentB[0][0],
      y3 = segmentB[0][1],
      x4 = segmentB[1][0],
      y4 = segmentB[1][1];

    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
                ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
                ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

    const isInside = this.isPointInPoly([x, y], [[x1, y1], [x3, y3], [x2, y2], [x4, y4]]);

    return isInside;
  },
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Polygon {
  constructor(points, strokeColor, fillColor) {
    this.points = points;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.isOverlap = false;
  }

  shift(offset) {
    this.points.forEach((point) => {
      point[0] += offset[0];
      point[1] += offset[1];
    });
  }
  
  setFrame() {
    const minX = this.points.reduce((min, item) => (item[0] < min ? item[0] : min), this.points[0][0]);

    const maxX = this.points.reduce((min, item) => (item[0] > min ? item[0] : min), this.points[0][0]);

    const minY = this.points.reduce((min, item) => (item[1] < min ? item[1] : min), this.points[0][1]);

    const maxY = this.points.reduce((min, item) => (item[1] > min ? item[1] : min), this.points[0][1]);

    this.frame = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Polygon);



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
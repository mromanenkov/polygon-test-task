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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  isPointInPoly(point, poly) {
    const x = point[0];
    const y = point[1];

    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0];
      const yi = poly[i][1];
      const xj = poly[j][0];
      const yj = poly[j][1];

      const intersect = ((yi > y) !== (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  },

  getIntersection(segmentA, segmentB) {
    const vectorA = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](segmentA[0], segmentA[1]);
    const vectorB = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](segmentB[0], segmentB[1]);

    const x = ((vectorA.x1 * vectorA.y2 - vectorA.y1 * vectorA.x2) *
              (vectorB.x1 - vectorB.x2) - (vectorA.x1 - vectorA.x2) *
              (vectorB.x1 * vectorB.y2 - vectorB.y1 * vectorB.x2)) /
              ((vectorA.x1 - vectorA.x2) * (vectorB.y1 - vectorB.y2) -
              (vectorA.y1 - vectorA.y2) * (vectorB.x1 - vectorB.x2));
    const y = ((vectorA.x1 * vectorA.y2 - vectorA.y1 * vectorA.x2) *
              (vectorB.y1 - vectorB.y2) - (vectorA.y1 - vectorA.y2) *
              (vectorB.x1 * vectorB.y2 - vectorB.y1 * vectorB.x2)) /
              ((vectorA.x1 - vectorA.x2) * (vectorB.y1 - vectorB.y2) -
              (vectorA.y1 - vectorA.y2) * (vectorB.x1 - vectorB.x2));

    const isInside = this.isPointInPoly([x, y], [[vectorA.x1, vectorA.y1],
      [vectorB.x1, vectorB.y1], [vectorA.x2, vectorA.y2], [vectorB.x2, vectorB.y2]]);

    return isInside;
  },
});


/***/ }),
/* 1 */
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

  setBoundingBox() {
    const minX = this.points.reduce((min, item) =>
      (item[0] < min ? item[0] : min), this.points[0][0]);
    const maxX = this.points.reduce((min, item) =>
      (item[0] > min ? item[0] : min), this.points[0][0]);
    const minY = this.points.reduce((min, item) =>
      (item[1] < min ? item[1] : min), this.points[0][1]);
    const maxY = this.points.reduce((min, item) =>
      (item[1] > min ? item[1] : min), this.points[0][1]);
    this.boundingBox = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Polygon);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cursor__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polygon__ = __webpack_require__(1);




const polygonPointsA = [[100, 100], [200, 100], [200, 200], [100, 200]];
const polygonPointsB = [[300, 400], [450, 300], [470, 370]];
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polygon__ = __webpack_require__(1);



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
    object.setBoundingBox();

    const offset = [this.nextObjListPos[0] - object.boundingBox[0][0],
      this.nextObjListPos[1] - object.boundingBox[0][1]];

    object.shift(offset);
    object.setBoundingBox();
    this.nextObjListPos[1] = object.boundingBox[object.boundingBox.length - 1][1] +
      this.setting.polygonMargin;
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

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(object.points[0], object.points[1]);
    object.points.forEach((point) => {
      this.ctx.lineTo(point[0], point[1]);
    });
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();

    if (isFill) this.ctx.fill();
  }

  erase() {
    this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
  }

  update() {
    this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

    this.findAllIntersectObjects();
    this.checkVertexInPolyAll();

    this.objects.forEach((object) => {
      object.isOverlap ? this.draw(object, true) : this.draw(object);
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


  checkVertexInPoly(polyA, polyB) {
    let isInPoly = false;

    polyA.points.forEach((point) => {
      isInPoly = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(point, polyB.points);
      if (isInPoly) {
        isInPoly = true;
        return false;
      }
    });
    polyB.points.forEach((point) => {
      isInPoly = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(point, polyA.points);
      if (isInPoly) {
        isInPoly = true;
        return false;
      }
    });

    return isInPoly;
  }

  checkVertexInPolyAll() {
    for (let i = 0; i < this.objects.length; i++) {
      const objectA = this.objects[i];

      for (let j = 0; j < this.objects.length; j++) {
        if (i == j) continue;
        const objectB = this.objects[j];
        const isInPoly = this.checkVertexInPoly(objectA, objectB);

        if (isInPoly) {
          objectA.isOverlap = true;
          objectB.isOverlap = true;
        }
      }
    }
  }

  checkSideIntersection(polyA, polyB) {
    const pointsAcopy = JSON.parse(JSON.stringify(polyA.points));
    const pointsBcopy = JSON.parse(JSON.stringify(polyB.points));

    const polyAcopy = new __WEBPACK_IMPORTED_MODULE_1__polygon__["a" /* default */](pointsAcopy);
    const polyBcopy = new __WEBPACK_IMPORTED_MODULE_1__polygon__["a" /* default */](pointsBcopy);

    polyAcopy.points.push(polyAcopy.points[0]);
    polyBcopy.points.push(polyBcopy.points[0]);

    let isIntersect = false;
    for (let i = 0; i < polyAcopy.points.length - 1; i++) {
      const sideA = [polyAcopy.points[i], polyAcopy.points[i + 1]];

      for (let j = 0; j < polyBcopy.points.length - 1; j++) {
        const sideB = [polyBcopy.points[j], polyBcopy.points[j + 1]];

        isIntersect = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getIntersection(sideA, sideB);
        if (isIntersect) return true;
      }
    }
    return isIntersect;
  }

  findOverlappedObject(polyA, polyB) {
    let isOverlap = false;
    if (this.checkSideIntersection(polyA, polyB) || this.checkVertexInPoly(polyA, polyB)) {
      isOverlap = true;
    }
    return isOverlap;
  }


  findAllIntersectObjects() {
    const overlapObjectIndeces = [];
    for (let i = 0; i < this.objects.length; i++) {
      const objectA = this.objects[i];

      for (let j = i + 1; j < this.objects.length; j++) {
        const objectB = this.objects[j];

        if (this.checkSideIntersection(objectA, objectB)) {
          overlapObjectIndeces.push(i);
          overlapObjectIndeces.push(j);
        }
      }
    }
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].isOverlap = overlapObjectIndeces.indexOf(i) >= 0;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector {
  constructor(pointA, pointB) {
    this.x1 = pointA[0];
    this.y1 = pointA[1];

    this.x2 = pointB[0];
    this.y2 = pointB[1];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Vector);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
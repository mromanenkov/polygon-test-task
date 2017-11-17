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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
    isPointInPoly: function(point, poly) {
        let x = point[0], y = point[1];
        
            let inside = false;
            for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                let xi = poly[i][0], yi = poly[i][1];
                let xj = poly[j][0], yj = poly[j][1];
        
                let intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        
        return inside;
    },

    getIntersection: function(segmentA, segmentB) {
        let x1 = segmentA[0][0],
            y1 = segmentA[0][1],
            x2 = segmentA[1][0],
            y2 = segmentA[1][1],
    
            x3 = segmentB[0][0],
            y3 = segmentB[0][1],
            x4 = segmentB[1][0],
            y4 = segmentB[1][1]
    
        var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) /
                ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
        var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) /
                ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
        
        let isInside = this.isPointInPoly([x,y], [[x1,y1],[x3,y3],[x2,y2],[x4,y4]]);
    
        if(isInside){
            return true;
        }else{
            return false;
        }
    }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cursor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polygon__ = __webpack_require__(4);




let polygonPointsA = [[100,100], [200,100], [200,200], [100,200]];
let polygonPointsB = [[300,400], [450,300], [500,300], [470,350]];

let strokeColor = '#000';
let fillColor = '#f00';
let poly1 = new __WEBPACK_IMPORTED_MODULE_2__polygon__["a" /* default */](polygonPointsA, strokeColor, fillColor);
let poly2 = new __WEBPACK_IMPORTED_MODULE_2__polygon__["a" /* default */](polygonPointsB, strokeColor, fillColor);


let setting = {
    width: window.innerWidth - window.innerWidth * 0.02,
    height: window.innerHeight - window.innerWidth * 0.02,
    padding: 30,
    polygonMargin: 20
}

let canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */]('example', setting);

window.addEventListener('load', canvas.init());

canvas.add(poly1);
canvas.add(poly2);
canvas.update();

canvas.element.addEventListener('mousedown', (e)=>{
    __WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].cursorDownPos = [e.offsetX, e.offsetY];

    canvas.selectedObject = canvas.getSelectedObject(__WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].cursorDownPos);    
});

canvas.element.addEventListener('mouseup', (e)=>{
    __WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].cursorUpPos = [e.offsetX, e.offsetY];
    let offset = __WEBPACK_IMPORTED_MODULE_1__cursor__["a" /* default */].getOffset();

    if(canvas.selectedObject) {
        canvas.selectedObject.shift(offset);
        canvas.update();
    }
    canvas.selectedObject = false;
});






/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


function Canvas(id, setting, objects) {
    this.setting = setting;
    this.objects = objects || [];
    this.selectedObject = false;
    this.element = document.getElementById(id);
    this.ctx = this.element.getContext('2d');
    this.nextObjListPos = [this.setting.padding, this.setting.padding];
}

Canvas.prototype = {
    init: function(objects) {
        this.element.width = this.setting.width;
        this.element.height = this.setting.height;
    },

    add: function(object) {
        this.objects.push(object);
        object.setFrame();

        let offset = [this.nextObjListPos[0] - object.frame[0][0], this.nextObjListPos[1] -  object.frame[0][1]];
        
        object.shift(offset);
        object.setFrame();
        this.nextObjListPos[1] = object.frame[object.frame.length-1][1] + this.setting.polygonMargin;
    },

    draw: function(object, isFill) {
        this.ctx.fillStyle = object.fillColor;
        this.ctx.strokeStyle = object.strokeColor;

        this.ctx.beginPath();
        this.ctx.moveTo(object.points[0], object.points[1]);
        object.points.forEach((point, index) => {
            this.ctx.lineTo(point[0], point[1]);
        });
        this.ctx.closePath();
        this.ctx.stroke();

        if(isFill) this.ctx.fill();
    },

    erase: function() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
    },

    update: function() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

        this.findAllOverlappedObjects();

        this.objects.forEach((object)=>{
            if(object.isOverlap) {
                this.draw(object, true);
            }else{
                this.draw(object);
            }
        });
    },

    getSelectedObject: function(cursorPos) {
        let selectedObject;
        this.objects.forEach((object)=>{
            let isInside = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(cursorPos, object.points);
            if(isInside) selectedObject = object;
        });
        return selectedObject;
    },

    checkOverlap: function(polyA, polyB){
        
        polyA = JSON.parse(JSON.stringify(polyA));
        polyB = JSON.parse(JSON.stringify(polyB));
    
        polyA.points.push(polyA.points[0]);
        polyB.points.push(polyB.points[0]);
    
        for(let i = 0; i < polyA.points.length-1; i++){
            
            let sideA = [polyA.points[i], polyA.points[i+1]];
            
            for(let j = 0; j < polyB.points.length-1; j++){
                let sideB = [polyB.points[j], polyB.points[j+1]];
    
                let isIntersect = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getIntersection(sideA, sideB);
                if(isIntersect) return true
            }
        }
        return false;
    },

    findAllOverlappedObjects: function() {
        let isOverLapping;

        for(let i=0; i<this.objects.length; i++){
            let objectA = this.objects[i];

            for(let j=i+1; j<this.objects.length; j++){
                let objectB = this.objects[j];
                
                if(this.checkOverlap(objectA, objectB)){
                    objectA.isOverlap = true;
                    objectB.isOverlap = true;
                    isOverLapping = true;
                }else{
                    objectA.isOverlap = false;
                    objectB.isOverlap = false;
                }
            }
        }
        if(isOverLapping) {
            return true;
        }else{
            
            return false;
        }
    }
    
}

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);


const cursor = {
    cursorDownPos: [0,0],
    cursorUpPos: [0,0],
    
    getOffset: function() {
        return [this.cursorUpPos[0] - this.cursorDownPos[0], this.cursorUpPos[1] - this.cursorDownPos[1]];
    },
  
    isCursorInPoly: __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* default */].isPointInPoly

}

/* harmony default export */ __webpack_exports__["a"] = (cursor);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Polygon(points, strokeColor, fillColor) {
    this.points = points;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.isOverlap = false;
    this.frame;
}

Polygon.prototype = {
    shift: function(offset) {
        this.points.forEach((point)=>{
            point[0] += offset[0];
            point[1] += offset[1];
        });
    },
    setFrame: function() {
        let minX = this.points.reduce((min, item)=>{
            return item[0] < min ? item[0]: min;
        }, this.points[0][0]);
        
        let maxX = this.points.reduce((min, item)=>{
            return item[0] > min ? item[0]: min;
        }, this.points[0][0]);
        
        let minY = this.points.reduce((min, item)=>{
            return item[0] < min ? item[0]: min;
        }, this.points[0][1]);
        
        let maxY = this.points.reduce((min, item)=>{
            return item[0] > min ? item[0]: min;
        }, this.points[0][1]);

        this.frame = [[minX, minY],[maxX, minY],[maxX, maxY], [minX, maxY]];
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Polygon);




/***/ })
/******/ ]);
import utils from './utils';
import Polygon from './polygon';

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
      const isInside = utils.isPointInPoly(cursorPos, object.points);
      if (isInside) selectedObject = object;
    });
    return selectedObject;
  }


  checkVertexInPoly(polyA, polyB) {
    let isInPoly = false;

    polyA.points.forEach((point) => {
      isInPoly = utils.isPointInPoly(point, polyB.points);
      if (isInPoly) {
        isInPoly = true;
        return false;
      }
    });
    polyB.points.forEach((point) => {
      isInPoly = utils.isPointInPoly(point, polyA.points);
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

    const polyAcopy = new Polygon(pointsAcopy);
    const polyBcopy = new Polygon(pointsBcopy);

    polyAcopy.points.push(polyAcopy.points[0]);
    polyBcopy.points.push(polyBcopy.points[0]);

    let isIntersect = false;
    for (let i = 0; i < polyAcopy.points.length - 1; i++) {
      const sideA = [polyAcopy.points[i], polyAcopy.points[i + 1]];

      for (let j = 0; j < polyBcopy.points.length - 1; j++) {
        const sideB = [polyBcopy.points[j], polyBcopy.points[j + 1]];

        isIntersect = utils.getIntersection(sideA, sideB);
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

export default Canvas;

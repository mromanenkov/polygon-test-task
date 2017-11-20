import Canvas from './canvas';
import cursor from './cursor';
import Polygon from './polygon';

const polygonPointsA = [[100, 100], [200, 100], [200, 200], [100, 200]];
const polygonPointsB = [[300, 400], [450, 300], [470, 370]];
const polygonPointsC = [[0, 20], [20, 0], [40, 10], [40, 30], [30, 40]];

const strokeColor = '#000';
const fillColor = '#f00';
const poly1 = new Polygon(polygonPointsA, strokeColor, fillColor);
const poly2 = new Polygon(polygonPointsB, strokeColor, fillColor);
const poly3 = new Polygon(polygonPointsC, strokeColor, fillColor);

const setting = {
  width: window.innerWidth - window.innerWidth * 0.02,
  height: window.innerHeight - window.innerWidth * 0.02,
  padding: 30,
  polygonMargin: 20,
};

const canvas = new Canvas('example', setting);

window.addEventListener('load', canvas.init());

const polygons = [poly1, poly2, poly3];
canvas.addArr(polygons);

canvas.element.addEventListener('mousedown', (e) => {
  cursor.cursorDownPos = [e.offsetX, e.offsetY];
  canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);
});

canvas.element.addEventListener('mouseup', (e) => {
  cursor.cursorUpPos = [e.offsetX, e.offsetY];
  const offset = cursor.getOffset();

  if (canvas.selectedObject) {
    canvas.selectedObject.shift(offset);
    canvas.update();
  }
  canvas.selectedObject = null;
});

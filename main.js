import Canvas from './canvas';
import cursor from './cursor';
import Polygon from './polygon';

let polygonPointsA = [[100,100], [200,100], [200,200], [100,200]];
let polygonPointsB = [[300,400], [450,300], [500,300], [470,350]];
let polygonPointsC = [[0,20], [20,0], [40,10], [40,30], [30,40]];

let strokeColor = '#000';
let fillColor = '#f00';
let poly1 = new Polygon(polygonPointsA, strokeColor, fillColor);
let poly2 = new Polygon(polygonPointsB, strokeColor, fillColor);
let poly3 = new Polygon(polygonPointsC, strokeColor, fillColor);

let setting = {
    width: window.innerWidth - window.innerWidth * 0.02,
    height: window.innerHeight - window.innerWidth * 0.02,
    padding: 30,
    polygonMargin: 20
}

let canvas = new Canvas('example', setting);

window.addEventListener('load', canvas.init());

let polygons = [poly1, poly2, poly3];
canvas.addArr(polygons);

canvas.element.addEventListener('mousedown', (e)=>{
    cursor.cursorDownPos = [e.offsetX, e.offsetY];
    canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);    
});

canvas.element.addEventListener('mouseup', (e)=>{
    cursor.cursorUpPos = [e.offsetX, e.offsetY];
    let offset = cursor.getOffset();

    if(canvas.selectedObject) {
        canvas.selectedObject.shift(offset);
        canvas.update();
    }
    canvas.selectedObject = null;
});





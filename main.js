'use strict'
let polygonPointsA = [[100,100], [200,100], [200,200], [100,200]];
let polygonPointsB = [[300,400], [450,300], [500,300], [470,350]];

let strokeColor = '#000';
let fillColor = '#f00';
let poly1 = new Polygon(polygonPointsA, strokeColor, fillColor);
let poly2 = new Polygon(polygonPointsB, strokeColor, fillColor);


let setting = {
    width: window.innerWidth - window.innerWidth * 0.02,
    height: window.innerHeight - window.innerWidth * 0.02,
    padding: 30,
    polygonMargin: 20
}

let canvas = new Canvas('example', setting);

window.addEventListener('load', canvas.init());

canvas.add(poly1);
canvas.add(poly2);
canvas.update();

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
    canvas.selectedObject = false;
});





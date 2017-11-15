'use strict'

let polygonPointsA = [[100,100], [200,100], [200,200], [100,200]];
let color = '#eee';
let poly1 = new Polygon(polygonPointsA, color);

let setting = {
    width: window.innerWidth,
    height: window.innerHeight
}
let canvas = new Canvas('example', setting);
window.onload = canvas.init();

canvas.add(poly1);
canvas.update(poly1);

canvas.element.addEventListener('mousedown', (e)=>{
    cursor.cursorDownPos = [e.offsetX, e.offsetY];

    canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);
    //console.log(canvas.selectedObject);
    
});

canvas.element.addEventListener('mouseup', (e)=>{
    cursor.cursorUpPos = [e.offsetX, e.offsetY];
    let offset = cursor.getOffset();

    if(canvas.selectedObject) {
        poly1.shift(offset);
        canvas.update();
    }
    canvas.selectedObject = false;
});





'use strict'

/*
//let polygonPointsA = [[0,0], [100,50], [50,100], [0,90]];
let polygonPointsA = [[100,100], [200,100], [200,200], [100,200]];
let polygonPointsB = [[0,0], [100,0], [100,100], [0,0]];
let color = '#fff';
*/

function Polygon(points, strokeColor, fillColor) {
    this.points = points;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.isOverlap = false;
}

Polygon.prototype = {
    shift: function(offset) {
        this.points.forEach((point)=>{
            point[0] += offset[0];
            point[1] += offset[1];
        });
    }
}



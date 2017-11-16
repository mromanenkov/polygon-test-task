'use strict'

function isPointInPoly(point, vs) {
    let x = point[0], y = point[1];
    
        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1];
            let xj = vs[j][0], yj = vs[j][1];
    
            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
    
    return inside;
}

function getIntersection(segmentA, segmentB) {

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
    
    let isInside = isPointInPoly([x,y], [[x1,y1],[x3,y3],[x2,y2],[x4,y4]]);

    if(isInside){
        return true;
    }else{
        return false;
    }
}

function checkOverlap(polyA, polyB){

    polyA = JSON.parse(JSON.stringify(polyA));
    polyB = JSON.parse(JSON.stringify(polyB));

    polyA.points.push(polyA.points[0]);
    polyB.points.push(polyB.points[0]);

    for(let i = 0; i < polyA.points.length-1; i++){
        
        let sideA = [polyA.points[i], polyA.points[i+1]];
     
        for(let j = 0; j < polyB.points.length-1; j++){
            let sideB = [polyB.points[j], polyB.points[j+1]];

            let isIntersect = getIntersection(sideA, sideB);
            if(isIntersect) return true
        }
    }
    return false;
}
const cursor = {
    cursorDownPos: [0,0],
    cursorUpPos: [0,0],
    
    getOffset: function() {
        return [this.cursorUpPos[0] - this.cursorDownPos[0], this.cursorUpPos[1] - this.cursorDownPos[1]];
    },
    
    isCursorInPoly: function(cursorDownPos, vs) {
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
} 
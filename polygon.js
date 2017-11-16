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



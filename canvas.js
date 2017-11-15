'use strict'

function Canvas(id, setting, objects) {
    this.setting = setting;
    this.objects = objects || [];
    this.selectedObject = false;
    this.element = document.getElementById(id);
    this.ctx = this.element.getContext('2d');
}

Canvas.prototype = {
    init: function() {
        this.element.width = this.setting.width;
        this.element.height = this.setting.height;
    },

    add: function(object) {
        this.objects.push(object);
    },

    draw: function(object) {
        this.ctx.fillStyle = object.color;
   
        this.ctx.beginPath();
        this.ctx.moveTo(object.points[0], object.points[1]);
        object.points.forEach((point, index) => {
            this.ctx.lineTo(point[0], point[1]);
        });
        this.ctx.closePath();
        this.ctx.stroke();
    },

    erase: function() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
    },

    update: function() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

        this.objects.forEach((object)=>{
            this.draw(object);
        });

        //console.log(this.objects);
    },

    getSelectedObject: function(cursorPos) {
        let selectedObject;
        this.objects.forEach((object)=>{
            let isInside = isCursorInPoly(cursorPos, object.points);
            if(isInside) selectedObject = object;
        });
        return selectedObject;
    }
    
}
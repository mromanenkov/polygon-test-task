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

    draw: function(object, isFill) {
        this.ctx.fillStyle = object.fillColor;
        this.ctx.strokeStyle = object.strokeColor;

        this.ctx.beginPath();
        this.ctx.moveTo(object.points[0], object.points[1]);
        object.points.forEach((point, index) => {
            this.ctx.lineTo(point[0], point[1]);
        });
        this.ctx.closePath();
        this.ctx.stroke();

        if(isFill) this.ctx.fill();
    },

    erase: function() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
    },

    update: function() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

        this.findOverlappedObjects();

        this.objects.forEach((object)=>{
            if(object.isOverlap) {
                this.draw(object, true);
            }else{
                this.draw(object);
            }
        });
    },

    getSelectedObject: function(cursorPos) {
        let selectedObject;
        this.objects.forEach((object)=>{
            let isInside = isPointInPoly(cursorPos, object.points);
            if(isInside) selectedObject = object;
        });
        return selectedObject;
    },

    findOverlappedObjects: function() {
        let isOverLapping;

        for(let i=0; i<this.objects.length; i++){
            let objectA = this.objects[i];

            for(let j=i+1; j<this.objects.length; j++){
                let objectB = this.objects[j];
                
                if(checkOverlap(objectA, objectB)){
                    objectA.isOverlap = true;
                    objectB.isOverlap = true;
                    isOverLapping = true;
                }else{
                    objectA.isOverlap = false;
                    objectB.isOverlap = false;
                }
            }
        }
        if(isOverLapping) {
            return true;
        }else{
            
            return false;
        }
    }
    
}
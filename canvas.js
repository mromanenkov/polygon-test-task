import utils from './utils';

class Canvas {
    constructor(id, setting, objects) {
        this.setting = setting;
        this.objects = objects || [];
        this.selectedObject = false;
        this.element = document.getElementById(id);
        this.ctx = this.element.getContext('2d');
        this.nextObjListPos = [this.setting.padding, this.setting.padding];
    }

    init() {
        this.element.width = this.setting.width;
        this.element.height = this.setting.height;
    }

    add(object) {
        this.objects.push(object);
        object.setFrame();

        let offset = [this.nextObjListPos[0] - object.frame[0][0], this.nextObjListPos[1] -  object.frame[0][1]];

        object.shift(offset);
        object.setFrame();
        this.nextObjListPos[1] = object.frame[object.frame.length-1][1] + this.setting.polygonMargin;
        this.update();
    }

    addArr(objectArr) {
        objectArr.forEach((object)=>{
            this.add(object);
        });
    }

    draw(object, isFill) {
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
    }

    erase() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
    }

    update() {
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

        this.findAllOverlappedObjects();

        this.objects.forEach((object)=>{
            if(object.isOverlap) {
                this.draw(object, true);
            }else{
                this.draw(object);
            }
        });
    }

    getSelectedObject(cursorPos) {
        let selectedObject;
        this.objects.forEach((object)=>{
            let isInside = utils.isPointInPoly(cursorPos, object.points);
            if(isInside) selectedObject = object;
        });
        return selectedObject;
    }

    checkOverlap(polyA, polyB){

        polyA = JSON.parse(JSON.stringify(polyA));
        polyB = JSON.parse(JSON.stringify(polyB));

        polyA.points.push(polyA.points[0]);
        polyB.points.push(polyB.points[0]);

        for(let i = 0; i < polyA.points.length-1; i++){

            let sideA = [polyA.points[i], polyA.points[i+1]];

            for(let j = 0; j < polyB.points.length-1; j++){
                let sideB = [polyB.points[j], polyB.points[j+1]];

                let isIntersect = utils.getIntersection(sideA, sideB);
                if(isIntersect) return true
            }
        }
        return false;
    }

    findAllOverlappedObjects() {
        let isOverLapping;

        for(let i=0; i<this.objects.length; i++){
            let objectA = this.objects[i];

            for(let j=i+1; j<this.objects.length; j++){
                let objectB = this.objects[j];

                if(this.checkOverlap(objectA, objectB)){
                    objectA.isOverlap = true;
                    objectB.isOverlap = true;
                    isOverLapping = true;
                }else{
                    objectA.isOverlap = false;
                    objectB.isOverlap = false;
                }
            }
        }
        return isOverLapping;
    }

}

export default Canvas;
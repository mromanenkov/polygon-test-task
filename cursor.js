import utils from './utils';

const cursor = {
  cursorDownPos: [0, 0],
  cursorUpPos: [0, 0],

  getOffset() {
    return [this.cursorUpPos[0] - this.cursorDownPos[0],
      this.cursorUpPos[1] - this.cursorDownPos[1]];

  },
  isCursorInPoly: utils.isPointInPoly,

};

export default cursor;

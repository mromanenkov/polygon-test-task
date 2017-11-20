
export default {
  isPointInPoly(point, poly) {
    let x = point[0],
      y = point[1];

    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      let xi = poly[i][0],
        yi = poly[i][1];
      let xj = poly[j][0],
        yj = poly[j][1];

      const intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  },

  getIntersection(segmentA, segmentB) {
    let x1 = segmentA[0][0],
      y1 = segmentA[0][1],
      x2 = segmentA[1][0],
      y2 = segmentA[1][1],

      x3 = segmentB[0][0],
      y3 = segmentB[0][1],
      x4 = segmentB[1][0],
      y4 = segmentB[1][1];

    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
                ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
                ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

    const isInside = this.isPointInPoly([x, y], [[x1, y1], [x3, y3], [x2, y2], [x4, y4]]);

    return isInside;
  },
};

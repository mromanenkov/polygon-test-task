import Vector from './vector';

export default {
  isPointInPoly(point, poly) {
    const x = point[0];
    const y = point[1];

    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0];
      const yi = poly[i][1];
      const xj = poly[j][0];
      const yj = poly[j][1];

      const intersect = ((yi > y) !== (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  },

  getIntersection(segmentA, segmentB) {
    const vectorA = new Vector(segmentA[0], segmentA[1]);
    const vectorB = new Vector(segmentB[0], segmentB[1]);

    const x = ((vectorA.x1 * vectorA.y2 - vectorA.y1 * vectorA.x2) *
              (vectorB.x1 - vectorB.x2) - (vectorA.x1 - vectorA.x2) *
              (vectorB.x1 * vectorB.y2 - vectorB.y1 * vectorB.x2)) /
              ((vectorA.x1 - vectorA.x2) * (vectorB.y1 - vectorB.y2) -
              (vectorA.y1 - vectorA.y2) * (vectorB.x1 - vectorB.x2));
    const y = ((vectorA.x1 * vectorA.y2 - vectorA.y1 * vectorA.x2) *
              (vectorB.y1 - vectorB.y2) - (vectorA.y1 - vectorA.y2) *
              (vectorB.x1 * vectorB.y2 - vectorB.y1 * vectorB.x2)) /
              ((vectorA.x1 - vectorA.x2) * (vectorB.y1 - vectorB.y2) -
              (vectorA.y1 - vectorA.y2) * (vectorB.x1 - vectorB.x2));

    const isInside = this.isPointInPoly([x, y], [[vectorA.x1, vectorA.y1],
      [vectorB.x1, vectorB.y1], [vectorA.x2, vectorA.y2], [vectorB.x2, vectorB.y2]]);

    return isInside;
  },
};

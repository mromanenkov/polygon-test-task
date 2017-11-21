class Polygon {
  constructor(points, strokeColor, fillColor) {
    this.points = points;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.isOverlap = false;
  }

  shift(offset) {
    this.points.forEach((point) => {
      point[0] += offset[0];
      point[1] += offset[1];
    });
  }

  setBoundingBox() {
    const minX = this.points.reduce((min, item) =>
      (item[0] < min ? item[0] : min), this.points[0][0]);
    const maxX = this.points.reduce((min, item) =>
      (item[0] > min ? item[0] : min), this.points[0][0]);
    const minY = this.points.reduce((min, item) =>
      (item[1] < min ? item[1] : min), this.points[0][1]);
    const maxY = this.points.reduce((min, item) =>
      (item[1] > min ? item[1] : min), this.points[0][1]);
    this.boundingBox = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
  }
}

export default Polygon;


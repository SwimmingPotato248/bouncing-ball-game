export default class Paddle {
  constructor(x, width) {
    this.x = x;
    this.width = width;
  }

  moveLeft() {
    this.x = Math.max(this.x - 1.5, 0);
  }

  moveRight() {
    this.x = Math.min(this.x + 1.5, 500 - this.width);
  }

  set setWidth(val) {
    this.width = val;
  }
}

export default class Paddle {
  constructor(x, width) {
    this.x = x;
    this.width = width;
  }

  moveLeft() {
    this.x = Math.max(this.x - 1.5, this.width / 2);
  }

  moveRight() {
    this.x = Math.min(this.x + 1.5, 500 - this.width / 2);
  }

  set setWidth(val) {
    this.width = val;
  }
}

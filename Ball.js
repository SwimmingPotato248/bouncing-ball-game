export default class Ball {
  constructor(x, y, angle, speed) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
  }

  move() {
    this.x = this.x + Math.cos(this.angle) * this.speed;
    this.y = this.y - Math.sin(this.angle) * this.speed;
  }

  set setSpeed(val) {
    this.speed = val;
  }

  touchTop() {
    if (this.angle < Math.PI / 2) {
      this.angle = 2 * Math.PI - this.angle;
    } else {
      this.angle = this.angle + 2 * (Math.PI - this.angle);
    }
  }

  touchRight() {
    if (this.angle < Math.PI / 2) {
      this.angle = Math.PI - this.angle;
    } else {
      this.angle = Math.PI + (Math.PI * 2 - this.angle);
    }
  }

  touchLeft() {
    if (this.angle < Math.PI) {
      this.angle = Math.PI - this.angle;
    } else {
      this.angle = Math.PI * 2 - (this.angle - Math.PI);
    }
  }

  touchPaddle(direction) {
    if (this.angle < Math.PI * 1.5) {
      this.angle = this.angle + 2 * (Math.PI - this.angle);
    } else {
      this.angle = 2 * Math.PI - this.angle;
    }
    if (direction === "left") {
      this.angle = this.angle + Math.PI / 8;
    } else if (direction === "right") {
      this.angle = this.angle - Math.PI / 8;
    }
  }
}

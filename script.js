class Board {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Paddle {
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

class Ball {
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

  touchPaddle() {
    if (this.angle < Math.PI * 1.5) {
      this.angle = this.angle + 2 * (Math.PI - this.angle);
    } else {
      this.angle = 2 * Math.PI - this.angle;
    }
  }
}

function game() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const paddleWidth = 250;
  const ball = new Ball(300, 50, Math.random(Math.PI / 2), 2);
  const paddle = new Paddle(200, paddleWidth);

  const startTime = Date.now();
  let point = 0;
  function draw() {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.fillRect(paddle.x, canvas.height * 0.9, paddle.width, 20);
  }

  let moveLeft = false;
  let moveRight = false;

  document.addEventListener("keydown", (e) => {
    if (
      e.code === "ArrowRight" &&
      paddle.x + paddle.width <= canvas.width - 10
    ) {
      moveRight = true;
    }
    if (e.code === "ArrowLeft" && paddle.x >= 10) {
      moveLeft = true;
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") {
      moveRight = false;
    }
    if (e.code === "ArrowLeft") {
      moveLeft = false;
    }
  });

  const gameplay = setInterval(() => {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    ball.move();
    if (moveLeft) {
      paddle.moveLeft();
    }

    if (moveRight) {
      paddle.moveRight();
    }
    if (Math.floor(ball.y) < 10 && ball.angle < Math.PI) {
      ball.touchTop();
    }
    if (
      Math.floor(ball.x) < 10 &&
      ball.angle < Math.PI * 1.5 &&
      ball.angle > Math.PI * 0.5
    ) {
      ball.touchLeft();
    }
    if (
      Math.floor(ball.x) > canvas.width - 10 &&
      (ball.angle < Math.PI * 0.5 || ball.angle > Math.PI * 1.5)
    ) {
      ball.touchRight();
    }
    if (
      canvas.height * 0.9 - Math.floor(ball.y) < 10 &&
      canvas.height * 0.9 - Math.floor(ball.y) > -10 &&
      ball.angle > Math.PI &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      ball.touchPaddle();
    }

    point = Math.floor((Date.now() - startTime) / 100);
    const showPoint = document.getElementById("point");
    showPoint.innerHTML = point;
    const level = 1 + Math.floor(point / 200);
    const showLevel = document.getElementById("level");
    showLevel.innerHTML = level;
    paddle.setWidth = paddleWidth * 0.9 ** level;
    ball.setSpeed = 2 * 1.1 ** level;

    if (ball.y > 600) {
      clearInterval(gameplay);
    }
  }, 10);
}

const btn = document.getElementById("start");
btn.addEventListener("click", () => {
  const board = document.getElementById("game-board");
  board.classList.remove("hidden");
  game();
});

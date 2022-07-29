import { mouseDown, touchDown } from "./utils.js";

class BasicCone {
  constructor(
    startx,
    starty,
    width,
    height,
    ctx,
    canvasEndX,
    canvasWidth,
    canvas
  ) {
    this.x = startx;
    this.y = starty;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.canvasEndX = canvasEndX;
    this.canvasWidth = canvasWidth;
    this.canvas = canvas;
    this.dragging = false;
  }

  draw() {
    this.ctx.beginPath();
    if (this.canvasEndX) {
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.canvasEndX - this.width) {
        this.x = this.canvasEndX - this.width;
      }
    }
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.width, this.y);
    this.ctx.lineTo(this.x + this.width / 2, this.y + this.height);
    this.ctx.fillStyle = "#ffa387";
    this.ctx.fill();
  }
}

export class GameCone extends BasicCone {
  moveLeft() {
    this.x -= 5;
  }
  moveRight() {
    this.x += 5;
  }

  drag(event) {
    let mousePos;
    if (event.type === "mousedown") {
      mousePos = mouseDown(event, this.canvas);
    } else {
      mousePos = touchDown(event, this.canvas);
    }
    if (this.x <= mousePos[0] && mousePos[0] <= this.x + this.width) {
      this.dragging = true;
    }
  }

  dragMove(event) {
    let mousePos;
    if (event.type === "mousemove") {
      mousePos = mouseDown(event, this.canvas);
    } else {
      mousePos = touchDown(event, this.canvas);
    }
    this.x = mousePos[0] - this.width / 2;
  }
}

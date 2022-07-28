import { GameCone } from "./cone.js";
import { GameScoop } from "./scoop.js";

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.canvasId = "gameCanvas";
    this.ctx = ctx;
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvasHeight = this.canvas.offsetHeight;
    this.scoops = [];
    this.scoopSpeed = 3;
    this.caughtScoops = 0;
    this.score = document.getElementById("score");
    this.caughtScoopsGroup = [];
    this.pause = 2500;
    this.addCone();
  }

  addCone() {
    const coneHeight = this.canvasHeight / 8;
    const coneWidth = coneHeight / 2;
    this.cone = new GameCone(
      this.canvasWidth / 2 - coneWidth / 2,
      this.canvasHeight - this.canvasHeight / 5,
      coneWidth,
      coneHeight,
      this.ctx,
      this.canvasWidth,
      this.canvasWidth,
      this.canvas
    );
    this.scoopStopY = this.cone.y;
  }

  addScoop() {
    if (this.scoopSpeed < 10) {
      this.scoopSpeed += 0.25;
    }

    this.scoop = new GameScoop(
      this.canvasWidth,
      this.canvasHeight / 8 / 4,
      this.ctx,
      this.scoopSpeed
    );
    this.scoop.draw();
    this.scoops.push(this.scoop);
  }

  addScoops() {
    this.addScoop();
    if (this.pause > 250) {
      this.pause -= 10;
    }
    setTimeout(this.addScoops.bind(this), this.pause);
  }

  moveLeftButton() {
    this.cone.moveLeft();
    this.moveLeft = window.requestAnimationFrame(
      this.moveLeftButton.bind(this)
    );
  }

  moveRightButton() {
    this.cone.moveRight();
    this.moveRight = window.requestAnimationFrame(
      this.moveRightButton.bind(this)
    );
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let i = 0; i < this.scoops.length; i++) {
      if (!this.scoops[i].caught) {
        this.scoops[i].drop();
        if (this.scoops[i].y + 10 > this.scoopStopY)
          if (
            this.scoops[i].x > this.cone.x &&
            this.scoops[i].x < this.cone.x + this.cone.width
          ) {
            this.cone.y += this.scoops[i].radius;
            this.scoops[i].y += this.scoops[i].radius;
            this.scoops[i].caught = true;
            this.caughtScoopsGroup.push(this.scoops[i]);
            this.caughtScoops += 1;
            this.score.innerText = this.caughtScoops;
          } else {
            localStorage.setItem("score", String(this.caughtScoops));
            window.location.href = "gameOver.html";
          }
      }
      this.scoops[i].draw();
    }
    for (let i = 0; i < this.caughtScoopsGroup.length; i++) {
      this.caughtScoopsGroup[i].y = this.cone.y - i * this.scoops[i].radius;
      this.caughtScoopsGroup[i].x =
        this.cone.x + this.caughtScoopsGroup[i].radius;
    }
    this.cone.draw();
    window.requestAnimationFrame(this.update.bind(this));
  }
}

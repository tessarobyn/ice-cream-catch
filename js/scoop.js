import { randInt } from "./utils.js";
import { flavoursObj } from "./flavours.js";

class BasicScoop {
  constructor(flavour, num, ctx, x, radius) {
    this.flavour = flavour;
    this.num = num;
    this.ctx = ctx;
    this.x = x;
    this.y = radius + 1.25 * radius * num;
    this.radius = radius;
    this.caught = false;
  }
  draw() {
    const scoop = new Path2D();
    scoop.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.flavour;
    this.ctx.fill(scoop);
  }
}

export class GameScoop extends BasicScoop {
  constructor(canvasWidth, radius, ctx, speed) {
    super();
    const Flavours = flavoursObj();
    const flavours = Object.values(Flavours);
    const index = randInt(0, flavours.length - 1);
    this.flavour = flavours[index];
    this.x = randInt(0 + radius, canvasWidth - radius);
    this.y = -radius;
    this.radius = radius;
    this.ctx = ctx;
    this.speed = speed;
  }
  drop() {
    this.y += this.speed;
  }
}

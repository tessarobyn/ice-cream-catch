/* Need to move to colors.js file */
function flavoursObj() {
  return {
    mint: "#19fa86",
    chocolate: "#4a3514",
    strawberry: "#ff4586",
    vanilla: "#faf1cf",
    bubblegum: "#129cff",
    lemon: "#fff64a",
    raspberry: "#fc1e47",
  };
}

function setCanvasSize() {
  const gameContainer = document.getElementsByClassName("gameContainer")[0];
  const width = gameContainer.offsetWidth;
  const height = gameContainer.offsetHeight;
  const gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.width = width - 10;
  gameCanvas.height = height - 10;
}

class BasicFlake {
  constructor(num, ctx) {
    this.num = num;
    this.ctx = ctx;
    this.flavours = flavoursObj();
    this.color = this.flavours.chocolate;
  }
  draw() {}
}

class BasicScoop {
  constructor(flavour, num, ctx, x, radius) {
    this.flavour = flavour;
    this.num = num;
    this.ctx = ctx;
    this.x = x;
    this.y = radius + 1.25 * radius * num;
    this.radius = radius;
  }
  draw() {
    const scoop = new Path2D();
    scoop.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.flavour;
    this.ctx.fill(scoop);
  }
}

class GameScoop extends BasicScoop {
  constructor() {}
}

class BasicCone {
  constructor(startx, starty, width, height, ctx, canvasId, canvasEndX) {
    this.x = startx;
    this.y = starty;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.canvasEndX = canvasEndX;
  }

  draw() {
    this.ctx.beginPath();
    if (this.canvasEndX) {
      if (this.x < 0) {
        this.x = 0;
      }
    }
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.width, this.y);
    this.ctx.lineTo(this.x + this.width / 2, this.y + this.height);
    const img = new Image();
    img.src = "img/ConeSmall.PNG";
    const id = this.canvasId;
    img.onload = function () {
      const canvas = document.getElementById(id);
      const ctx = canvas.getContext("2d");
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fill();
    };
  }
}

class GameCone extends BasicCone {
  moveLeft() {
    this.x = this.x - 5;
  }
  moveRight() {
    this.x = this.x + 5;
  }
}

function drawTarget() {
  const targetCanvas = document.getElementById("targetIceCream");
  if (targetCanvas.getContext) {
    const ctx = targetCanvas.getContext("2d");

    const width = targetCanvas.width;
    const height = targetCanvas.height;
    console.log(width, height);

    // Ice cream
    const flavours = flavoursObj();
    const radius = height / 25;
    const scoops = [];
    const scoop2 = new BasicScoop(flavours.mint, 2, ctx, width / 2, radius);
    scoop2.draw();
    scoops.push(scoop2);
    const scoop = new BasicScoop(flavours.vanilla, 1, ctx, width / 2, radius);
    scoop.draw();
    scoops.push(scoop);

    // Cone
    const cone = new BasicCone(
      width / 2 - radius,
      radius + 1.25 * radius * scoops.length + radius / 2,
      radius * 2,
      radius * 2 * 2,
      ctx,
      "targetIceCream"
    );
    cone.draw();
  }
}

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.canvasId = "gameCanvas";
    this.ctx = ctx;
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvasHeight = this.canvas.offsetHeight;
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
      this.canvasId,
      this.canvasWidth
    );
    this.cone.draw("gameCanvas");
    setInterval(this.update.bind(this));
  }

  checkKey(event) {
    if (event.code === "ArrowLeft") {
      this.cone.moveLeft();
    } else if (event.code === "ArrowRight") {
      this.cone.moveRight();
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.cone.draw();
  }
}

setCanvasSize();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const game = new Game(canvas, ctx);
drawTarget();

window.addEventListener("keydown", (event) => {
  game.checkKey(event);
});

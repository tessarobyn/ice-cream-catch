/* Need to move to colors.js file */
function flavoursObj() {
  return {
    mint: "#00de3b",
    chocolate: "#4a1e01",
    strawberry: "#ff4586",
    vanilla: "#faf1cf",
    bubblegum: "#129cff",
    lemon: "#fff64a",
    raspberry: "#fc1e47",
  };
}

/* Move to utils file */
function getOffset(canvas) {
  const rect = canvas.getBoundingClientRect();
  return [rect.left + window.scrollX, rect.top + window.scrollY];
}

function mouseDown(event, canvas) {
  const pos = getOffset(canvas);
  const mouseX = event.clientX - pos[0];
  const mouseY = event.clientY - pos[1];
  return [mouseX, mouseY];
}

function randInt(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}

function setCanvasSize() {
  const gameContainer = document.getElementsByClassName("gameContainer")[0];
  const width = gameContainer.offsetWidth;
  const height = gameContainer.offsetHeight;
  const gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.width = width - 10;
  gameCanvas.height = height;
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
    this.caught = false;
  }
  draw() {
    const scoop = new Path2D();
    scoop.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.flavour;
    this.ctx.fill(scoop);
  }
}

class GameScoop extends BasicScoop {
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

class GameCone extends BasicCone {
  moveLeft() {
    this.x -= 5;
  }
  moveRight() {
    this.x += 5;
  }

  drag(event) {
    const mousePos = mouseDown(event, this.canvas);
    if (this.x <= mousePos[0] && mousePos[0] <= this.x + this.width) {
      this.dragging = true;
    }
  }

  dragMove(event) {
    const mousePos = mouseDown(event, this.canvas);
    this.x = mousePos[0] - this.width / 2;
  }
}

class Game {
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
            this.cone;
          } else {
            localStorage.setItem("score", String(this.caughtScoops));
            window.location.href = "gameOver.html";
          }
      }
      this.scoops[i].draw();
    }
    for (let i = 0; i < this.caughtScoopsGroup.length; i++) {
      this.caughtScoopsGroup[i].y =
        this.cone.y - i * this.caughtScoopsGroup[i].radius;
      this.caughtScoopsGroup[i].x =
        this.cone.x + this.caughtScoopsGroup[i].radius;
    }
    this.cone.draw();
    window.requestAnimationFrame(this.update.bind(this));
  }
}

setCanvasSize();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const game = new Game(canvas, ctx);
window.requestAnimationFrame(game.update.bind(game));
game.addScoops(0);

const leftButton = document.getElementById("left");

leftButton.addEventListener("pointerdown", () => {
  game.moveLeft = window.requestAnimationFrame(game.moveLeftButton.bind(game));
});

leftButton.addEventListener("pointerup", () => {
  window.cancelAnimationFrame(game.moveLeft);
});

const rightButton = document.getElementById("right");

rightButton.addEventListener("pointerdown", () => {
  game.moveRight = window.requestAnimationFrame(
    game.moveRightButton.bind(game)
  );
});

rightButton.addEventListener("pointerup", () => {
  window.cancelAnimationFrame(game.moveRight);
});

window.addEventListener("pointerdown", (event) => {
  game.cone.drag(event);
});

window.addEventListener("pointermove", (event) => {
  if (game.cone.dragging) {
    game.dragCone = window.requestAnimationFrame(() => {
      game.cone.dragMove(event);
    });
  }
});

window.addEventListener("pointerup", () => {
  game.cone.dragging = false;
});
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
  constructor(num, renderContext) {
    this.num = num;
    this.renderContext = renderContext;
    this.color = flavours.chocolate;
  }
  draw() {}
}

class BasicScoop {
  constructor(flavour, num, renderContext) {
    this.flavour = flavour;
    this.num = num;
    this.renderContext = renderContext;
  }
  draw(x, y) {
    const scoop = new Path2D();
    scoop.arc(x, y, 50, 0, 2 * Math.PI);
    this.renderContext.fillStyle = this.flavour;
    this.renderContext.fill(scoop);
  }
}

class GameScoop extends BasicScoop {
  constructor() {}
}

class BasicCone {
  constructor(startx, starty, width, height, renderContext) {
    this.x = startx;
    this.y = starty;
    this.width = width;
    this.height = height;
    this.renderContext = renderContext;
  }

  draw(id, x) {
    if (x) {
      this.x = x;
    }
    this.renderContext.beginPath();
    this.renderContext.moveTo(this.x, this.y);
    this.renderContext.lineTo(this.x + this.width, this.y);
    this.renderContext.lineTo(this.x + this.width / 2, this.y + this.height);
    const img = new Image();
    img.src = "img/ConeSmall.PNG";
    img.onload = function () {
      const canvas = document.getElementById(id);
      const renderContext = canvas.getContext("2d");
      const pattern = renderContext.createPattern(img, "repeat");
      renderContext.fillStyle = pattern;
      renderContext.fill();
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
    const renderContext = targetCanvas.getContext("2d");

    // Ice cream
    const scoop2 = new BasicScoop(flavours.mint, 2, renderContext);
    scoop2.draw(150, 170);
    const scoop = new BasicScoop(flavours.vanilla, 1, renderContext);
    scoop.draw(150, 230);

    // Cone
    const cone = new BasicCone(100, 250, 100, 200, renderContext);
    cone.draw("targetIceCream");
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    if (this.canvas.getContext) {
      this.renderContext = this.canvas.getContext("2d");
    }
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
  }

  addCone() {
    const coneHeight = this.height / 8;
    const coneWidth = coneHeight / 2;
    this.cone = new GameCone(
      this.width / 2 - coneWidth / 2,
      this.height - this.height / 5,
      coneWidth,
      coneHeight,
      this.renderContext
    );
    this.cone.draw("gameCanvas");
  }
}

setCanvasSize();

const flavours = flavoursObj();
const GameObj = new Game();
GameObj.addCone();

drawTarget();

function checkKey(event) {
  if (event.code === "ArrowLeft") {
    GameObj.cone.moveLeft();
  } else if (event.code === "ArrowRight") {
    GameObj.cone.moveRight();
  }
}

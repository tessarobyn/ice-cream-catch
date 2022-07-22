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

class BasicFlake {
  constructor(num, renderContext) {
    this.num = num;
    this.renderContext = renderContext;
  }
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
    this.startx = startx;
    this.starty = starty;
    this.width = width;
    this.height = height;
    this.renderContext = renderContext;
  }

  draw() {
    this.renderContext.beginPath();
    this.renderContext.moveTo(this.startx, this.starty);
    this.renderContext.lineTo(this.startx + this.width, this.starty);
    this.renderContext.lineTo(
      this.startx + this.width / 2,
      this.starty + this.height
    );
    const img = new Image();
    img.src = "img/ConeSmall.PNG";
    img.onload = function () {
      const targetCanvas = document.getElementById("targetIceCream");
      const renderContext = targetCanvas.getContext("2d");
      const pattern = renderContext.createPattern(img, "repeat");
      console.log(pattern);
      renderContext.fillStyle = pattern;
      renderContext.fill();
    };
  }
}

class GameCone extends BasicCone {
  constructor() {}
}

function setCanvasSize() {
  const gameContainer = document.getElementsByClassName("gameContainer")[0];
  const width = gameContainer.offsetWidth;
  const height = gameContainer.offsetHeight;
  const gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.style.width = width - 10 + "px";
  gameCanvas.style.height = height - 10 + "px";
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
    cone.draw();
  }
}

const flavours = flavoursObj();

setCanvasSize();
drawTarget();

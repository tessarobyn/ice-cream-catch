/* Need to move to colors.js file */
function flavoursObj() {
  return {
    mint: "#19fa86",
    chocolate: "#4a3514",
    strawberry: "#fa789b",
    vanilla: "#faf1cf",
  };
}

class Scoop {
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

    const scoop2 = new Scoop(flavours.mint, 2, renderContext);
    scoop2.draw(150, 170);
    const scoop = new Scoop(flavours.vanilla, 1, renderContext);
    scoop.draw(150, 230);

    renderContext.beginPath();
    renderContext.moveTo(100, 250);
    renderContext.lineTo(200, 250);
    renderContext.lineTo(150, 450);

    const img = new Image();
    img.src = "img/ConeSmall.PNG";
    img.onload = function () {
      const pattern = renderContext.createPattern(img, "repeat");
      renderContext.fillStyle = pattern;
      renderContext.fill();
    };
  }
}

const flavours = flavoursObj();

setCanvasSize();
drawTarget();

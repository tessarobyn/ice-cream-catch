import { setCanvasSize } from "./utils.js";
import { Game } from "./game.js";

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

window.addEventListener("mousedown", (event) => {
  game.cone.drag(event);
});

window.addEventListener("touchstart", (event) => {
  game.cone.drag(event);
});

window.addEventListener("mousemove", (event) => {
  if (game.cone.dragging) {
    game.dragCone = window.requestAnimationFrame(() => {
      game.cone.dragMove(event);
    });
  }
});

window.addEventListener("touchmove", (event) => {
  if (game.cone.dragging) {
    game.dragCone = window.requestAnimationFrame(() => {
      game.cone.dragMove(event);
    });
  }
});

window.addEventListener("pointerup", () => {
  game.cone.dragging = false;
});

window.addEventListener("touchend", () => {
  game.cone.dragging = false;
});

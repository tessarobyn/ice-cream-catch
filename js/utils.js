function getOffset(canvas) {
  const rect = canvas.getBoundingClientRect();
  return [rect.left + window.scrollX, rect.top + window.scrollY];
}

export function mouseDown(event, canvas) {
  const pos = getOffset(canvas);
  const mouseX = event.clientX - pos[0];
  const mouseY = event.clientY - pos[1];
  return [mouseX, mouseY];
}

export function touchDown(event, canvas) {
  const pos = getOffset(canvas);
  const touch = event.touches[0];
  const mouseX = touch.pageX - pos[0];
  const mouseY = touch.pageY - pos[1];
  return [mouseX, mouseY];
}

export function randInt(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}

export function setCanvasSize() {
  const gameContainer = document.getElementsByClassName("gameContainer")[0];
  const width = gameContainer.offsetWidth;
  const height = gameContainer.offsetHeight;
  const gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.width = width - 10;
  gameCanvas.height = height;
}

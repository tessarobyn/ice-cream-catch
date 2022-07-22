function toPlayPage() {
  window.location.href = "gameplay.html";
}

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", toPlayPage);

function toPlayPage() {
  window.location.href = "gameEndless.html";
}

function toRulesPage() {
  window.location.href = "rules.html";
}

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", toPlayPage);

// Rules button not on all pages that use this script
try {
  const rulesButton = document.getElementById("rulesButton");
  rulesButton.addEventListener("click", toRulesPage);
} catch {}

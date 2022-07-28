function highScore() {
  if (localStorage.getItem("highScore")) {
    if (
      parseInt(localStorage.getItem("score")) >
      parseInt(localStorage.getItem("highScore"))
    ) {
      localStorage.setItem("highScore", localStorage.getItem("score"));
    }
  } else {
    localStorage.setItem("highScore", localStorage.getItem("score"));
  }
  return localStorage.getItem("highScore");
}

function getScore() {
  return localStorage.getItem("score");
}

const scoreHeading = document.getElementById("score");
scoreHeading.innerText = String(getScore());

const highScoreHead = document.getElementById("highScore");
highScoreHead.innerText = "High score: " + String(highScore());

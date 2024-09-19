let gameSeq = [];
let userSeq = [];
let h3 = document.querySelector("h3");
let started = false;
let idx = 0;
let level = 0;
let maxScore = 0;
let colors = ["yellow", "red", "green", "purple"];

document.addEventListener("click", function () {
  if (!started && level == 0) {
    started = true;
    h3.innerText = "Game Is Started";
    setTimeout(levelUp, 1000);
  } else {
    started = false;
  }
});

function Flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level - ${level}`;

  let randomval = Math.floor(Math.random() * 4); // Change 3 to 4
  let randomColor = colors[randomval];
  let randomBtn = document.querySelector(`.${randomColor}`);
  Flash(randomBtn);
  gameSeq.push(randomColor);
}

function checkAns(idx) {
  if (gameSeq[idx] == userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 200);
    }
  } else if (!started) {
    return;
  } else {
    if (maxScore < level) {
      maxScore = level;
      h3.innerHTML = `<b>Highest Score</b>, <br> Congratulations , You Scored The Highest Score : ${maxScore} <br> Press Any Key To Start....`;
    } else {
      h3.innerHTML = `Game Over, Your Score Is <b>${level}</b> <br> Press Any Key To Start....`;
    }
    document.querySelector("body").style.backgroundColor = "red";
    // Delay the reset to allow the score to be displayed
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
      reset(); // Now reset after the score is shown
    }, 1000); // Delay reset by 1 second
  }
}

function pressBtn() {
  let btn = this;
  userFlash(btn); // Pass btn here
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  // Add `let` to avoid global leak
  btn.addEventListener("click", pressBtn);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  idx = 0;
}

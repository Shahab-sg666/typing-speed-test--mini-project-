const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetBtn = document.querySelector("#reset");

let timer = [0, 0, 0, 0];
let timerRunning = false;
let interval;

function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }

  return time;
}

function runTimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);

  theTimer.innerHTML = currentTime;

  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100) - timer[0] * 60;
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText) {
    testArea.style.borderColor = "rgb(20, 151, 20)";
    clearInterval(interval);
  } else {
    if (textEntered == originTextMatch) {
      testArea.style.borderColor = "rgb(216, 223, 5)";
    } else {
      testArea.style.borderColor = "rgb(221, 10, 10)";
    }
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testArea.style.borderColor = "#b5b5b5";
}

function start() {
  let textEnteredLength = testArea.value.length;

  if (textEnteredLength == 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

testArea.addEventListener("keypress", start);
testArea.addEventListener("keyup", spellCheck);
resetBtn.addEventListener("click", reset);

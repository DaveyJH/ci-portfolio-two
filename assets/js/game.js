// settings to sit below header

window.addEventListener("resize", handleChange);
/** ensure settings overlay sits below header */
function handleChange() {
  let headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
  let settingsSpacerHeight = headerHeight / 15.185185;
  settingsSpacer = (settingsSpacerHeight + "rem");
  document.getElementById("settings").style.top = settingsSpacer;
}

handleChange();

// default game settings
let numOfBalls = 4;
let numOfColors = 6;
let solutionRepeat = true;
let guessRepeat = true;
// default timer/score settings
let displayCurrentTime = true;
let displayBestTime = true;
let displayBestScore = true;

// ! timer variables and functions

// credit to Code Institute course content for basic timer function
// modified with basic solution credit to https://stackoverflow.com/users/854246/joseph-marikle
// https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers/8043061#8043061
// first answer, which applies for positive integers only, works for this situation
// the answer combines a string with a number so extra steps have
// been taken to convert to strings and numbers where necessary

let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let secondsTime = 0; // start value
let minutesTime = 0; // start value
let bestSeconds = document.getElementById("best-seconds");
let bestMinutes = document.getElementById("best-minutes");
let intervalCount;

/** runs a second and minute time that stops at 59:59 */
function timer() {
  intervalCount = setInterval(function () {
    secondsTime++; // increment seconds by 1
    seconds.innerHTML = (("0" + secondsTime).slice(-2)).toString(); // display seconds as 2 digit string
    minutes.innerHTML = (("0" + minutesTime).slice(-2)).toString(); // display minutes as 2 digit string
    if (secondsTime === 60) { // do not display 60
      secondsTime = 0; // reset second count
      seconds.innerHTML = (("0" + secondsTime).slice(-2)).toString(); // display 00 seconds
      minutesTime++; // increment minutes by 1
      minutes.innerHTML = (("0" + minutesTime).slice(-2)).toString(); // display minutes as 2 digit string
    }
    if ((secondsTime === 59) && (minutesTime === 59)) { // stop timer at maximum time of 59:59
      clearInterval(intervalCount);
    }
  }, 1000); // 1000ms = 1 second
}

/* settings overlay */
let settingsActivator = document.getElementById("settings-activator");
settingsActivator.addEventListener("click", settings);

/** show or hide settings depending in current state */
function settings() {
  if (document.getElementById("settings").style.visibility === "visible") {
    document.getElementById("settings").style.visibility = "hidden";
    if (seconds.innerHTML !== "--") {
      timer();
    }
  } else {
    showSettings();
  }
}

/** show settings overlay */
function showSettings() {
  document.getElementById("settings").style.visibility = "visible";
  clearInterval(intervalCount);
  let playButton = document.getElementById("play-button");
  playButton.addEventListener("click", gameOn);
}

/** prevent clicking on label or number to prevent manual input.
 * tab index also disabled in HTML
 */
function disableClickNumberInputs() {
  document.querySelectorAll("input[type=number]").forEach(item => {
    item.addEventListener("mousedown", preventAll);
  });
  document.querySelectorAll(".prevent-click").forEach(item => {
    item.addEventListener("click", preventAll)
  });

  function preventAll(event) {
    event.preventDefault();
  }
}

/** allow +/- buttons to change numeric values */
function plusminus() {
  let minusButtons = document.getElementsByClassName("minus");
  let plusButtons = document.getElementsByClassName("plus");

  for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener("click", plusValue);
  }

  /** increase value if below maximum value */
  function plusValue(event) {
    event.preventDefault();
    let num = event.target.previousElementSibling;
    let numericValue = Number(num.value);
    if (numericValue < Number(num.max)) {
      numericValue++;
      num.value = numericValue;
    } else {
      alert("Sorry, you can't go any higher!");
    }
  }

  for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener("click", minusValue);
  }

  /** decrease value if above minimum */
  function minusValue(event) {
    event.preventDefault();
    let num = event.target.nextElementSibling;
    let numericValue = Number(num.value);
    if (numericValue > Number(num.min)) {
      numericValue--;
      num.value = numericValue;
    } else {
      alert("Sorry, you can't go any lower!");
    }
  }
}

function gameOn(event) {
  event.preventDefault();
  document.getElementById("settings").style.visibility = "hidden";
  runMainScript();
}

function runMainScript() {

  /** check current completion time against best time,
   * if quicker => replace best time
   */
  function checkTime() {
    let testSeconds = Number(bestSeconds.innerHTML); // convert seconds string to number
    let testMinutes = Number(bestMinutes.innerHTML); // convert minutes string to number
    let calculatedCurrentTime = minutesTime * 60 + secondsTime; // current time in seconds
    let calculatedBestTime = testMinutes * 60 + testSeconds; // best time in seconds
    if ((calculatedCurrentTime < calculatedBestTime) || (bestSeconds.innerHTML === "--")) { // check current time against best OR best is unset
      bestSeconds.innerHTML = (("0" + secondsTime).slice(-2)).toString(); // write bestSeconds
      bestMinutes.innerHTML = (("0" + minutesTime).slice(-2)).toString(); // write bestMinutes
    }
  }

  /** reset timer to 0 */
  function resetTime() {
    secondsTime = 0;
    minutesTime = 0;
  }
  
  resetTime();
  timer();
}

plusminus();
disableClickNumberInputs();
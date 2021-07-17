// for functions/code that is not commented, see ./challenge.js
// many functions are similar and so duplicate comments have been removed for readability

window.addEventListener("resize", handleChange);
let settingsOverlay = document.getElementById("settings");
/** ensure settings overlay sits below header */
function handleChange() {
  let headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
  let settingsSpacerHeight = headerHeight / 15.185185;
  let settingsSpacer = (settingsSpacerHeight + "rem");
  document.getElementById("settings").style.top = settingsSpacer;
}

// ! timer variables and functions

let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let secondsTime = 0;
let minutesTime = 0;
let bestSeconds = document.getElementById("best-seconds");
let bestMinutes = document.getElementById("best-minutes");
let intervalCount;

/** runs a second and minute time that stops at 59:59 */
function timer() {
  intervalCount = setInterval(function () {
    secondsTime++;
    seconds.innerHTML = (("0" + secondsTime).slice(-2)).toString();
    minutes.innerHTML = (("0" + minutesTime).slice(-2)).toString();
    if (secondsTime === 60) {
      secondsTime = 0;
      seconds.innerHTML = (("0" + secondsTime).slice(-2)).toString();
      minutesTime++;
      minutes.innerHTML = (("0" + minutesTime).slice(-2)).toString();
    }
    if ((secondsTime === 59) && (minutesTime === 59)) {
      clearInterval(intervalCount);
    }
  }, 1000);
}

// ! settings

// gameplay settings
let numOfColors = 6;
let calculatedColors = document.getElementById("number-of-colors");
let numOfBalls = 4;
let calculatedBalls = document.getElementById("number-in-solution");
let solutionRepeat = true;
let guessRepeat = true;

// gameplay checkboxes
let solutionRepeatCheck = document.getElementById("repeat-in-solution");
let guessRepeatCheck = document.getElementById("repeat-in-guess");

// timer/score checkbox settings
let currentTimeCheck = document.getElementById("current-time");
let bestTimeCheck = document.getElementById("best-time");
let bestScoreCheck = document.getElementById("best-score");

let settingsHolder = [calculatedColors.value,
  calculatedBalls.value,
  solutionRepeatCheck.checked,
  guessRepeatCheck.checked
];

let settingsActivator = document.getElementById("settings-activator");

// ! settings overlay

solutionRepeatCheck.addEventListener("click", checkState);
/** - check values of colors and balls, disable/check checkboxes as needed.
 *  - check state of checkboxes and disable/check guessRepeatCheck as needed.
 */
function checkState() {
  numOfColors = calculatedColors.value;
  numOfBalls = calculatedBalls.value;
  if (numOfBalls > numOfColors) {
    solutionRepeatCheck.checked = true;
    solutionRepeatCheck.disabled = true;
    guessRepeatCheck.checked = true;
    guessRepeatCheck.disabled = true;
  } else {
    solutionRepeatCheck.disabled = false;
  }

  if (!solutionRepeatCheck.checked) {
    guessRepeatCheck.disabled = false;
  } else {
    guessRepeatCheck.disabled = true;
    guessRepeatCheck.checked = true;
  }
}

settingsActivator.addEventListener("click", settingsState);
/** show or hide settings depending on current state.
 * if settings overlay closed without new game starting:
 * return gameplay settings to stored values
 */
function settingsState() {
  if (settingsOverlay.style.visibility === "visible") {
    calculatedColors.value = settingsHolder[0];
    calculatedBalls.value = settingsHolder[1];
    solutionRepeatCheck.checked = settingsHolder[2];
    guessRepeatCheck.checked = [3];
    checkState();
    scoreTimerOptionsCheck();
    settingsOverlay.style.visibility = "hidden";
    if (seconds.innerHTML !== "--") {
      timer();
    }
  } else {
    showSettings();
  }
}

/** check status of score/timer check boxes in settings overlay */
function scoreTimerOptionsCheck() {
  if (!currentTimeCheck.checked) {
    document.getElementsByClassName("current time")[0].style.visibility = "hidden";
  } else {
    document.getElementsByClassName("current time")[0].style.visibility = "visible";
  }

  if (!bestTimeCheck.checked) {
    document.getElementsByClassName("best time")[0].style.visibility = "hidden";
  } else {
    document.getElementsByClassName("best time")[0].style.visibility = "visible";
  }

  if (!bestScoreCheck.checked) {
    document.getElementsByClassName("best score")[0].style.visibility = "hidden";
  } else {
    document.getElementsByClassName("best score")[0].style.visibility = "visible";
  }
}

/** store gameplay setting values to update settings overlay */
function storeNewSettings() {
  settingsHolder = [calculatedColors.value, calculatedBalls.value, solutionRepeatCheck.checked, guessRepeatCheck.checked];
}

/** show settings overlay and enable functionality */
function showSettings() {
  settingsOverlay.style.visibility = "visible";
  clearInterval(intervalCount);
  let playButton = document.getElementById("play-button");
  playButton.addEventListener("click", playGame);
}

/** prevent clicking on label or number to prevent manual input.
 * tab index also disabled in HTML
 */
function disableClickNumberInputs() {
  document.querySelectorAll("input[type=number]").forEach(item => {
    item.addEventListener("mousedown", preventAll);
  });
  document.querySelectorAll(".prevent-click").forEach(item => {
    item.addEventListener("click", preventAll);
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
    if (num.value < Number(num.max)) {
      num.value++;
    } else {
      alert("Sorry, you can't go any higher!");
    }
    checkState();
  }

  for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener("click", minusValue);
  }

  /** decrease value if above minimum */
  function minusValue(event) {
    event.preventDefault();
    let num = event.target.nextElementSibling;
    if (num.value > Number(num.min)) {
      num.value--;
    } else {
      alert("Sorry, you can't go any lower!");
    }
    checkState();
  }
}

/** hide settings overlay and run the main game script */
function playGame(event) {
  event.preventDefault();
  storeNewSettings();
  settingsOverlay.style.visibility = "hidden";
  reset();
}

// ! main game functions

/** check current completion time against best time,
 * if quicker => replace best time
 */
function checkTime() {
  let testSeconds = Number(bestSeconds.innerHTML);
  let testMinutes = Number(bestMinutes.innerHTML);
  let calculatedCurrentTime = minutesTime * 60 + secondsTime;
  let calculatedBestTime = testMinutes * 60 + testSeconds;
  if ((calculatedCurrentTime < calculatedBestTime) || (bestSeconds.innerHTML === "--")) {
    bestSeconds.innerHTML = (("0" + secondsTime).slice(-2)).toString();
    bestMinutes.innerHTML = (("0" + minutesTime).slice(-2)).toString();
  }
}

/** reset timer to 0 */
function resetTime() {
  secondsTime = 0;
  minutesTime = 0;
}

// ! gameplay variables

let gameBoard = document.getElementById("game-board");

let colors = ["red", "green", "blue", "yellow", "pink", "purple", "aqua", "lime", "black", "white", "silver", "orange"];
let colorSelectors = document.getElementsByClassName("selector");
let colorSelectBox = document.getElementById("selector-box");
let guessRowBalls = document.getElementsByClassName("selection ball-spacing");
let solutionRow = document.getElementById("solution");
let guessRows = document.getElementsByClassName("guess");
let solutionBalls = solutionRow.children;
let solutionCover = document.getElementById("solution-cover");
let resultPegs = document.getElementsByClassName("result");
let solution = [];
let solutionHolder;

let colorBalls = document.getElementsByClassName("color-ball");
let pegs = document.getElementsByClassName("peg");

numOfColors = calculatedColors.value;
numOfBalls = calculatedBalls.value;

// ! setup functions

/** set number of balls in guess rows to equal settings value */
function setBallCount() {
  for (let i = 0; i < guessRowBalls.length; i++) {
    while (guessRowBalls[i].children.length < numOfBalls) {
      let newBall = document.createElement("div");
      newBall.classList.add("color-ball");
      guessRowBalls[i].appendChild(newBall);
    }
  }
}

/** set number of balls in solution row to equal settings value */
function setSolutionBallCount() {
  while (solutionRow.children.length < numOfBalls) {
    let newBall = document.createElement("div");
    newBall.classList.add("color-ball");
    solutionRow.appendChild(newBall);
  }
}

/** set number of pegs displayed to equal number of balls */
function setPegCount() {
  for (let i = 0; i < resultPegs.length; i++) {
    while (resultPegs[i].children.length < numOfBalls) {
      let newPeg = document.createElement("div");
      newPeg.classList.add("peg");
      resultPegs[i].appendChild(newPeg);
    }
  }
}

/** add div.color-ball.selector for each color in colors array */
function addColorSelectors() {
  while (colorSelectors.length < numOfColors) {
    let newColorSelector = document.createElement("div");
    newColorSelector.classList.add("color-ball", "selector");
    colorSelectBox.appendChild(newColorSelector);
  }
}

/** remove child elements to ensure layout and gameplay
 * matches settings selections
 */
function removeChildren() {
  while (colorSelectors.length > numOfColors) {
    colorSelectBox.removeChild(colorSelectBox.lastChild);
  }
  for (let i = 0; i < guessRowBalls.length; i++) {
    while (guessRowBalls[i].children.length > numOfBalls) {
      guessRowBalls[i].removeChild(guessRowBalls[i].lastChild);
    }
  }
  while (solutionRow.children.length > numOfBalls) {
    solutionRow.removeChild(solutionRow.lastChild);
  }
  for (let i = 0; i < resultPegs.length; i++) {
    while (resultPegs[i].children.length > numOfBalls) {
      resultPegs[i].removeChild(resultPegs[i].lastChild);
    }
  }
}

let availableColors = colors.slice(0, numOfColors);
// console.log(`Available: ${availableColors}`); // ! delete before deployment

/** set solution to random array of availableColors */
function setSolution() {
  for (let i = 0; i < numOfBalls; i++) {
    let newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    solution.push(newColor);
  }
}

/** add click listener to color selectors */
function selectorsListeners() {
  document.querySelectorAll(".selector").forEach(item => {
    item.addEventListener("click", colorSelect);
  });
}

/** setup selector box to contain correct count of color balls and
 * for each color ball to be colored and have a listener
 */
function setSelectorBalls() {
  addColorSelectors();
  selectorsListeners();
  for (let i = 0; i < colorSelectors.length; i++) {
    colorSelectors[i].style.backgroundColor = (colors[i]);
  }
}

// ! gameplay functions

let aR;
let activeRow;
let activeBalls;
let activePegs;
let activeSelection = "inactive";
let score;
let emptyBalls;
let pegColors = [];
let bestScore = 0;

/** set row as active to allow interaction */
function activateRow() {
  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.classList.add("active-row");

  activeBalls = activeRow.children[1].children;
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.add("active-balls", "empty");
    activeBalls[i].addEventListener("click", rowColorSelector);
  }

  activeRow.children[0].style.borderColor = "#165764";
  activeRow.children[0].addEventListener("click", checkResult);
  activePegs = activeRow.children[2].children;
  score++;
}

/** deactivate row by removing classes and click listeners */
function deactivateRow() {
  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.children[0].style.borderColor = "#fffce8";
  activeRow.classList.remove("active-row");
  document.querySelectorAll(".active-balls").forEach(item => {
    item.removeEventListener("click", rowColorSelector);
  });
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.remove("active-balls");
  }
  activeRow.children[0].removeEventListener("click", checkResult);
}

/** continue with next row or report lose.
 * on lose, pause and then reset timer
 */
function nextRow() {
  pegColors = []; // delete values from pegColors
  deactivateRow();
  aR++; // increment active row number
  if (aR < guessRows.length) {
    activateRow();
  } else {
    let newRowNumber = guessRows.length + 1;
    let newRow = document.createElement("div");
    newRow.classList.add("row", "guess");
    newRow.innerHTML = `<div class="number text-center">
                          ${newRowNumber}
                        </div>
                        <div class="selection ball-spacing">
                        </div>
                        <div class="result">
                        </div>`;
    gameBoard.appendChild(newRow);
    setBallCount();
    setPegCount();
    activateRow();
  }
}


/** allows selected color-ball to be set as
 * activeSelection and enables color
 * selection. applies border to activeSelection
 */
function rowColorSelector(event) {
  if (activeSelection !== "inactive") {
    activeSelection.style.border = "none";
  }
  colorSelectBox.style.visibility = "visible";
  activeSelection = event.target;
  activeSelection.style.border = ".2rem solid #fffce8";
}

/** set color of selected ball and then close selector box
 */
function colorSelect(event) {
  let colorSelected = event.target.style.backgroundColor;
  activeSelection.style.backgroundColor = colorSelected;
  activeSelection.classList.remove("empty");
  colorSelectBox.style.visibility = "hidden";
  activeSelection.style.border = "none";
  activeBallsEmpty();
  if (!emptyBalls) {
    activeRow.children[0].style.borderColor = "#36b9d3";
  }
}

/** check for .empty in any ball in activeRow */
function activeBallsEmpty() {
  let emptyHolder = [];
  for (let i = 0; i < activeBalls.length; i++) {
    if (activeBalls[i].classList.contains("empty")) {
      emptyHolder.push("empty");
    }
  }
  console.log(emptyHolder); // ! delete before deployment
  if (emptyHolder.includes("empty")) {
    emptyBalls = true;
  } else {
    emptyBalls = false;
  }
  console.log(emptyBalls); // ! delete before deployment
}

// ! result functions

/** check result of input colors */
function checkResult() {
  solutionHolder = solution.slice();
  activeBallsEmpty();
  if (emptyBalls) {
    alert("Please complete selection!");
  } else {
    colorSelectBox.style.visibility = "hidden";
    if (activeSelection !== "inactive") {
      activeSelection.style.border = "none";
      activeSelection = "inactive";
    }

    checkBlack();
    checkWhite();
    assignPegs();
    // checkPegs();

    // if (win) {
    //   clearInterval(intervalCount); // stop timer
    //   checkTime();
    //   resetTime();
    //   deactivateRow();
    //   ballReveal();
    //   checkScore();
    //   message.innerHTML = "Well done!";
    //   setTimeout(winner, 100);
    // } else {
      nextRow();
    // }
  }
  solution = solutionHolder.slice(); // set solution array back to correct values
}

/** check if ball color and position are correct */
function checkBlack() {
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === activeBalls[i].style.backgroundColor) {
      solution[i] = "checked";
      pegColors.push("black");
    }
  }
}

/** check if ball color is correct but in wrong position */
function checkWhite() {
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] !== "checked"
      &&
      solution.includes(activeBalls[i].style.backgroundColor)) {
      let removal = solution.indexOf(activeBalls[i].style.backgroundColor);
      solution[removal] = "pegged";
      pegColors.push("white");
    }
  }
}

/** assign colors to pegs based on result */
function assignPegs() {
  for (let i = 0; i < numOfBalls; i++) {
    activePegs[i].style.backgroundColor = pegColors[i];
  }
}

let message = document.getElementById("message");

function runGame() {
  scoreTimerOptionsCheck();
  removeChildren();
  setBallCount();
  setSelectorBalls();
  setPegCount();
  setSolutionBallCount();
  setSolution();
  activateRow();
  timer();
  console.log(`Solution: ${solution}`); // ! delete before deployment
  console.log(colorSelectBox); // ! delete before deployment
}

function reset() {
  clearInterval(intervalCount);
  colorSelectBox.style.visibility = "hidden";
  if (activeSelection !== "inactive") {
    activeSelection.style.border = "none";
    activeSelection = "inactive";
  }
  solution = [];
  for (let i = 0; i < colorBalls.length; i++) {
    colorBalls[i].style.backgroundColor = "#854e1e";
  }
  for (let i = 0; i < pegs.length; i++) {
    pegs[i].style.backgroundColor = "#a0622c";
  }
  console.log(aR);
  if (aR !== (0 || undefined)) {
    deactivateRow();
  }
  aR = 0;
  // pegColors = [];
  // solutionCover.style.zIndex = "1";
  score = 0;
  message.innerHTML = "Good luck!";
  runGame();
}

handleChange();

resetTime();
plusminus();
disableClickNumberInputs();
reset();
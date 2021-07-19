// for functions/code with no comments, see ./challenge.js
// many functions are similar and so duplicate comments have been removed for readability
// game.js has been refined from challenge.js and should have better readability

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

  if ((numOfBalls > numOfColors) && (numOfColors < 7)) {
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
    guessRepeatCheck.checked = settingsHolder[3];
    checkState();
    scoreTimerOptionsCheck();
    settingsOverlay.style.visibility = "hidden";
    timer();
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

  /** - increase value if below maximum value
   * - check number values and alter check boxes if necessary
  */
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

  /** - decrease value if above minimum
   * - check number values and alter check boxes if necessary
  */
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

/** - hide settings overlay and run the main game script 
 * - if settings changed, reset best score and time to "--"
*/
function playGame(event) {
  event.preventDefault();
  // reset best score and best time if settings changed for game
  if ((settingsHolder[0] !== calculatedColors.value) ||
    (settingsHolder[1] !== calculatedBalls.value) ||
    (settingsHolder[2] !== solutionRepeatCheck.checked) ||
    (settingsHolder[3] !== guessRepeatCheck.checked)) {
    bestScoreHTML.innerHTML = "--";
    bestScore = 0;
    bestSeconds.innerHTML = "--";
    bestMinutes.innerHTML = "--";
  }
  storeNewSettings();
  settingsOverlay.style.visibility = "hidden";
  reset();
}

// ! main game functions

/** reset timer to 0 */
function resetTime() {
  secondsTime = 0;
  minutesTime = 0;
}

// ! gameplay variables

let gameBoard = document.getElementById("game-board");

let colors = ["red", "green", "blue", "yellow", "pink", "purple", "aqua", "lime", "black", "white", "silver", "orange"];
let availableColors;
let colorSelectors = document.getElementsByClassName("selector");
let colorSelectBox = document.getElementById("selector-box");
let clearSelector = document.getElementById("clear-selector");
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

/** add new div.color-ball.selector for each color in colors array */
function addColorSelectors() {
  while (colorSelectors.length < numOfColors) {
    let newColorSelector = document.createElement("div");
    newColorSelector.classList.add("color-ball", "selector");
    colorSelectBox.appendChild(newColorSelector);
  }
}

/** add clearSelection to top selector ball/text (separate from colors) */
function addClearSelection() {
  document.getElementById("clear-selector").children[0].addEventListener("click", clearSelection);
  document.getElementById("clear-selector").children[1].addEventListener("click", clearSelection);
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

/** delete guess rows>7 that have been created by multiple guesses */
function removeRows() {
  while (guessRows.length > 7) {
    gameBoard.removeChild(gameBoard.lastChild);
  }
}

/** set available colors to equal number of colors chosen in settings */
function setAvailableColors() {
  availableColors = colors.slice(0, numOfColors);
}

/** set solution to random array of availableColors */
function setSolution() {
  for (let i = 0; i < numOfBalls; i++) {
    let newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    solution.push(newColor);
    if (!solutionRepeatCheck.checked) {
      let colorDelete = availableColors.indexOf(newColor);
      availableColors.splice(colorDelete, 1);
    }
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
  addClearSelection();
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
let activeIndex;
let currentGuessColors;

/** - set row as active to allow interaction */
function activateRow() {
  setCurrentColorArrayBlank();

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

/** deactivate row by removing classes and click listeners and reverting colors */
function deactivateRow() {
  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.children[0].style.borderColor = "#fffce8";
  activeRow.classList.remove("active-row");
  document.querySelectorAll(".active-balls").forEach(item => {
    item.removeEventListener("click", rowColorSelector);
    item.classList.remove("active-balls");
  });

  // ? check requirements for backward compatibility for project
  // ? if required, remove query selectors and replace with below

  // for (let i = 0; i < activeBalls.length; i++) {
  //   activeBalls[i].classList.remove("active-balls");
  // }
  activeRow.children[0].removeEventListener("click", checkResult);
}

/** continue with next row. if no row exists, create one.
 */
function nextRow() {
  pegColors = [];
  deactivateRow();
  aR++;
  if (guessRows.length > 98) {
    extremeLoss();
  }
  if (aR < guessRows.length) {
    activateRow();
  } else {
    addRow();
    activateRow();
  }
}

/** create new guess row with current settings */
function addRow() {
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
}

/** allows selected color-ball to be set as
 * activeSelection and enables color
 * selection. applies border to activeSelection
 */
function rowColorSelector(event) {
  if (activeSelection !== "inactive") {
    activeSelection.style.border = "none";
    activeSelection.classList.remove("active-row-selector");
  }
  colorSelectBox.style.visibility = "visible";
  activeSelection = event.target;
  console.log(activeSelection.style.backgroundColor);
  if ((activeSelection.style.backgroundColor === "rgb(133, 78, 30)") ||
    (activeSelection.style.backgroundColor === "")) {
    clearSelector.style.visibility = "hidden";
  } else {
    clearSelector.style.visibility = "visible";    
  }
  activeSelection.style.border = ".2rem solid #fffce8";
  activeSelection.classList.add("active-row-selector");
}

/** delete array values and create blank values to equal number of balls */
function setCurrentColorArrayBlank() {
  currentGuessColors = [];
  for (let i = 0; i < calculatedBalls.value; i++) {
    currentGuessColors.push("");
  }
}

/** set color of selected ball and then close selector box
 */
function colorSelect(event) {
  /* reference index value to maintain position of colors
  from active row in currentGuessColors array*/
  getActiveIndex();
  let colorSelected = event.target.style.backgroundColor;
  if (!guessRepeatCheck.checked) {
    /* check color has not already been selected and 
    the activeSelection ball is not already the intended color */
    if ((currentGuessColors.includes(colorSelected)) &&
      (activeIndex !== currentGuessColors.indexOf(colorSelected))) {
      alert("Your chosen settings do not allow you to repeat colours, please pick another.");
    } else {
      currentGuessColors[activeIndex] = colorSelected; // replace array value to prevent repeat color
      activeSelection.style.backgroundColor = colorSelected;
      activeSelection.classList.remove("empty", "active-row-selector");
      colorSelectBox.style.visibility = "hidden";
      clearSelector.style.visibility = "hidden";
      activeSelection.style.border = "none";
    }
  } else {
    activeSelection.style.backgroundColor = colorSelected;
    activeSelection.classList.remove("empty", "active-row-selector");
    colorSelectBox.style.visibility = "hidden";
    clearSelector.style.visibility = "hidden";
    activeSelection.style.border = "none";
  }
  activeBallsEmpty();
  if (!emptyBalls) {
    activeRow.children[0].style.borderColor = "#36b9d3";
  }
}

/** clear color from active selection, add .empty, close selectBox and remove border */
function clearSelection() {
  if (!guessRepeatCheck.checked) {
    getActiveIndex();
    currentGuessColors[activeIndex] = "";
  }
  activeSelection.style.backgroundColor = "rgb(133, 78, 30)";
  activeSelection.classList.remove("active-row-selector");
  activeSelection.classList.add("empty");
  colorSelectBox.style.visibility = "hidden";
  clearSelector.style.visibility = "hidden";
  activeSelection.style.border = "none";
  activeBallsEmpty();
  if (emptyBalls) {
    activeRow.children[0].style.borderColor = "#165764";
  }
}

/** get index number of activeSelection ball */
function getActiveIndex() {
  for (let i = 0; i < activeBalls.length; i++) {
    if (activeBalls[i].classList.contains("active-row-selector")) {
      activeIndex = i;
    }
  }
}

/** check for .empty in any ball in activeRow. return emptyBalls */
function activeBallsEmpty() {
  let emptyHolder = [];
  for (let i = 0; i < activeBalls.length; i++) {
    if (activeBalls[i].classList.contains("empty")) {
      emptyHolder.push("empty");
    }
  }
  if (emptyHolder.includes("empty")) {
    emptyBalls = true;
  } else {
    emptyBalls = false;
  }
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
    clearSelector.style.visibility = "hidden";
    if (activeSelection !== "inactive") {
      activeSelection.style.border = "none";
      activeSelection = "inactive";
    }

    checkBlack();
    checkWhite();
    assignPegs();
    checkPegs();

    if (win) {
      clearInterval(intervalCount);
      checkTime();
      resetTime();
      deactivateRow();
      ballReveal();
      checkScore();
      message.innerHTML = "Well done!";
      setTimeout(winner, 100);
      document.getElementById("give-up").removeEventListener("click", giveUp);
      document.getElementById("hint").removeEventListener("click", hint);
    } else {
      nextRow();
    }
  }
  solution = solutionHolder.slice();
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
    if (solution[i] !== "checked" &&
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

// ! win/lose checks

let win;
let bestScoreHTML = document.getElementsByClassName("best score")[0];

/** check for four black pegs, return win
 */
function checkPegs() {
  for (let i = 0; i < activePegs.length; i++) {
    if (activePegs[i].style.backgroundColor === "black") {
      win = true;
    } else {
      win = false;
    }
  }
}

/** set ball color and reveal answer */
function ballReveal() {
  setSolutionBalls();
  setTimeout(solutionCover.style.zIndex = "-1", 50);
}

/** set color of solution balls to solution array values */
function setSolutionBalls() {
  for (let i = 0; i < solutionHolder.length; i++) {
    solutionBalls[i].style.backgroundColor = (solutionHolder[i]);
  }
}

/** check if best score has been set
 * and if it is larger than the current winning
 * score. if so, change the displayed number to the best score
 */
function checkScore() {
  if (bestScore > score || bestScore === 0) {
    bestScore = score.toString();
    bestScoreHTML.innerHTML = `${bestScore}`;
  }
}

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

/** pop up win message. confirm with option to replay */
function winner() {
  console.log(score);
  let winnerMessage;
  let hintWord;
  if (hintCount === 1) {
    hintWord = "hint";
  } else {
    hintWord = "hints";
  }
  if (score > 1) {
    winnerMessage = `You took ${score} attempts and used ${hintCount} ${hintWord}.
You were successful in a time of ${minutes.innerHTML}:${seconds.innerHTML}`;
  } else if (score === 1) {
    winnerMessage = `You took ${score} attempt and used ${hintCount} ${hintWord}.
You were successful in a time of ${minutes.innerHTML}:${seconds.innerHTML}`;
  }
  console.log(winnerMessage);
  if (confirm (`Congratulations, you won!
${winnerMessage}
Would you like to play again?`)) {
    reset();
  }
}

let message = document.getElementById("message");

// ! giveup and hint functions

/** confirm popup to  give up. if true: lose the game */
function giveUp() {
  if (confirm("Do you really want to give up?")) {
    solutionHolder = solution.slice();
    ballReveal();
    message.innerHTML = "Oh dear!";
    clearInterval(intervalCount);
    setTimeout(loser, 100);
    deactivateRow();
  }
}

/** popup about losing. confirm with option to replay */
function loser() {
  document.getElementById("give-up").removeEventListener("click", giveUp);
  document.getElementById("hint").removeEventListener("click", hint);
  let loserMessage;
  if (score - 1 > 1) {
    loserMessage = `Unlucky, you lost!
You had ${(score -1)} attempts in ${minutes.innerHTML}:${seconds.innerHTML}
Would you like to play again?`;
  } else if (score - 1 === 1) {
    loserMessage = `Unlucky, you lost!
You had ${(score -1)} attempt in ${minutes.innerHTML}:${seconds.innerHTML}
Would you like to play again?`;
  } else {
    loserMessage = `Unlucky, you lost!
You didn't even have a go!
Would you like to play again?`;
  }
  if (confirm (`${loserMessage}`)) {
    reset();
  }
}

let widthReducer;
let currentWidth;
let hintCount;
/** use numOfBalls to calculate width reduction size */
function calculateWidthReducer() {
  switch(numOfBalls) {
    case "3":
      widthReducer = 22.5;
      break;
    case "4":
      widthReducer = 16.875;
      break;
    case "5":
      widthReducer = 13.5;
      break;
    case "6":
      widthReducer = 11.25;
      break;
    default:
      alert("Are you cheating?");
  }
}

/** reveal one color if possible */
function hint() {
  if (confirm("Would you like to reveal a ball?")) {
    solutionHolder = solution.slice();
    if (currentWidth !== widthReducer) {
      hintCount++;
      addOneSolutionColor();
      solutionCover.style.width = ((currentWidth - widthReducer) + "%");
      currentWidth = currentWidth - widthReducer;
    } else {
      alert("You cannot reveal the last ball. Maybe you should just give up!");
    }
  }
}

/** set the background color of the next ball to be revealed */
function addOneSolutionColor() {
  let solutionIndex = solutionBalls.length - hintCount;
  solutionBalls[solutionIndex].style.backgroundColor = solutionHolder[solutionIndex];
}

/** set gameboard according to settings and run game */
function runGame() {
  scoreTimerOptionsCheck();
  removeChildren();
  setAvailableColors();
  setBallCount();
  setSelectorBalls();
  setPegCount();
  setSolutionBallCount();
  setSolution();
  calculateWidthReducer();
  timer();
  activateRow();
  document.getElementById("give-up").addEventListener("click", giveUp);
  document.getElementById("hint").addEventListener("click", hint);
  console.log(`Solution: ${solution}`); // ! delete before deployment
}

/** reset game board and values and run game */
function reset() {
  win = false;
  clearInterval(intervalCount);
  colorSelectBox.style.visibility = "hidden";
  clearSelector.style.visibility = "hidden";
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
  if (aR !== (0 || undefined)) {
    deactivateRow();
  }
  aR = 0;
  pegColors = [];
  solutionCover.style.zIndex = "1";
  solutionCover.style.width = "67.5%";
  currentWidth = 67.5;
  hintCount = 0;
  score = 0;
  message.innerHTML = "Good luck!";
  resetTime();
  removeRows();
  runGame();
}

handleChange();

resetTime();
plusminus();
disableClickNumberInputs();
reset();
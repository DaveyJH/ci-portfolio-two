//* maintain settings overlay layout below header
window.addEventListener("resize", handleChange);
const settingsOverlay = document.getElementById("settings");
/** ensure settings overlay sits below header */
function handleChange() {
  let headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
  let settingsSpacerHeight = headerHeight / 15.185185;
  let settingsSpacer = (settingsSpacerHeight + "rem");
  document.getElementById("settings").style.top = settingsSpacer;
}

const globalSettings = document.getElementById("global-settings");
//! colorBlind setting
//#region [purple]
const colorBlind = document.getElementById("color-blind");
const cBCheckmark = colorBlind.nextElementSibling;
// aria control for click
colorBlind.addEventListener("click", () => {
  toggleColorBlind();
  ariaCheck(colorBlind);
});
cBCheckmark.addEventListener("click", () => {
  colorBlind.checked = !colorBlind.checked;
  toggleColorBlind();
  ariaCheck(colorBlind);
});
// prevent space scroll
cBCheckmark.addEventListener("keydown", (keyed) => {
  if (keyed.key === " ") {
    keyed.preventDefault();
  }
});
// keyboard
cBCheckmark.addEventListener("keyup", (keyed) => {
  if (!colorBlind.disabled) {
    if (keyed.key === "Enter") {
      colorBlind.checked = !colorBlind.checked;
      toggleColorBlind();
      ariaCheck(colorBlind);
    } else if (keyed.key === " ") {
      colorBlind.checked = !colorBlind.checked;
      toggleColorBlind();
      ariaCheck(colorBlind);
    }
  }
});

/**
 * toggles tooltip appearing when hovering over color balls.
 */
function toggleColorBlind() {
  if (!colorBlind.checked) {
    document.querySelectorAll(".tooltip-text-ball").forEach(ball => {
      ball.classList.add("vis-hidden");
    });
  } else {
    document.querySelectorAll(".tooltip-text-ball").forEach(ball => {
      ball.classList.remove("vis-hidden");
    });
  }
}
//#endregion
// end of colorblind

//! audio settings
//#region [purple]
const audio = document.getElementById("audio");
const audioCheckmark = audio.nextElementSibling;
// aria control for click
audio.addEventListener("click", () => {
  // toggleAudio();
  ariaCheck(audio);
});
audioCheckmark.addEventListener("click", () => {
  audio.checked = !audio.checked;
  // toggleAudio();
  ariaCheck(audio);
});
// prevent space scroll
audioCheckmark.addEventListener("keydown", (keyed) => {
  if (keyed.key === " ") {
    keyed.preventDefault();
  }
});
// keyboard
audioCheckmark.addEventListener("keyup", (keyed) => {
  if (!audio.disabled) {
    if (keyed.key === "Enter") {
      audio.checked = !audio.checked;
      // toggleAudio();
      ariaCheck(audio);
    } else if (keyed.key === " ") {
      audio.checked = !audio.checked;
      // toggleAudio();
      ariaCheck(audio);
    }
  }
});

/**
 * check state of audio checkbox
 * @returns boolean
 */
function toggleAudio() {
  return audio.checked;
}

const audioFile = {
  add: new Audio("assets/audio/add-click.mp3"),
  remove: new Audio("assets/audio/remove-click.mp3"),
  reveal: new Audio("assets/audio/reveal.mp3"),
  chicken: new Audio("assets/audio/chicken.mp3"),
  win: new Audio("assets/audio/win.mp3"),
  lose: new Audio("assets/audio/lose.mp3"),
  error: new Audio("assets/audio/error.mp3"),
  setup: new Audio("assets/audio/setup.mp3"),
  check: new Audio("assets/audio/check.mp3"),
};
//#endregion
// end of audio

/**
 * checks the state of the checkbox and alters aria-checked
 * and aria-disabled accordingly
 * @param {*} checkbox checkbox element to have **.checked** tested for true/false
 */
function ariaCheck(checkbox) {
  if (checkbox.checked) {
    checkbox.nextElementSibling.setAttribute("aria-checked", "true");
  } else {
    checkbox.nextElementSibling.setAttribute("aria-checked", "false");
  }
  if (checkbox.disabled) {
    checkbox.nextElementSibling.setAttribute("aria-disabled", "true");
  } else {
    checkbox.nextElementSibling.setAttribute("aria-disabled", "false");
  }
}

//! timer variables and functions
//#region [purple]
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
let secondsTime = 0;
let minutesTime = 0;
const bestSeconds = document.getElementById("best-seconds");
const bestMinutes = document.getElementById("best-minutes");
let intervalCount;
const hiddenTime = document.getElementsByClassName("current")[0].getElementsByClassName("hidden-value")[0];
const hiddenBestTime = document.getElementsByClassName("best time")[0].getElementsByClassName("hidden-value")[0];

/** runs a second and minute time that stops at 59:59 */
function timer() {
  intervalCount = setInterval(function () {
    secondsTime++;
    seconds.textContent = (("0" + secondsTime).slice(-2)).toString();
    minutes.textContent = (("0" + minutesTime).slice(-2)).toString();
    if (secondsTime === 60) {
      secondsTime = 0;
      seconds.textContent = (("0" + secondsTime).slice(-2)).toString();
      minutesTime++;
      minutes.textContent = (("0" + minutesTime).slice(-2)).toString();
    }
    if ((secondsTime === 59) && (minutesTime === 59)) {
      clearInterval(intervalCount);
    }
    if (minutesTime === 1) {
      if (secondsTime === 1) {
        hiddenTime.textContent = `current time: ${minutesTime} minute and ${secondsTime} second`;
      } else {
        hiddenTime.textContent = `current time: ${minutesTime} minute and ${secondsTime} seconds`;
      }
    } else {
      if (secondsTime === 1) {
        hiddenTime.textContent = `current time: ${minutesTime} minutes and ${secondsTime} second`;
      } else {
        hiddenTime.textContent = `current time: ${minutesTime} minutes and ${secondsTime} seconds`;
      }
    }
  }, 1000);
}
//#endregion
// end of timer

//! settings
//#region [green]
//gameplay settings
const calculatedColors = document.getElementById("number-of-colors");
const calculatedBalls = document.getElementById("number-in-solution");
let numOfColors = Number(calculatedColors.value);
let numOfBalls = Number(calculatedBalls.value);

//gameplay checkboxes
const solutionRepeatCheck = document.getElementById("repeat-in-solution");
const guessRepeatCheck = document.getElementById("repeat-in-guess");

//timer/score checkbox settings
const currentTimeCheck = document.getElementById("current-time");
const bestTimeCheck = document.getElementById("best-time");
const bestScoreCheck = document.getElementById("best-score");

//array to hold current gameplay setting values
let settingsHolder = [calculatedColors.value,
  calculatedBalls.value,
  solutionRepeatCheck.checked,
  guessRepeatCheck.checked
];

const settingsActivator = document.getElementById("settings-activator");

//! settings overlay
solutionRepeatCheck.addEventListener("click", checkRepeatState);

/** - check values of colors and balls, disable/check checkboxes as needed.
 *  - check state of checkboxes and disable/check guessRepeatCheck as needed.
 */
function checkRepeatState() {
  numOfColors = Number(calculatedColors.value);
  numOfBalls = Number(calculatedBalls.value);
  if (numOfBalls > numOfColors) {
    solutionRepeatCheck.checked = true;
    solutionRepeatCheck.disabled = true;
    guessRepeatCheck.checked = true;
    guessRepeatCheck.disabled = true;
    ariaCheck(solutionRepeatCheck);
    ariaCheck(guessRepeatCheck);
  } else {
    solutionRepeatCheck.disabled = false;
    ariaCheck(solutionRepeatCheck);
  }

  if (!solutionRepeatCheck.checked) {
    guessRepeatCheck.disabled = false;
    ariaCheck(guessRepeatCheck);
  } else {
    guessRepeatCheck.disabled = true;
    guessRepeatCheck.checked = true;
    ariaCheck(guessRepeatCheck);
  }
}

const gameBoard = document.getElementById("game-board");
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
    settingsActivator.style.color = "#fffce8";
    checkRepeatState();
    scoreTimerOptionsCheck();
    gameBoard.style.visibility = "visible";
    globalSettings.style.visibility = "visible";
    settingsOverlay.style.visibility = "hidden";
    settingsActivator.setAttribute("aria-expanded", "false");
    timer();
  } else {
    clearActiveSelect();
    showSettings();
    gameBoard.style.visibility = "hidden";
    globalSettings.style.visibility = "hidden";
    settingsActivator.setAttribute("aria-expanded", "true");
    settingsActivator.style.color = "#6bdce9";
  }
}

/** check status of score/timer check boxes in settings overlay
 * - hide/show elements as selected
 */
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

//?is it preferable to change the values inside the array and have the array as a const?
//* eg. settingsHolder[0] = calculatedColors.value
/** store gameplay setting values to update settings overlay */
function storeNewSettings() {
  settingsHolder = [calculatedColors.value,
    calculatedBalls.value,
    solutionRepeatCheck.checked,
    guessRepeatCheck.checked
  ];
}

/** show settings overlay and enable functionality. pause timer */
function showSettings() {
  gameBoard.style.visibility = "hidden";
  globalSettings.style.visibility = "hidden";
  settingsOverlay.style.visibility = "visible";
  clearInterval(intervalCount);
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", playGame);
}

/** prevent clicking on label or number to prevent manual input.
 * - *tab index also disabled in HTML*
 */
function disableClickNumberInputs() {
  document.querySelectorAll("input[type=number]").forEach(item => {
    item.addEventListener("mousedown", preventNorm);
  });
  document.querySelectorAll(".prevent-click").forEach(item => {
    item.addEventListener("click", preventNorm);
  });

  function preventNorm(event) {
    event.preventDefault();
  }
}

/** allow +/- buttons to change numeric values */
function plusminus() {
  const minusButtons = document.getElementsByClassName("minus");
  const plusButtons = document.getElementsByClassName("plus");

  for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener("click", plusValue);
  }

  /** - increase value if below maximum value
   * - check number values and alter check boxes if necessary
   */
  function plusValue(event) {
    event.preventDefault();
    let num = event.currentTarget.previousElementSibling;
    if (Number(num.value) < Number(num.max)) {
      String(Number(num.value++));
    } else {
      alert("Sorry, you can't go any higher!");
    }
    checkRepeatState();
  }

  for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener("click", minusValue);
  }

  /** - decrease value if above minimum
   * - check number values and alter check boxes if necessary
   */
  function minusValue(event) {
    event.preventDefault();
    let num = event.currentTarget.nextElementSibling;
    if (Number(num.value) > Number(num.min)) {
      String(Number(num.value--));
    } else {
      alert("Sorry, you can't go any lower!");
    }
    checkRepeatState();
  }
}
//#endregion
//end of settings

/** - hide settings overlay and run the main game script 
 * - if settings changed, reset best score and time to "--"
 */
function playGame(event) {
  event.preventDefault();
  //reset best score and best time if settings changed for game
  if ((settingsHolder[0] !== calculatedColors.value) ||
    (settingsHolder[1] !== calculatedBalls.value) ||
    (settingsHolder[2] !== solutionRepeatCheck.checked) ||
    (settingsHolder[3] !== guessRepeatCheck.checked)) {
    bestScoreHTML.textContent = "--";
    bestScore = 0;
    bestSeconds.textContent = "--";
    bestMinutes.textContent = "--";
  }
  storeNewSettings();
  gameBoard.style.visibility = "visible";
  globalSettings.style.visibility = "visible";
  settingsOverlay.style.visibility = "hidden";
  settingsActivator.style.color = "#fffce8";
  reset();
}

//! main game functions
//#region [main]
/** reset timer to 0 */
function resetTime() {
  secondsTime = 0;
  minutesTime = 0;
}

//! gameplay variables
const colors = ["red",
  "green",
  "blue",
  "yellow",
  "pink",
  "purple",
  "aqua",
  "lime",
  "black",
  "white",
  "silver",
  "orange"
];
let availableColors;
const colorSelectors = document.getElementsByClassName("selector");
const colorSelectBox = document.getElementById("selector-box");
const clearSelector = document.getElementById("clear-selector");
const guessRowBallsArray = document.getElementsByClassName("selection ball-spacing");
const solutionRow = document.getElementById("solution");
const guessRows = document.getElementsByClassName("guess");
let solutionBallHolders = solutionRow.getElementsByClassName("tooltip-holder");
let solutionBalls = [];
const solutionCover = document.getElementById("solution-cover");
const resultPegs = document.getElementsByClassName("result");
let solution = [];
let solutionHolder;
let individualBalls;

const colorBalls = document.getElementsByClassName("color-ball");
const pegs = document.getElementsByClassName("peg");

let gameEnd = false;

//! setup functions
/** set number of balls in guess rows to equal settings value */
function setBallCount() {
  for (let i = 0; i < guessRowBallsArray.length; i++) {
    while (guessRowBallsArray[i].children.length < numOfBalls) {
      const newBall = document.createElement("div");
      newBall.classList.add("tooltip-holder");
      newBall.innerHTML = `
        <span class="tooltip-text-ball" aria-hidden="true">empty</span>
        <button class="color-ball" disabled>
          <span class="hidden-aria-text">empty ball</span>
        </button>
      `;
      guessRowBallsArray[i].appendChild(newBall);
    }
  }
}

/** set number of balls in solution row to equal settings value */
function setSolutionBallCount() {
  while (solutionBallHolders.length < numOfBalls) {
    const newBall = document.createElement("div");
    newBall.classList.add("tooltip-holder");
    newBall.innerHTML = `
    <span class="tooltip-text-ball" aria-hidden="true">hidden</span>
    <div class="color-ball">
      <span class="hidden-aria-text">hidden ball</span>
    </div>
    `;
    solutionRow.appendChild(newBall);
  }
  createSolutionBallsArray();
}

/** sets solutionBalls array to current number of balls */
function createSolutionBallsArray() {
  while (solutionBalls.length > 0) {
    solutionBalls.pop();
  }
  for (let solutionBallHolder of solutionBallHolders) {
    solutionBalls.push(solutionBallHolder.children[1]);
  }
}

/** set number of pegs displayed to equal number of balls */
function setPegCount() {
  for (let i = 0; i < resultPegs.length; i++) {
    while (resultPegs[i].children.length < numOfBalls) {
      const newPeg = document.createElement("div");
      newPeg.classList.add("peg");
      resultPegs[i].appendChild(newPeg);
    }
  }
}

/** add new div.color-ball.selector to selector
 * box for each color in colors array */
function addColorSelectors() {
  while (colorSelectors.length < numOfColors) {
    const newColorSelector = document.createElement("div");
    newColorSelector.classList.add("tooltip-holder");
    newColorSelector.innerHTML = `
      <span class="tooltip-text-ball" aria-hidden="true">empty</span>
      <button class="color-ball selector">
        <span class="hidden-aria-text">empty selector</span>
      </button>
    `;
    colorSelectBox.appendChild(newColorSelector);
  }
}

/** add **clearSelection()** eventlistener
 * to top selector ball/text (separate from colors) */
function addClearSelection() {
  document.getElementById("clear-selector").children[0].addEventListener("click", clearSelection);
  document.getElementById("clear-selector").children[1].addEventListener("click", clearSelection);
}

/** remove child elements
 * - ensure layout and gameplay matches settings selections
 */
function removeChildren() {
  while (colorSelectors.length > 0) {
    colorSelectBox.removeChild(colorSelectBox.lastChild);
  }
  for (let i = 0; i < guessRowBallsArray.length; i++) {
    while (guessRowBallsArray[i].children.length > 0) {
      guessRowBallsArray[i].removeChild(guessRowBallsArray[i].lastChild);
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

/** set available colors to array equal number of colors chosen in settings */
function setAvailableColors() {
  availableColors = colors.slice(0, numOfColors);
}

/** set solution to random array of availableColors */
function setSolution() {
  for (let i = 0; i < numOfBalls; i++) {
    const newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    solution.push(newColor);
    if (!solutionRepeatCheck.checked) {
      const colorDelete = availableColors.indexOf(newColor);
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
    colorSelectors[i].style.backgroundColor = colors[i];
    colorSelectors[i].children[0].textContent = colors[i] + " selector";
    colorSelectors[i].previousElementSibling.textContent = colors[i];
  }
}

// todo update when taptarget style done for 4 balls
/** shrink balls if set to 6 in solution */
function resizeBalls() {
  let sizeBalls = gameBoard.querySelectorAll(".color-ball");
  switch (numOfBalls) {
    case 6:
      for (let i = 0; i < sizeBalls.length; i++) {
        sizeBalls[i].style.transform = "scale(.9)";
      }
      break;
    default:
      for (let i = 0; i < sizeBalls.length; i++) {
        sizeBalls[i].style.transform = "scale(1)";
      }
  }
}

//! gameplay functions
let aR; //activeRow number
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
let activeResultIcon;
const giveUpIcon = document.getElementById("give-up");
const hintIcon = document.getElementById("hint");
let colorSelected;
const message = document.getElementById("message");

/** activates the next row
 * - set current color array to blank values 
 * - set row as active to allow interaction
 * - activate balls within row
 * - color row number border
 * - set active row pegs to active
 * - enable check result function
 * - increment score
 */
function activateRow() {
  setCurrentColorArrayBlank();

  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.removeAttribute("aria-hidden");
  activeRow.classList.add("active-row");

  activeBalls = activeRow.getElementsByClassName("color-ball");
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.add("active-balls", "empty");
    activeBalls[i].addEventListener("click", rowColorSelector);
    activeBalls[i].removeAttribute("disabled");
    addTabIndex(activeBalls[i]);
  }

  activeRow.children[0].style.borderColor = "#36b9d3";
  activeResultIcon = activeRow.getElementsByClassName("check-result")[0];
  activePegs = activeRow.getElementsByClassName("peg");
  activeResultIcon.addEventListener("click", checkResult);
  if (!activeResultIcon.classList.contains("key-assigned")) {
    activeResultIcon.classList.add("key-assigned");
    activeResultIcon.addEventListener("keyup", function (keyed) {
      if (keyed.key === "Enter" || keyed.key === " ") {
        checkResult();
      }
    });
  }
  score++;
}

/** deactivate row
 * - clear active selection ball border and selector box
 * - set row number border to normal
 * - remove eventlisteners from balls
 * - remove tab index from balls
 * - hide result check icon
 */
function deactivateRow() {
  clearActiveSelect();
  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.children[0].style.borderColor = "#fffce8";
  activeRow.classList.add("completed-row");
  activeRow.classList.remove("active-row");
  for (let i = 0; i < activeBalls.length; i++) {
    let aBi = activeBalls[i];
    aBi.removeEventListener("click", rowColorSelector);
    aBi.classList.add("color-set");
    aBi.children[0].textContent = `${aBi.children[0].innerText} disabled`;
    aBi.classList.remove("active-balls");
  }
  hideResultCheck();
}

/** continue with next row. if no row exists, create one.
 * - set peg colors to blank array
 * - deactivate current row
 * - increment aR number
 * - add row if needed
 * - extremeLoss if 99 rows present
 */
function nextRow() {
  pegColors = [];
  deactivateRow();
  aR++;
  if (guessRows.length > 98) {
    extremeLoss();
  } else if (aR < guessRows.length) {
    activateRow();
  } else {
    addRow();
    activateRow();
  }
}

//! delete before deployment
/** for testing
 * * testAddRows();
 * * aR = 97;
 * - complete first row (number border will remain)
 * - complete last row (99)
 */
function testAddRows() {
  while (guessRows.length < 98) {
    addRow();
  }
}

/** create new guess row with current settings */
function addRow() {
  const newRowNumber = guessRows.length + 1;
  const newRow = document.createElement("div");
  newRow.classList.add("row", "guess");
  newRow.innerHTML = `
    <div class="number text-center">
      ${newRowNumber}
    </div>
    <div class="selection ball-spacing">
    </div>
    <div class="result-holder hidden-aria-text">
      <span class="result-text">result: empty</span>
      <div class="result">
      </div>
      <div class="check-result">
        <img src="assets/images/search-tick.png" alt="check result" role="button" class="vis-hidden">
      </div>
    </div>
  `;
  gameBoard.appendChild(newRow);
  setBallCount();
  setPegCount();
  toggleColorBlind(); //needed to prevent tooltips showing if !colorBlind
}

/** enable color selection of row ball
 * - remove border from previously selected ball
 * - display selector box and add tab index
 * - display *clear* option if ball is colored
 * - give selected ball a border and shadow
 */
function rowColorSelector(event) {
  if (activeSelection !== "inactive") {
    activeSelection.style.boxShadow = "none";
    activeSelection.style.border = "none";
    activeSelection.classList.remove("active-row-selector");
  }
  colorSelectBox.style.visibility = "visible";
  message.style.visibility = "hidden";
  for (i = 0; i < colorSelectors.length; i++) {
    addTabIndex(colorSelectors[i]);
  }
  activeSelection = event.target;
  if ((activeSelection.style.backgroundColor === "rgb(133, 78, 30)") ||
    (activeSelection.style.backgroundColor === "")) {
    clearSelector.style.visibility = "hidden";
    if (event instanceof PointerEvent) {
      if (event.pointerType !== "mouse" &&
      event.pointerType !== "touch") {
        colorSelectors[0].focus();
      }
    }
  } else {
    clearSelector.style.visibility = "visible";
    addTabIndex(clearSelector.children[0]);
    if (event instanceof PointerEvent) {
      if (event.pointerType !== "mouse" &&
      event.pointerType !== "touch") {
        clearSelector.children[0].focus();
      }
    }
  }
  activeSelection.style.border = ".2rem solid #fffce8";
  activeSelection.style.boxShadow = ".1rem .1rem .2rem #022b3a, .2rem 0 .2rem #022b3a, 0 .05rem .2rem #022b3a";
  activeSelection.classList.add("active-row-selector");
}

/** delete guess color array values.
 * create blank values to equal number of balls
 */
function setCurrentColorArrayBlank() {
  currentGuessColors = [];
  for (let i = 0; i < calculatedBalls.value; i++) {
    currentGuessColors.push("");
  }
}

/** set color of selected ball and then close selector box
 * - *includes logic check for repeat settings*
 * - display check result icon if all balls colored
 */
function colorSelect(event) {
  let keyUser = false;
  if (event instanceof PointerEvent) {
    if (event.pointerType !== "mouse" &&
    event.pointerType !== "touch") {
      keyUser = true;
    }
  }
  /* reference index value to maintain position of colors
  from active row in currentGuessColors array*/
  getActiveIndex();
  colorSelected = event.target.style.backgroundColor;
  if (!guessRepeatCheck.checked) {
    /* check color has not already been selected and 
    the activeSelection ball is not already the intended color */
    if ((currentGuessColors.includes(colorSelected)) &&
      (activeIndex !== currentGuessColors.indexOf(colorSelected))) {
      if (toggleAudio()) {
        audioFile.error.play();
      }
      alert("Your chosen settings do not allow you to repeat colours, please pick another.");
    } else {
      currentGuessColors[activeIndex] = colorSelected; //replace array value to prevent repeat color
      activeSelection.style.backgroundColor = colorSelected;
      if (toggleAudio()) {
        audioFile.add.play();
      }
      activeSelection.classList.remove("empty", "active-row-selector");
      activeSelection.parentNode.children[0].textContent = colorSelected;
      activeSelection.children[0].textContent = colorSelected + " ball";
      if (keyUser) {
        activeBalls[0].focus();
      }
      clearActiveSelect();
    }
  } else {
    activeSelection.style.backgroundColor = colorSelected;
    if (toggleAudio()) {
      audioFile.add.play();
    }
    activeSelection.classList.remove("empty", "active-row-selector");
    activeSelection.parentNode.children[0].textContent = colorSelected;
    activeSelection.children[0].textContent = colorSelected + " ball";
    if (keyUser) {
      activeBalls[0].focus();
    }
    clearActiveSelect();
  }
  activeBallsEmpty();
  if (!emptyBalls) {
    showResultCheck();
  } else {
    hideResultCheck();
  }
}

/** clear color from active selection, add .empty, close selectBox and remove border */
function clearSelection(event) {
  let keyUser = false;
  if (event instanceof PointerEvent) {
    if (event.pointerType !== "mouse" &&
    event.pointerType !== "touch") {
      keyUser = true;
    }
  }
  if (!guessRepeatCheck.checked) {
    getActiveIndex();
    currentGuessColors[activeIndex] = "";
  }
  activeSelection.style.backgroundColor = "rgb(133, 78, 30)";
  if (toggleAudio()) {
    audioFile.remove.play();
  }
  activeSelection.classList.remove("active-row-selector");
  activeSelection.parentNode.children[0].textContent = "empty";
  activeSelection.children[0].textContent = "empty ball";
  activeSelection.classList.add("empty");
  if (keyUser) {
    activeBalls[0].focus();
  }
  clearActiveSelect();
  activeBallsEmpty();
  hideResultCheck();
}

/** - remove border from active selection
 * - hide selector box
 */
function clearActiveSelect() {
  message.style.visibility = "visible";
  colorSelectBox.style.visibility = "hidden";
  clearSelector.style.visibility = "hidden";
  if (activeSelection !== "inactive") {
    activeSelection.style.border = "none";
    activeSelection.style.boxShadow = "none";
    activeSelection = "inactive";
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

/** display result icon to allow checking result */
function showResultCheck() {
  activeResultIcon.style.transform = "translateX(-50%) scale(1)";
  activeResultIcon.children[0].setAttribute("aria-hidden", "false");
  activeResultIcon.children[0].classList.remove("vis-hidden");
  addTabIndex(activeResultIcon);
}

/** hide result icon */
function hideResultCheck() {
  activeResultIcon.style.transform = "translateX(-50%) scale(0)";
  activeResultIcon.children[0].setAttribute("aria-hidden", "true");
  activeResultIcon.children[0].classList.add("vis-hidden");
  removeTabIndex(activeResultIcon);
}

/** check for .empty in any ball in activeRow.
 * @boolean **emptyBalls**
 */
function activeBallsEmpty() {
  const emptyHolder = [];
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

//! result functions
/** check result of input colors */
function checkResult() {
  if (toggleAudio()) {
    audioFile.check.play();
  }
  solutionHolder = solution.slice();

  clearActiveSelect();

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
    message.textContent = "Well done!";
    setTimeout(winner, 500);
    giveUpIcon.removeEventListener("click", giveUp);
    hintIcon.removeEventListener("click", hint);
  } else {
    nextRow();
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
      const removal = solution.indexOf(activeBalls[i].style.backgroundColor);
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
  const resultText = activeRow.getElementsByClassName("result-text")[0];
  let blackPegs = 0;
  let whitePegs = 0;
  for (const peg of pegColors) {
    switch (peg) {
      case "black":
        blackPegs++;
        break;
      case "white":
        whitePegs++;
        break;
      default:
        // do nothing
    }
  }

  let blackPegsWord = blackPegs === 1 ? "peg" : "pegs";
  let whitePegsWord = whitePegs === 1 ? "peg" : "pegs";

  if (blackPegs !== 0 && whitePegs === 0) {
    resultText.textContent = `result: ${blackPegs} black ${blackPegsWord}`;
  } else if (blackPegs === 0 && whitePegs !== 0) {
    resultText.textContent = `result: ${whitePegs} white ${whitePegsWord}`;
  } else if (blackPegs !== 0 && whitePegs !== 0) {
    resultText.textContent = `result: ${blackPegs} black ${blackPegsWord} and ${whitePegs} white ${whitePegsWord}`;
  } else {
    resultText.textContent = "result: no pegs";
  }
}

//! win/lose checks
let win;
const bestScoreHTML = document.getElementsByClassName("best score")[0].getElementsByTagName("p")[0];

/**
 * checks for win condition
 * - win = all black pegs? true : false
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
  setTimeout(solutionCover.style.width = "0", 150);
}

/** set color of solution balls to solution array values */
function setSolutionBalls() {
  for (let i = 0; i < solutionHolder.length; i++) {
    solutionBalls[i].style.backgroundColor = solutionHolder[i];
    solutionBalls[i].children[0].textContent = solutionHolder[i] + " ball";
    solutionBalls[i].previousElementSibling.textContent = solutionHolder[i];
  }
}

const hiddenScoreText = document.getElementById("best-score-value");
/** check if best score has been set
 * - if it is larger than the current winning
 * score : change the displayed number to the best score
 */
function checkScore() {
  if (bestScore > score || bestScore === 0) {
    bestScore = score.toString();
    bestScoreHTML.textContent = `${bestScore}`;
    hiddenScoreText.textContent = `best score: ${bestScore}`;
  }
}

/** check current completion time against best time
 * - if quicker : replace best time
 */
function checkTime() {
  const testSeconds = Number(bestSeconds.textContent);
  const testMinutes = Number(bestMinutes.textContent);
  const calculatedCurrentTime = minutesTime * 60 + secondsTime;
  const calculatedBestTime = testMinutes * 60 + testSeconds;
  if ((calculatedCurrentTime < calculatedBestTime) || (bestSeconds.textContent === "--")) {
    bestSeconds.textContent = (("0" + secondsTime).slice(-2)).toString();
    bestMinutes.textContent = (("0" + minutesTime).slice(-2)).toString();
  }
  if (bestSeconds.textContent === "--") {
    hiddenBestTime.textContent = `best time: unset`;
  } else if (bestMinutes.textContent === "01") {
    if (bestSeconds.textContent === "01") {
      hiddenBestTime.textContent = `best time: ${Number(bestMinutes.textContent)} minute and ${Number(bestSeconds.textContent)} second`;
    } else {
      hiddenBestTime.textContent = `best time: ${Number(bestMinutes.textContent)} minute and ${Number(bestSeconds.textContent)} seconds`;
    }
  } else {
    if (bestSeconds.textContent === "01") {
      hiddenBestTime.textContent = `best time: ${Number(bestMinutes.textContent)} minutes and ${Number(bestSeconds.textContent)} second`;
    } else {
      hiddenBestTime.textContent = `best time: ${Number(bestMinutes.textContent)} minutes and ${Number(bestSeconds.textContent)} seconds`;
    }
  }
}

/** pop up win message. confirm with option to replay */
function winner() {
  removeTabIndex(giveUpIcon);
  removeTabIndex(hintIcon);
  let winnerMessage;
  let hintWord;
  if (hintCount === 1) {
    hintWord = "hint";
  } else {
    hintWord = "hints";
  }
  if (score > 1) {
    winnerMessage = `You took ${score} attempts and used ${hintCount} ${hintWord}.
You were successful in a time of ${minutes.textContent}:${seconds.textContent}`;
  } else if (score === 1) {
    winnerMessage = `You took ${score} attempt and used ${hintCount} ${hintWord}.
You were successful in a time of ${minutes.textContent}:${seconds.textContent}`;
  }
  if (toggleAudio()) {
    audioFile.win.play();
  }
  if (confirm(`Congratulations, you won!
${winnerMessage}
Would you like to play again?`)) {
    reset();
  }
}

//! giveup and hint functions
/** confirm popup to  give up
 * - if true : lose the game */
function giveUp() {
  if (toggleAudio()) {
    audioFile.chicken.play();
  }
  setTimeout(giveUpCheck, 100);
}

function giveUpCheck() {
  if (confirm("Do you really want to give up?")) {
    solutionHolder = solution.slice();
    ballReveal();
    message.textContent = "Oh dear!";
    clearInterval(intervalCount);
    deactivateRow();
    setTimeout(loser, 750);
  }
}

/** confirm popup about loss
 * - if true : replay */
function loser() {
  giveUpIcon.removeEventListener("click", giveUp);
  hintIcon.removeEventListener("click", hint);
  removeTabIndex(giveUpIcon);
  removeTabIndex(hintIcon);
  let loserMessage;
  if (score - 1 > 1) {
    loserMessage = `Unlucky, you lost!
You had ${(score -1)} attempts in ${minutes.textContent}:${seconds.textContent}
Would you like to play again?`;
  } else if (score - 1 === 1) {
    loserMessage = `Unlucky, you lost!
You had ${(score -1)} attempt in ${minutes.textContent}:${seconds.textContent}
Would you like to play again?`;
  } else {
    loserMessage = `Unlucky, you lost!
You didn't even have a go!
Would you like to play again?`;
  }
  if (toggleAudio()) {
    audioFile.lose.play();
  }
  if (confirm(`${loserMessage}`)) {
    reset();
  }
}

/** row limit of 99 reached, alert extreme loss */
function extremeLoss() {
  giveUpIcon.removeEventListener("click", giveUp);
  hintIcon.removeEventListener("click", hint);
  const extremeMessage = `Wow, that is serious dedication!
I'm afraid you can't have any more guesses,
perhaps you should try again?`;
  if (toggleAudio()) {
    audioFile.lose.play();
  }
  if (confirm(`${extremeMessage}`)) {
    reset();
  }
}

let widthReducer;
let currentWidth;
let hintCount;
/** use numOfBalls to calculate width reduction size */
function calculateWidthReducer() {
  switch (numOfBalls) {
    case 3:
      widthReducer = 22.5;
      break;
    case 4:
      widthReducer = 16.875;
      break;
    case 5:
      widthReducer = 13.5;
      break;
    case 6:
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
      if (toggleAudio()) {
        audioFile.reveal.play();
      }
      currentWidth = currentWidth - widthReducer;
    } else {
      alert("You cannot reveal the last ball. Maybe you should just give up!");
    }
  }
}

/** set the background color of the next ball to be revealed*/
function addOneSolutionColor() {
  const solutionIndex = solutionBalls.length - hintCount;
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
  resizeBalls();
  if (toggleAudio()) {
    audioFile.setup.play();
  }
  timer();
  activateRow();
  giveUpIcon.addEventListener("click", giveUp);
  hintIcon.addEventListener("click", hint);
  addTabIndex(giveUpIcon);
  addTabIndex(hintIcon);
  toggleColorBlind();
}

/** reset game board and values and run game */
function reset() {
  win = false;
  clearInterval(intervalCount);
  clearActiveSelect();
  solution = [];
  for (let i = 0; i < colorBalls.length; i++) {
    colorBalls[i].style.backgroundColor = "#854e1e";
  }
  for (let i = 0; i < pegs.length; i++) {
    pegs[i].style.backgroundColor = "#a0622c";
  }
  if ((aR !== (0 || undefined)) && (aR < 98)) {
    deactivateRow();
  }
  resetAria();
  aR = 0;
  pegColors = [];
  solutionCover.style.width = "67.5%";
  currentWidth = 67.5;
  hintCount = 0;
  score = 0;
  message.textContent = "Good luck!";
  resetTime();
  removeRows();
  runGame();
}
//#endregion
// end of main

handleChange();
resetTime();
plusminus();
disableClickNumberInputs();
reset();

//! aria
//#region [red]
function addTabIndex(elem) {
  elem.setAttribute("tabindex", "0");
}

function removeTabIndex(elem) {
  elem.removeAttribute("tabindex");
}

// display settings menu with "Enter" key
settingsActivator.addEventListener("keyup", (keyed) => {
  if (keyed.key === "Enter") {
    settingsState();
    document.getElementsByClassName("minus")[0].focus();
  }
});

// checkmark controls
let settingsCheckmarks = settingsOverlay.getElementsByClassName("checkmark");
for (let i = 0; i < settingsCheckmarks.length; i++) {
  const checkbox = settingsCheckmarks[i].previousElementSibling;
  checkbox.addEventListener("click", () => {
    ariaCheck(checkbox);
  });
  // aria control for click
  settingsCheckmarks[i].addEventListener("click", () => {
    settingsCheckmarks[i].previousElementSibling.checked = !checkbox.checked;
    checkRepeatState();
    ariaCheck(checkbox);
  });
  // prevent space scroll
  settingsCheckmarks[i].addEventListener("keydown", (keyed) => {
    if (keyed.key === " ") {
      keyed.preventDefault();
    }
  });
  // keyboard
  settingsCheckmarks[i].addEventListener("keyup", (keyed) => {
    if (!checkbox.disabled) {
      if (keyed.key === "Enter") {
        checkbox.checked = !checkbox.checked;
        checkRepeatState();
        ariaCheck(checkbox);
      } else if (keyed.key === " ") {
        settingsCheckmarks[i].previousElementSibling.checked = !checkbox.checked;
        checkRepeatState();
        ariaCheck(checkbox);
      }
    }
  });
}

// close setting with "Escape" key
window.addEventListener("keyup", function (keyed) {
  if (keyed.key === "Escape") {
    if (settingsOverlay.style.visibility === "visible") {
      calculatedColors.value = settingsHolder[0];
      calculatedBalls.value = settingsHolder[1];
      solutionRepeatCheck.checked = settingsHolder[2];
      guessRepeatCheck.checked = settingsHolder[3];
      settingsActivator.style.color = "#fffce8";
      checkRepeatState();
      scoreTimerOptionsCheck();
      gameBoard.style.visibility = "visible";
      globalSettings.style.visibility = "visible";
      settingsOverlay.style.visibility = "hidden";
      timer();
      settingsActivator.focus();
    }
  }
});

// close colorSelectBox with "Escape" key
colorSelectBox.addEventListener("keyup", function (keyed) {
  if (keyed.key === "Escape") {
    activeBalls[0].focus();
    clearActiveSelect();
  }
});

/**
 * reset hidden text, results and colorblind text elements. set rows to
 * aria-hidden
 */
function resetAria() {
  const rows = document.getElementsByClassName("guess");
  for (const row of rows) {
    row.setAttribute("aria-hidden", "true");
    row.classList.remove("completed-row");
  }
  const balls = document.querySelectorAll(".tooltip-text-ball");
  for (const ball of balls) {
    ball.textContent = "empty";
  }
  const resultText = document.getElementsByClassName("result-text");
  for (const text of resultText) {
    text.textContent = "result: empty";
  }
  for (const ball of solutionBalls) {
    ball.children[0].textContent = "hidden ball";
    ball.previousElementSibling.textContent = "hidden";
  }
  const colorSetBalls = document.getElementsByClassName("color-set");
  while (colorSetBalls.length > 1) {
    for (let ball of colorSetBalls) {
      ball.classList.remove("color-set");
      ball.children[0].textContent = "empty ball";
    }
  }
}
//#endregion
//end of aria
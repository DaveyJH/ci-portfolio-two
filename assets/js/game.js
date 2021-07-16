// for functions/code that is not commented, see ./challenge.js
// many functions are similar and so duplicate comments have been removed for readability

window.addEventListener("resize", handleChange);
let settingsOverlay = document.getElementById("settings");
/** ensure settings overlay sits below header */
function handleChange() {
  let headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
  let settingsSpacerHeight = headerHeight / 15.185185;
  settingsSpacer = (settingsSpacerHeight + "rem");
  document.getElementById("settings").style.top = settingsSpacer;
}

handleChange();

let solutionRepeatCheck = document.getElementById("repeat-in-solution");
let guessRepeatCheck = document.getElementById("repeat-in-guess");

// default game settings
let numOfColors = 6;
let calculatedColors = document.getElementById("number-of-colors");
let numOfBalls = 4;
let calculatedBalls = document.getElementById("number-in-solution");
let solutionRepeat = true;
let guessRepeat = true;

// default timer/score settings

let currentTimeCheck = document.getElementById("current-time");
let bestTimeCheck = document.getElementById("best-time");
let bestScoreCheck = document.getElementById("best-score");
let displayCurrentTime = true;
let displayBestTime = true;
let displayBestScore = true;

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

// ! timer variables and functions

let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let secondsTime = 0;
let minutesTime = 0;
let bestSeconds = document.getElementById("best-seconds");
let bestMinutes = document.getElementById("best-minutes");
let intervalCount;

let settingsHolder = [calculatedColors.value,
  calculatedBalls.value,
  solutionRepeatCheck.checked,
  guessRepeatCheck.checked
];

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

// ! settings overlay

let settingsActivator = document.getElementById("settings-activator");
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
    scoreTimerCheck();
    settingsOverlay.style.visibility = "hidden";
    // ! if settings closed without play clicked, reset values??
    // ? store current values and return to them on close??
    if (seconds.innerHTML !== "--") {
      timer();
    }
  } else {
    showSettings();
  }
}

/** check status of score/timer check boxes in settings overlay */
function scoreTimerCheck() {
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
    checkState();
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
    checkState();
  }
}

/** hide settings overlay and run the main game script */
function playGame(event) {
  event.preventDefault();
  storeNewSettings();
  settingsOverlay.style.visibility = "hidden";
  runMainScript();
}

function runMainScript() {

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

  // ? move to reset() ??
  resetTime();

  let colors = ["red", "green", "blue", "yellow", "pink", "purple", "aqua", "lime", "black", "white", "silver", "orange"];
  let colorSelectors = document.getElementsByClassName("selector");
  let colorSelectBox = document.getElementById("selector-box");
  let guessRows = document.getElementsByClassName("selection ball-spacing");
  let solutionRow = document.getElementById("solution");
  let resultPegs = document.getElementsByClassName("result");
  let solution = [];
  let solutionHolder;

  let colorBalls = document.getElementsByClassName("color-ball");
  let pegs = document.getElementsByClassName("peg");

  numOfColors = document.getElementById("number-of-colors").value;
  numOfBalls = document.getElementById("number-in-solution").value;

  // let currentTimeCheck = document.getElementById("current-time").checked;
  // let bestTimeCheck = document.getElementById("best-time").checked;
  // let bestScoreCheck = document.getElementById("best-score").checked;

  // ! settings functions
  // /** check status of check boxes in settings overlay */
  // function checkboxCheck() {
  //   if (!currentTimeCheck) {
  //     document.getElementsByClassName("current time")[0].style.visibility = "hidden";
  //   } else {
  //     document.getElementsByClassName("current time")[0].style.visibility = "visible";
  //   }

  //   if (!bestTimeCheck) {
  //     document.getElementsByClassName("best time")[0].style.visibility = "hidden";
  //   } else {
  //     document.getElementsByClassName("best time")[0].style.visibility = "visible";
  //   }

  //   if (!bestScoreCheck) {
  //     document.getElementsByClassName("best score")[0].style.visibility = "hidden";
  //   } else {
  //     document.getElementsByClassName("best score")[0].style.visibility = "visible";
  //   }
  // }

  // ! setup functions
  /** set number of balls in guess rows to equal settings value */
  function setBallCount() {
    for (let i = 0; i < guessRows.length; i++) {
      while (guessRows[i].children.length < numOfBalls) {
        let newBall = document.createElement("div");
        newBall.classList.add("color-ball");
        guessRows[i].appendChild(newBall);
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
    for (let i = 0; i < guessRows.length; i++) {
      while (guessRows[i].children.length > numOfBalls) {
        guessRows[i].removeChild(guessRows[i].lastChild);
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
  console.log(`Available: ${availableColors}`);

  /** set solution to random array of availableColors */
  function setSolution() {
    for (let i = 0; i < numOfBalls; i++) {
      let newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      solution.push(newColor);
    }
  }

  /** add click listener to color selectors */
  function selectorListener() {
    document.querySelectorAll(".selector").forEach(item => {
      item.addEventListener("click", colorSelect);
    });
  }

  /** set color of selector-box color balls to available colors */
  function setSelectorBalls() {
    addColorSelectors();
    selectorListener();
    for (let i = 0; i < colorSelectors.length; i++) {
      colorSelectors[i].style.backgroundColor = (colors[i]);
    }
  }

  // ! gameplay functions

  let aR;
  let activeRow;
  let activeBalls;
  let activeSelection;
  let activePegs;
  let score;
  let emptyBalls;

  /** set row as active to allow interaction */
  function activateRow() {
    activeRow = document.getElementsByClassName("guess")[aR];
    activeRow.classList.add("active-row");

    activeBalls = activeRow.children[1].children;
    for (let i = 0; i < activeBalls.length; i++) {
      activeBalls[i].classList.add("active-balls", "empty");
      activeBalls[i].addEventListener("click", colorSelector);
    }

    activeRow.children[0].style.borderColor = "#165764";
    // activeRow.children[0].addEventListener("click", checkResult);
    activePegs = activeRow.children[2].children;
    score++;
  }

  /** allows selected color-ball to be set as
   * activeSelection and enables color
   * selection. applies border to activeSelection
   */
  function colorSelector(event) {
    if (activeSelection !== undefined) {
      activeSelection.style.border = "none";
    }
    colorSelectBox.style.visibility = "visible";
    activeSelection = event.target;
    activeSelection.style.border = ".2rem solid #fffce8";
  }

  /** set color of selected ball and then close selector box
   */
  function colorSelect(event) {
    colorSelected = event.target.style.backgroundColor;
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
    if (emptyHolder.includes("empty")) {
      emptyBalls = true;
    } else {
      emptyBalls = false;
    }
  }

  function runGame() {
    scoreTimerCheck();
    removeChildren();
    setBallCount();
    setSelectorBalls();
    setPegCount();
    setSolutionBallCount();
    setSolution();
    activateRow();
    timer();
    console.log(`Solution: ${solution}`);
    console.log(colorSelectBox);
  }

  function reset() {
    clearInterval(intervalCount);
    solution = [];
    for (let i = 0; i < colorBalls.length; i++) {
      colorBalls[i].style.backgroundColor = "#854e1e";
    }
    for (let i = 0; i < pegs.length; i++) {
      pegs[i].style.backgroundColor = "#a0622c";
    }
    aR = 0;
    // pegColors = [];
    // solutionCover.style.zIndex = "1";
    score = 0;
    message.innerHTML = "Good luck!";
    runGame();
  }

  reset();
}

plusminus();
disableClickNumberInputs();
runMainScript();
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
let numOfColors = 6;
let numOfBalls = 4;
let solutionRepeat = true;
let guessRepeat = true;
// default timer/score settings
let displayCurrentTime = true;
let displayBestTime = true;
let displayBestScore = true;

let disableCheck = document.getElementById("repeat-in-solution");
disableCheck.addEventListener("click", checkState);

function checkState() {
  if (!disableCheck.checked) {
    document.getElementById("repeat-in-guess").disabled = false;
  } else {
    document.getElementById("repeat-in-guess").disabled = true;
    document.getElementById("repeat-in-guess").checked = true;
  }
}

// ! timer variables and functions

// credit to Code Institute course content for basic timer function
// modified with basic solution credit to https://stackoverflow.com/users/854246/joseph-marikle
// https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers/8043061#8043061
// first answer, which applies for positive integers only, works for this situation
// the answer combines a string with a number so extra steps have
// been taken to convert to strings and numbers where necessary

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

/* settings overlay */
let settingsActivator = document.getElementById("settings-activator");
settingsActivator.addEventListener("click", settings);

/** show or hide settings depending on current state */
function settings() {
  if (document.getElementById("settings").style.visibility === "visible") {
    document.getElementById("settings").style.visibility = "hidden";
    // ! if settings closed without play clicked, reset values??
    // ? store current values and return to them on close??
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

/** hide settings overlay and run the main game script */
function playGame(event) {
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

  let solutionRepeatCheck = document.getElementById("repeat-in-solution").checked;
  let guessRepeatCheck = document.getElementById("repeat-in-guess").checked;
  let currentTimeCheck = document.getElementById("current-time").checked;
  let bestTimeCheck = document.getElementById("best-time").checked;
  let bestScoreCheck = document.getElementById("best-score").checked;

  // ! settings functions
  /** check status of check boxes in settings overlay */
  function checkboxCheck() {
    if (!currentTimeCheck) {
      document.getElementsByClassName("current time")[0].style.visibility = "hidden";
    } else {
      document.getElementsByClassName("current time")[0].style.visibility = "visible";
    }

    if (!bestTimeCheck) {
      document.getElementsByClassName("best time")[0].style.visibility = "hidden";
    } else {
      document.getElementsByClassName("best time")[0].style.visibility = "visible";
    }

    if (!bestScoreCheck) {
      document.getElementsByClassName("best score")[0].style.visibility = "hidden";
    } else {
      document.getElementsByClassName("best score")[0].style.visibility = "visible";
    }
  }

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
    checkboxCheck();
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
// ! remove commented out solutions before submission!!!

let colors = ["red", "green", "blue", "yellow", "pink", "purple"]; // colors available for the challenge
let solution = []; // blank array for the solution
const numOfBalls = 4; // number of balls in the solution
const numOfPegs = numOfBalls; // number of pegs === number of balls
let pegColors = []; // array to store peg results

let aR = 0; // active row index number
let activeRow; // variable to store activeRow
let activeBalls; // variable to store activeBalls
let activeSelection = "inactive"; // color-ball chosen for color change
let activePegs; // activeRow result pegs
let activeNumber; // activeRow number
let activeResultIcon; // result checker

const colorSelectors = document.getElementsByClassName("selector"); // color selectors in selector-box
const colorSelectBox = document.getElementById("selector-box"); // color select box element
const clearSelector = document.getElementById("clear-selector"); // clear selection within select box
let colorSelected; // color selected from the selector box

const solutionRow = document.getElementById("solution");
const solutionText = solutionRow.getElementsByTagName("span")[0];
const solutionBalls = solutionRow.getElementsByClassName("color-ball"); // solution balls
const solutionCover = document.getElementById("solution-cover"); // solution cover panel
let solutionHolder; // none modified solution array

const colorBalls = document.getElementsByClassName("color-ball"); // all color balls
const pegs = document.getElementsByClassName("peg"); // all pegs
const message = document.getElementById("message"); // message paragraph

let win = false;

const bestScoreHTML = document.getElementsByClassName("best score")[0].getElementsByTagName("p")[0]; // bestScore to be filled in on win condition
let bestScore = 0; // record of the best score without having to get from DOM
let score = 0; // score count


// ! timer variables and functions
/* credit to Code Institute course content for basic timer function
modified with basic solution credit to https://stackoverflow.com/users/854246/joseph-marikle
https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers/8043061#8043061
first answer which applies for positive integers only which works for this situation
the answer combines a string with a number so extra steps have been taken to convert
to strings and numbers where necessary */

let intervalCount; // accessible variable
const seconds = document.getElementById("seconds"); // seconds span
const minutes = document.getElementById("minutes"); // minutes span
let secondsTime = 0; // start value
let minutesTime = 0; // start value
const bestSeconds = document.getElementById("best-seconds"); // best seconds span
const bestMinutes = document.getElementById("best-minutes"); // best minutes span
const hiddenTime = document.getElementsByClassName("current")[0].getElementsByClassName("hidden-value")[0];
const hiddenBestTime = document.getElementsByClassName("best time")[0].getElementsByClassName("hidden-value")[0];

/** runs a second and minute time that stops at 59:59 */
function timerC() {
  intervalCount = setInterval(function () {
    secondsTime++; // increment seconds by 1
    seconds.textContent = (("0" + secondsTime).slice(-2)).toString(); // display seconds as 2 digit string
    minutes.textContent = (("0" + minutesTime).slice(-2)).toString(); // display minutes as 2 digit string
    if (secondsTime === 60) { // do not display 60
      secondsTime = 0; // reset second count
      seconds.textContent = (("0" + secondsTime).slice(-2)).toString();
      minutesTime++; // increment minutes by 1
      minutes.textContent = (("0" + minutesTime).slice(-2)).toString();
    }
    if ((secondsTime === 59) && (minutesTime === 59)) { // stop timer at maximum time of 59:59
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
  }, 1000); // 1000ms = 1 second
}

/** check current completion time against best time
 * - if quicker : replace best time
 */
function checkTimeC() {
  const testSeconds = Number(bestSeconds.textContent); // convert seconds string to number
  const testMinutes = Number(bestMinutes.textContent); // convert minutes string to number
  const calculatedCurrentTime = minutesTime * 60 + secondsTime; // current time in seconds
  const calculatedBestTime = testMinutes * 60 + testSeconds; // best time in seconds
  if ((calculatedCurrentTime < calculatedBestTime) || (bestSeconds.textContent === "--")) { // check current time against best OR best is unset
    bestSeconds.textContent = (("0" + secondsTime).slice(-2)).toString(); // write bestSeconds
    bestMinutes.textContent = (("0" + minutesTime).slice(-2)).toString(); // write bestMinutes
  }
  if (bestSeconds.textContent === "--") {
    hiddenBestTime.textContent = `best time: unset`
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

/** reset timer to 0 */
function resetTimeC() {
  secondsTime = 0;
  minutesTime = 0;
}

// ! setting up the game functions
/** set color of selector-box color balls to available colors */
function setSelectorBallsC() {
  for (let i = 0; i < colorSelectors.length; i++) {
    colorSelectors[i].style.backgroundColor = (colors[i]);
    colorSelectors[i].addEventListener("click", colorSelectC);
    colorSelectors[i].children[0].textContent = colors[i] + " selector";
    colorSelectors[i].previousElementSibling.textContent = colors[i];
  }
}

/** set solution to random array of available colors */
function setSolutionC() {
  for (let i = 0; i < numOfBalls; i++) {
    let newColor = colors[Math.floor(Math.random() * colors.length)]; //select a random color
    solution.push(newColor); // add new color to solution
  }
}

/** set color of solution balls to solution array values */
function setSolutionBallsC() {
  for (let i = 0; i < solutionHolder.length; i++) {
    solutionBalls[i].style.backgroundColor = (solutionHolder[i]); // set color of solution balls
    solutionBalls[i].children[0].textContent = solutionHolder[i] + " ball";
    solutionBalls[i].previousElementSibling.textContent = solutionHolder[i];
  }
}

// add click listener to selectors
document.querySelectorAll(".selector").forEach(item => {
  item.addEventListener("click", colorSelectC);
});

// add clearSelection to top selector ball (separate from colors)
document.getElementById("clear-selector").children[0].addEventListener("click", clearSelectionC);
document.getElementById("clear-selector").children[1].addEventListener("click", clearSelectionC);

// ! gameplay functions

/** activates the next row by applying classes
 * to enable selection of colors and result checking
 */
function activateRowC() {
  // get and set .active-row
  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.removeAttribute("aria-hidden");
  activeRow.classList.add("active-row");

  // set .active-balls and .empty to color-balls in active-row
  activeBalls = activeRow.getElementsByClassName("color-ball");
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.add("active-balls", "empty");
    // add click for selecting color
    activeBalls[i].addEventListener("click", colorSelectorC);
    activeBalls[i].removeAttribute("disabled");
  }
  activeNumber = activeRow.getElementsByClassName("number")[0];
  activeNumber.style.borderColor = "#36b9d3"; // active row number border shows active row
  activeResultIcon = activeRow.getElementsByClassName("check-result")[0];
  activeResultIcon.addEventListener("click", checkResultC);
  if (!activeResultIcon.classList.contains("key-added")) {
    activeResultIcon.addEventListener("keydown", (keyed) => {
      if (keyed.key === "Enter" || keyed.key === " ") {
        activeResultIcon.classList.add("key-added");
        keyed.preventDefault();
        checkResultC();
      }
    })
  }
  activePegs = activeRow.getElementsByClassName("peg"); // active pegs in active row
  score++;
}

/** deactivate row by removing classes and click listeners */
function deactivateRowC() {
  activeNumber.style.borderColor = "#fffce8"; // border color of previous row number back to normal
  activeRow.classList.add("completed-row");
  activeRow.classList.remove("active-row");
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.remove("active-balls");
    activeBalls[i].removeEventListener("click", colorSelectorC);
    activeBalls[i].setAttribute("disabled", "true");
  }
  // activeNumber.removeEventListener("click", checkResultC);
  activeResultIcon.removeEventListener("click", checkResultC);
  hideTickResultCheckC();
  clearSelectionC();
}

/** continue with next row or report lose.
 * on lose, pause and then reset timer
 */
function nextRowC() {
  pegColors = []; // delete values from pegColors
  deactivateRowC();
  aR++; // increment active row number
  if (aR < 6) {
    activateRowC();
  } else { // if no rows remain for guesses
    ballRevealC();
    message.textContent = "Oh dear!";
    clearInterval(intervalCount);
    resetTimeC();
    setTimeout(loserC, 750); // delay popup to allow result to be displayed
  }
}

/** allows selected color-ball to be set as
 * activeSelection and enables color
 * selection
 */
function colorSelectorC(event) {
  // check if activeSelection border is already in place
  if (activeSelection !== "inactive") {
    activeSelection.style.border = "none"; // remove border from previous selected ball
    activeSelection.style.boxShadow = "none";
  }
  colorSelectBox.style.visibility = "visible"; // make selector box visibile
  activeSelection = event.target; // set activeSelection to ball that created event
  activeSelection.style.border = ".2rem solid #fffce8"; // add border for visual aid to player
  activeSelection.style.boxShadow = ".1rem .1rem .2rem #022b3a, .2rem 0 .2rem #022b3a, 0 .05rem .2rem #022b3a";
  if ((activeSelection.style.backgroundColor === "rgb(133, 78, 30)") ||
    (activeSelection.style.backgroundColor === "")) {
    clearSelector.style.visibility = "hidden";
  } else {
    clearSelector.style.visibility = "visible";
  }
}

/** clear color from active selection, add .empty, close selectBox and remove border */
function clearSelectionC() {
  if (activeSelection !== "inactive") {
    activeSelection.style.backgroundColor = "rgb(133, 78, 30)";
    activeSelection.parentNode.children[0].textContent = "empty";
    activeSelection.children[0].textContent = "empty ball";
    activeSelection.classList.add("empty");
    activeSelection.style.border = "none";
    activeSelection.style.boxShadow = "none";
  }
  clearSelector.style.visibility = "hidden";
  colorSelectBox.style.visibility = "hidden";
  hideTickResultCheckC();
}

/** display tick to allow continuing to next row */
function showTickResultCheckC() {
  activeResultIcon.children[0].setAttribute("aria-hidden", "false");
  activeResultIcon.children[0].setAttribute("tabindex", "0");
  activeResultIcon.children[0].classList.remove("vis-hidden");
  activeResultIcon.style.transform = "translateX(-50%) scale(1)";
}

/** hide tick for next row functions */
function hideTickResultCheckC() {
  activeResultIcon.children[0].setAttribute("tabindex", "-1");
  activeResultIcon.style.transform = "translateX(-50%) scale(0)";
  activeResultIcon.children[0].setAttribute("aria-hidden", "true");
  activeResultIcon.children[0].classList.add("vis-hidden");
}

let emptyBalls; // boolean for any activeBalls containing .empty
/** check for .empty in any ball in activeRow. return emptyBalls */
function activeBallsEmptyC() {
  if (activeBalls[0].classList.contains("empty") ||
    activeBalls[1].classList.contains("empty") ||
    activeBalls[2].classList.contains("empty") ||
    activeBalls[3].classList.contains("empty")) {
    emptyBalls = true;
  } else {
    emptyBalls = false;
  }
}

/** set color of selected ball and then close selector box
 */
function colorSelectC(event) {
  colorSelected = event.target.style.backgroundColor; // set colorSelected to color of clicked selector ball
  activeSelection.style.backgroundColor = colorSelected; // apply color to active ball in guess row
  activeSelection.classList.remove("empty"); // .empty removed to prevent alert when checking row
  activeSelection.parentNode.children[0].textContent = colorSelected;
  activeSelection.children[0].textContent = colorSelected + " ball";
  colorSelectBox.style.visibility = "hidden"; // hide selector box
  clearSelector.style.visibility = "hidden"; // hide clear selection
  activeSelection.style.border = "none"; // remove border from color ball in guess row
  activeSelection.style.boxShadow = "none";
  activeBallsEmptyC();
  if (!emptyBalls) {
    showTickResultCheckC(); // activeResultIcon appears for result checking
  } else {
    hideTickResultCheckC();
  }
}

// ! result functions
/** assign colors to pegs based on result */
function assignPegsC() {
  for (let i = 0; i < numOfPegs; i++) {
    activePegs[i].style.backgroundColor = pegColors[i];
  }
  const resultText = activeRow.getElementsByClassName("result-text")[0];
  let blackPegs = 0;
  let whitePegs = 0;
  for (const peg of pegColors) {
    console.log(peg);
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

/** check if ball color and position are correct */
function checkBlackC() {
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === activeBalls[i].style.backgroundColor) {
      solution[i] = "checked"; // assign none color value to correct index
      pegColors.push("black"); // add black to peg results array
    }
  }
}

/** check if ball color is correct but in wrong position */
function checkWhiteC() {
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] !== "checked" // check if index is already a black peg
      &&
      solution.includes(activeBalls[i].style.backgroundColor)) { // check solution array contains guess
      const removal = solution.indexOf(activeBalls[i].style.backgroundColor);
      solution[removal] = "pegged"; // stop duplication of white pegs if color repeated in guess
      pegColors.push("white"); // add white to peg results array
    }
  }
}

/** check result of input colors */
function checkResultC() {
  solutionHolder = solution.slice(); // make a copy of the solution which is not modified
  activeBallsEmptyC();
  // if (emptyBalls) { //!delete - not needed
  //   alert("Please complete selection!"); // prevent wasted guess
  // } else {
  /* section added to prevent user confusion if guess ball selected
  after four ball colors entered and no new color is chosen
  */
  colorSelectBox.style.visibility = "hidden"; // hide selector box
  clearSelector.style.visibility = "hidden";
  activeSelection.style.border = "none"; // remove border from active ball
  activeSelection.style.boxShadow = "none";
  activeSelection = "inactive"; // set active ball to undefined

  checkBlackC();
  checkWhiteC();
  assignPegsC();
  checkPegsC();
  if (win) {
    clearInterval(intervalCount); // stop timer
    checkTimeC();
    resetTimeC();
    deactivateRowC();
    ballRevealC();
    checkScoreC();
    message.textContent = "Well done!";
    setTimeout(winnerC, 100); // delay popup to allow 4 black pegs to be displayed
  } else {
    nextRowC(); // continue with game
    // }
  }
  solution = solutionHolder.slice(); // set solution array back to correct values
}

// ! checks for winners/losers

/** check for four black pegs,
 * pop up win message with option to reset
 */
function checkPegsC() {
  for (let i = 0; i < activePegs.length; i++) {
    if (activePegs[i].style.backgroundColor === "black") { // check all four pegs are black
      win = true;
    } else {
      win = false;
    }
  }
}

const hiddenScoreText = document.getElementById("best-score-value");
/** check if best score has been set
 * and if it is larger than the current winning
 * score. if so, change the displayed number to the best score
 */
function checkScoreC() {
  if (bestScore > score || bestScore === 0) {
    bestScore = score.toString();
    bestScoreHTML.textContent = `${bestScore}`;
    hiddenScoreText.textContent = `best score: ${bestScore}`;
  }
}

/** set ball color and reveal answer */
function ballRevealC() {
  setSolutionBallsC(); // moved inside this function to prevent peeking before game
  setTimeout(solutionCover.style.zIndex = "-1", 50);
}

/** confirm with option to replay */
function winnerC() {
  if (confirm(`Congratulations, you won!\nWould you like to play again?`)) {
    resetC();
  }
}

/** confirm with option to replay */
function loserC() {
  if (confirm(`Unlucky, you lost!\nWould you like to play again?`)) {
    resetC();
  }
}

// ! run and reset functions
/** initiate challenge with new solution */
function runChallenge() {
  setSolutionC();
  setSelectorBallsC();
  activateRowC();
  timerC();
}

/** reset solution to blank,
 * color balls to blank,
 * pegs to blank,
 * active row number to first row,
 * peg color array to empty,
 * deactivate current row,
 * reset message,
 * re-cover solution,
 * reset score,
 * run challenge again
 */
function resetC() {
  solution = [];
  for (let i = 0; i < colorBalls.length; i++) {
    colorBalls[i].style.backgroundColor = "#854e1e";
  }
  for (let i = 0; i < pegs.length; i++) {
    pegs[i].style.backgroundColor = "#a0622c";
  }
  aR = 0;
  pegColors = [];
  deactivateRowC();
  const rows = document.getElementsByClassName("guess");
  for (const row of rows) {
    row.setAttribute("aria-hidden", "true");
    row.classList.remove("completed-row");
  }
  const balls = document.querySelectorAll(".tooltip-text-ball");
  for (const ball of balls) {
    ball.textContent = "empty";
  };
  const resultText = document.getElementsByClassName("result-text");
  for (const text of resultText) {
    text.textContent = "result: empty";
  }
  for (const ball of solutionBalls) {
    ball.children[0].textContent = "hidden ball";
    ball.previousElementSibling.textContent = "hidden";
  }
  rows[0].removeAttribute("aria-hidden");
  solutionCover.style.zIndex = "1"; // hide solution
  message.textContent = "Good luck!";
  score = 0;
  runChallenge();
}

// !colorBlind setting
const colorBlind = document.getElementById("color-blind");
const cBCheckmark = colorBlind.nextElementSibling;
// aria control for click
colorBlind.addEventListener("click", () => {
  toggleColorBlind();
  ariaCheck(colorBlind);
})
cBCheckmark.addEventListener("click", () => {
  colorBlind.checked = !colorBlind.checked;
  toggleColorBlind();
  ariaCheck(colorBlind);
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

// prevent space scroll
const checkmarks = document.getElementsByClassName("checkmark");
for (let checkmark of checkmarks) {
  checkmark.addEventListener("keydown", (keyed) => {
    if (keyed.key === " ") {
      keyed.preventDefault();
    }
  });
}


/**
 * checks the state of the checkbox and alters aria-checked
 * and aria-disabled accordingly
 * @param {*} checkbox checkbox element to have **.checked** tested for true/false
 */
function ariaCheck(checkbox) {
  if (!checkbox.checked) {
    checkbox.nextElementSibling.setAttribute("aria-checked", "false");
  } else {
    checkbox.nextElementSibling.setAttribute("aria-checked", "true");
  }
  if (checkbox.disabled) {
    checkbox.nextElementSibling.setAttribute("aria-disabled", "true");
  } else {
    checkbox.nextElementSibling.setAttribute("aria-disabled", "false");
  }
}

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
document.onload = toggleColorBlind();
// end of colorblind

/** run the challenge */
runChallenge();
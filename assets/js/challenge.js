//? change values to hex codes? 
let colors = ["red", "green", "blue", "yellow", "pink", "purple"]; // create the colors available for the challenge
let solution = []; // create a blank array for the solution
let numOfBalls = 4; // create a variable for the number of balls in the solution
let numOfPegs = numOfBalls; // number of pegs === number of balls
let pegColors = []; // create array to store peg results
let aR = 0; // active row index number
let activeRow; // create variable to store activeRow
let activeBalls; // create variable to store activeBalls
let activeSelection; // create a variable to store which color-ball has been chosen for color change
let activePegs; // create result pegs
let colorSelectors = document.getElementsByClassName("selector"); // color selectors in selector-box
let colorSelectBox = document.getElementById("selector-box"); // color select box element
let colorSelected; // create a variable to store the color selected from the selector box
let solutionBalls = document.getElementById("solution").children ; // get array of solution color balls
let colorBalls = document.getElementsByClassName("color-ball"); // all color balls
let pegs = document.getElementsByClassName("peg"); // all pegs
let solutionCover = document.getElementById("solution-cover"); // solution cover panel
let message = document.getElementById("message"); // message paragraph
let win = false; // set win to false
let solutionHolder; // none modified solution array
let bestScoreHTML = document.getElementsByClassName("best score")[0]; // bestScore to be filled in on win condition
let bestScore = 0; // keep a record of the best score without having to get from DOM
let score = 0; // score count


// ! timer variables and functions

// credit to Code Institute course content for basic timer function
// modified with basic solution credit to https://stackoverflow.com/users/854246/joseph-marikle
// https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers/8043061#8043061
// first answer which applies for positive integers only which works for this situation
// the answer combines a string with a number so extra steps have been taken to convert
// to strings and numbers where necessary

let intervalCount; // accessible variable
let seconds = document.getElementById("seconds"); // seconds span // ? which method is preferred? l.42
let minutes = document.getElementById("minutes"); // minutes span
let secondsTime = 0; // start value
let minutesTime = 0; // start value
let bestSeconds = document.getElementsByClassName("best time")[0].children[1]; // best seconds span // ? which method is preferred? l.36
let bestMinutes = document.getElementsByClassName("best time")[0].children[0]; // best minutes span
function timer() {
  intervalCount = setInterval(function() {
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

/** check current completion time against best time,
 * if quicker => replace best time
 */
function checkTime() {
  let testSeconds = Number(bestSeconds.innerHTML); // convert seconds string to number
  let testMinutes = Number(bestMinutes.innerHTML); // convert minutes string to number
  if ((secondsTime <= testSeconds||bestSeconds.innerHTML === "--") // check values of bestSeconds
  && (minutesTime <= testMinutes||bestMinutes.innerHTML === "--")) { //check values of bestMinutes
    bestSeconds.innerHTML = (("0" + secondsTime).slice(-2)).toString(); // write bestSeconds
    bestMinutes.innerHTML = (("0" + minutesTime).slice(-2)).toString(); // write bestMinutes
  }
}

/** reset timer to 0 */
function resetTime() {
  secondsTime = 0;
  minutesTime = 0;
}

// ! setting up the game functions

/** set color of selector-box color balls to available colors */
function setSelectorBalls() {
  for (let i = 0; i < colorSelectors.length; i++) {
    colorSelectors[i].style.backgroundColor = (colors[i]);
  }
}

/** set solution to random array of available colors */
function setSolution () {
  for (let i = 0; i < numOfBalls; i++) {
    let newColor = colors[Math.floor(Math.random()*colors.length)]; //select a random color
    solution.push(newColor); // add new color to solution
  }
  // solution = ["red","red","yellow","red"]; // !test solutionA
// solution = ["red","blue","yellow","green"]; // !test solutionB
// solution = ["red","blue","red","yellow"]; // !test solutionC
}

/** set color of solution balls to solution array values */
function setSolutionBalls() {
  for (let i = 0; i < solutionHolder.length; i++) {
    solutionBalls[i].style.backgroundColor = (solutionHolder[i]); // set color of solution balls
  }
}

// add click listener to selectors
document.querySelectorAll('.selector').forEach(item => {
  item.addEventListener('click', colorSelect);
});

// ! gameplay functions

/** activates the next row by applying classes
 * to enable selection of colors and result checking
 */
function activateRow() {
  // get and set .active-row
  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.classList.add("active-row");

  // set .active-balls and .empty to color-balls in active-row
  activeBalls = activeRow.children[1].children;
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.add("active-balls", "empty");
  }

  // add click listener to active-balls
  document.querySelectorAll('.active-balls').forEach(item => {
    item.addEventListener('click', colorSelector);
  });

  activeRow.children[0].style.borderColor = "#165764"; // active row number border shows active row
  activeRow.children[0].addEventListener("click", checkResult); // add click listener to row number
  activePegs = activeRow.children[2].children; // active pegs in active row
  score++;
}

/** deactivate row by removing classes and click listeners */
function deactivateRow() {  
  activeRow.children[0].style.borderColor = "#fffce8"; // border color of previous row number back to normal
  activeRow.classList.remove("active-row");
  document.querySelectorAll('.active-balls').forEach(item => {
    item.removeEventListener('click', colorSelector);
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
  if (aR < 6) {
    activateRow();
  }
  else { // if no rows remain for guesses
    ballReveal();
    message.innerHTML = "Oh dear!";
    clearInterval(intervalCount);
    resetTime();
    setTimeout(loser, 100); // delay popup to allow result to be displayed
  }
}

/** allows selected color-ball to be set as
 * activeSelection and enables color
 * selection
 */
function colorSelector(event) {
  // check if activeSelection border is already in place
  if (activeSelection !== undefined||null){
    activeSelection.style.border = "none"; // remove border from previous selected ball
    activeSelection = null; // ?may not be necessary - removes activeSelection from previous selected ball?
  }
  colorSelectBox.style.visibility = "visible"; // make selector box visibile
  activeSelection = event.target; // set activeSelection to ball that created event
  activeSelection.style.border = ".2rem solid white"; // add border for visual aid to player
}

/** set color of selected ball and then close selector box
*/
function colorSelect(event) {
  colorSelected = event.target.style.backgroundColor; // set colorSelected to color of clicked selector ball
  activeSelection.style.backgroundColor = colorSelected; // apply color to active ball in guess row
  activeSelection.classList.remove("empty"); // .empty removed to prevent alert when checking row
  colorSelected = null; // ?not necessary? removes chance of accidental color input
  colorSelectBox.style.visibility = "hidden"; // hide selector box
  activeSelection.style.border = "none"; // remove border from color ball in guess row
}

// ! result functions

/** assign colors to pegs based on result */
function assignPegs() {
  for (let i = 0; i < numOfPegs; i++) {
    activePegs[i].style.backgroundColor = pegColors[i];
  }
}

/** check if ball color and position are correct */
function checkBlack() {
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === activeBalls[i].style.backgroundColor) {
      solution[i] = "checked"; // assign none color value to correct index
      pegColors.push("black");  // add black to peg results array
    }
  }
}

/** check if ball color is correct but in wrong position */
function checkWhite() {
   for (let i = 0; i < solution.length; i++) {
    if (solution[i] !== "checked" // check if index is already a black peg
    && solution.includes(activeBalls[i].style.backgroundColor)) { // check solution array contains guess
      let removal = solution.indexOf(activeBalls[i].style.backgroundColor);
      solution[removal] = "pegged"; // stop duplication of white pegs if color repeated in guess
      pegColors.push("white"); // add white to peg results array
    }
  }
}

/** check result of input colors */
function checkResult(){
  solutionHolder = solution.slice(); // make a copy of the solution which is not modified
  
  if (activeBalls[0].classList.contains("empty") // check if any balls have not had colors selected
    || activeBalls[1].classList.contains("empty") // ?can this be changed to for or switch statement?
    || activeBalls[2].classList.contains("empty")
    || activeBalls[3].classList.contains("empty")) {
    alert("Please complete selection!"); // prevent wasted guess
  }
  else {
    checkBlack();
    checkWhite();
    assignPegs();
    checkPegs();
    if (win) {
      clearInterval(intervalCount); // stop timer
      checkTime();
      resetTime();
      deactivateRow();
      ballReveal();
      checkScore();
      message.innerHTML = "Well done!";
      setTimeout(winner, 100); // delay popup to allow 4 black pegs to be displayed
    }
    else{
      nextRow(); // continue with game
    }
  }
  solution = solutionHolder.slice(); // set solution array back to correct values
}

// ! checks for winners/losers

/** check for four black pegs,
 * pop up win message with option to reset
 */
function checkPegs() {
  for (let i = 0; i < activePegs.length; i++) {
    if (activePegs[i].style.backgroundColor === "black") { // check all four pegs are black
      win = true;
    }
    else {
      win = false;
    }
  }
}

/** check if best score has been set
 * and if it is larger than the current winning
 * score. if so, change the displayed number to the best score
 */
function checkScore() {
  if (bestScore > score||bestScore === 0) {
    bestScore = score.toString();
    bestScoreHTML.innerHTML = `${bestScore}`;
  }
}

/** set ball color and reveal answer */
function ballReveal() {
  setSolutionBalls(); // moved inside this funtion to prevent peeking before game
  setTimeout(solutionCover.style.zIndex = "-1", 50);
}

/** confirm with option to replay */
function winner() {
  if (confirm(`Congratulations, you won! \nWould you like to play again?`)) {
    reset();
  }
}

/** confirm with option to replay */
function loser() {
  if (confirm(`Unlucky, you lost! \nWould you like to play again?`)) {
    reset();
  }
}

// ! run and reset functions

/** initiate challenge with new solution */
function runChallenge() {
  setSolution();
  setSelectorBalls();
  activateRow();
  timer();
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
function reset() {
  solution = [];
  for (let i = 0; i < colorBalls.length; i++) {
    colorBalls[i].style.backgroundColor = "#854e1e";
  }
  for (let i = 0; i < pegs.length; i++) {
    pegs[i].style.backgroundColor = "#a0622c";
  }
  aR = 0;
  pegColors = [];
  deactivateRow();
  solutionCover.style.zIndex = "1"; // hide solution
  message.innerHTML = "Good luck!";
  score = 0;
  runChallenge();
}

/** run the challenge */
runChallenge();
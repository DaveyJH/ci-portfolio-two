// create the colors available for the challenge
let colors = ["red", "green", "blue", "yellow", "pink", "purple"]; //? change values to hex codes?
// create a blank array for the solution
let solution = [];
// create a variable for the number of balls in the solution
let numOfBalls = 4;
// make number of pegs === number of balls
let numOfPegs = numOfBalls;
// create variable to store peg results
let pegColors = [];
// get the color select box element
let colorSelectBox = document.getElementById("selector-box");
// create a variable to store the color selected from the selector box
let colorSelected;
// create a variable to store which color-ball has been chosen for color change
let activeSelection;
// active row index number
var aR = 0;
// create variable to store activeRow
let activeRow;
// create variable to store activeBalls
let activeBalls;
// create result pegs
let activePegs;

// set colors of color selector balls to match available colors
let colorSelectors = document.getElementsByClassName("selector");
for (let i = 0; i < colorSelectors.length; i++) {
  colorSelectors[i].style.backgroundColor = (colors[i]);
}

// set solution
for (let i = 0; i < numOfBalls; i++) {
  let newColor = colors[Math.floor(Math.random()*colors.length)]; //select a random color
  solution.push(newColor); //add new color to solution
}

// get array of solution color balls
let solutionInsert = document.getElementById("solution").children;
// set color of solution balls
for (let i = 0; i < solution.length; i++) {
  solutionInsert[i].style.backgroundColor = (solution[i]);
}

// add click listener to selectors
document.querySelectorAll('.selector').forEach(item => {
  item.addEventListener('click', colorSelect)
})

activateRow();

/** activates the next row by applying classes
 * to enable selection of colors and result checking
 */
function activateRow() {
  // get and set .active-row
  activeRow = document.getElementsByClassName("guess")[aR];
  activeRow.classList.add("active-row");
  // get and set .active-balls and .empty to color-balls in active-row
  activeBalls = activeRow.children[1].children;
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.add("active-balls", "empty");
  }
  // add click listener to active-balls
  document.querySelectorAll('.active-balls').forEach(item => {
    item.addEventListener('click', colorSelector)
  })
  // add click listener to row number to check result
  activeRow.children[0].addEventListener("click", checkResult);
  // active pegs in active row
  activePegs = activeRow.children[2].children;
}

/** deactivate row by removing classes */
function deactivateRow() {
  activeRow.classList.remove("active-row");
  document.querySelectorAll('.active-balls').forEach(item => {
    item.removeEventListener('click', colorSelector)
  })
  for (let i = 0; i < activeBalls.length; i++) {
    activeBalls[i].classList.remove("active-balls");
  }
  activeRow.children[0].removeEventListener("click", checkResult);
}

/** allows selected color-ball to be set as
 * activeSelection and enables color
 * selection
 */
function colorSelector(event) {
  colorSelectBox.style.visibility = "visible";
  activeSelection = event.target;
}

/** set color of originally selected ball and then close selector box
*/
function colorSelect(event) {
  colorSelected = event.target.style.backgroundColor;
  activeSelection.style.backgroundColor = colorSelected;
  activeSelection.classList.remove("empty");
  colorSelected = null;
  colorSelectBox.style.visibility = "hidden";
}

/** assign colors to pegs based on result */
function assignPegs() {
  for (let i = 0; i < numOfPegs; i++) {
    activePegs[i].style.backgroundColor = pegColors[i];
  }
}

/** check result of input colors */
function checkResult(){
  // check if any balls have not had colors selected and prevent wasted guess
  // ?can this be changed to for or switch statement?
  if (activeBalls[0].classList.contains("empty") 
    || activeBalls[1].classList.contains("empty")
    || activeBalls[2].classList.contains("empty")
    || activeBalls[3].classList.contains("empty")) {
    alert("Please complete selection!");
  }
  else {
    // create logic to check if activeBalls contain class === solution array
    // check if index of ball with class is same as index of array value
    // if not, return white, if true, return black
    // repeat for all balls
    // test for white and black peg results
    for (i = 0; i < solution.length; i++) {
      if (solution[i] === activeBalls[i].style.backgroundColor) {
        // ?add "black" value to an array?
        console.log("black");
        pegColors.push("black");
      }
    }
    // !white pegs repeat in situation [solution: r, r, g, b][guess: b, b, b, b]=[result: b, w, w, w]
    for (i = 0; i < solution.length; i++) {
      if (solution[i] !== activeBalls[i].style.backgroundColor
        && solution.includes(activeBalls[i].style.backgroundColor)) {
        // ?add "white" value to an array?
        console.log("white");
        pegColors.push("white");
      }
    }
    console.log(pegColors);
    // assign peg colors to pegs
    assignPegs();
    // delete values from pegColors
    pegColors = [];
    console.log(pegColors);

    deactivateRow();
    aR++;
    activateRow();
  }
}
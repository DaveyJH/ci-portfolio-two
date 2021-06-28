// create the colors available for the challenge
let colors = ["red", "green", "blue", "yellow", "pink", "purple"];
// create a blank array for the solution
let solution = [];
// create a variable for the number of balls in the solution
let numOfBalls = 4;
let colorSelectBox = document.getElementById("selector-box");
let colorSelection;
let colorSelected;
let activeSelection;

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

// active row index number
let aR = 0;
// get and set active-row class
let activeRow = document.getElementsByClassName("guess")[aR];
activeRow.classList.add("active-row");
// get and set active-balls class to color-balls in active-row
let activeBalls = activeRow.children[1].children;
for (let i = 0; i < activeBalls.length; i++) {
  activeBalls[i].classList.add("active-balls");
}
// add click listener to active-balls
document.querySelectorAll('.active-balls').forEach(item => {
  item.addEventListener('click', colorSelector)
})

/** allows selected color-ball to be set as
 * activeSelection and enables color
 * selection
 */
function colorSelector(event) {
  colorSelectBox.style.visibility = "visible";
  activeSelection = event.target;
}

// add click listener to selectors
document.querySelectorAll('.selector').forEach(item => {
  item.addEventListener('click', colorSelect)
})

/** set color of originally selected ball and then close selector box
*/
function colorSelect(event) {
  colorSelected = event.target.style.backgroundColor;
  activeSelection.style.backgroundColor = colorSelected;
  activeSelection.classList.remove("empty");
  colorSelected = null;
  colorSelectBox.style.visibility = "hidden";
}

activeRow.children[0].addEventListener("click", checkResult);

/** check result of input colors
 */
function checkResult(){
    if (activeBalls[0, 1, 2, 3].classList.contains("empty")) {
      alert("Please complete selection!");
    }
    else {
      console.log("success");
    }
}
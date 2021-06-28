// create the colors available for the challenge
let colors = ["red", "green", "blue", "yellow", "pink", "purple"];
// create a blank array for the solution
let solution = [];
// create a variable for the number of balls in the solution
let numOfBalls = 4;
let colorSelectBox = document.getElementById("selector-box");
let colorSelection;
let colorSelected;

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
let activeRow = document.getElementsByClassName("guess")[aR].children[1];
activeRow.classList.add("active-row");
// get and set active-balls class to color-balls in active-row
let activeBalls = activeRow.children;
for (let i = 0; i < activeBalls.length; i++) {
  activeBalls[i].classList.add("active-balls");
}
// add click listener to active-balls
document.querySelectorAll('.active-balls').forEach(item => {
  item.addEventListener('click', colorSelector)
})


function colorSelector(event) {
  colorSelectBox.style.visibility = "visible";
  // add click listener to selectors
  document.querySelectorAll('.selector').forEach(item => {
    item.addEventListener('click', colorSelect)
  })
  function colorSelect(event) {
    console.log("win");
    colorSelected = event.target.style.backgroundColor;
    colorSelectBox.style.visibility = "hidden";    
  }
  // set color of original selected ball
  //! this is not working correctly and requires a second click of the appropriate ball
  event.target.style.backgroundColor = colorSelected;
  console.log("success");
}

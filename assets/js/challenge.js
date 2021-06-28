// create the colors available for the challenge
let colors = ["red", "green", "blue", "yellow", "pink", "purple"];
// create a blank array for the solution
let solution = [];
// create a variable for the number of balls in the solution
let numOfBalls = 4;
let colorSelectBox = document.getElementById("selector-box");

for (let i = 0; i < numOfBalls; i++) {
  let newColor = colors[Math.floor(Math.random()*colors.length)]; //select a random color
  solution.push(newColor); //add new color to solution
  console.log(i);
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

function colorSelector() {
  colorSelectBox.style.visibility = "visible"
  console.log("success");
}

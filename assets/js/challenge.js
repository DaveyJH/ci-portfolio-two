// create the colors available for the challenge
let colors = ["red", "green", "blue", "yellow", "pink", "purple"];
// create a blank array for the solution
let solution = [];
// create a variable for the number of balls in the solution
let numOfBalls = 4;

for (let i = 0; i < numOfBalls; i++) {
  let newColor = colors[Math.floor(Math.random()*colors.length)]; //select a random color
  solution.push(newColor); //add new color to solution
  console.log(i);
}

console.log(solution)
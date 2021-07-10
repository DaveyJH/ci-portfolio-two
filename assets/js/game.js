let settingsActivator = document.getElementById("settings-activator");
settingsActivator.addEventListener("click", showSettings);

let numOfBalls;
let numOfColors;


/** show settings overlay */
function showSettings() {
  document.getElementById("settings").style.visibility = "visible";
  let playButton = document.getElementById("play-button");
  playButton.addEventListener("click", gameOn);
}



function gameOn(event) {
  event.preventDefault();
  document.getElementById("settings").style.visibility = "hidden";
  // ! timer variables and functions
  // credit to Code Institute course content for basic timer function
  // modified with basic solution credit to https://stackoverflow.com/users/854246/joseph-marikle
  // https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers/8043061#8043061
  // first answer which applies for positive integers only which works for this situation
  // the answer combines a string with a number so extra steps have been taken to convert
  // to strings and numbers where necessary

  let intervalCount; // accessible variable
  let seconds = document.getElementById("seconds"); // seconds span
  let minutes = document.getElementById("minutes"); // minutes span
  let secondsTime = 0; // start value
  let minutesTime = 0; // start value
  let bestSeconds = document.getElementById("best-seconds"); // best seconds span
  let bestMinutes = document.getElementById("best-minutes"); // best minutes span

  /** runs a second and minute time that stops at 59:59 */
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
  timer();
}
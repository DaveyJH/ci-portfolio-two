let tradeOff = document.getElementById("trade-off");

class plot {
  constructor(x, y, name, textposition) {
    this.x = [x],
    this.y = [y],
    this.mode = "markers+text",
    this.type = "scatter",
    this.name = name,
    this.text = [name],
    this.textposition = textposition;
    this.textfont = {
    family: "Raleway, sans-serif"
    },
    this.marker = {
      size: "12"
    };
  }
}

let plotA = new plot(9, 8, "A", "top left");
let plotB = new plot(7, 7, "B", "top left");
let plotC = new plot(10, 8, "C", "top");
let plotD = new plot(7, 7, "D", "top right");
let plotE = new plot(4, 6, "E", "top left");
let plotF = new plot(8, 6, "F", "top");
let plotG = new plot(10, 7, "G", "top");
let plotH = new plot(2, 5, "H", "top");
let plotI = new plot(6, 6, "I", "top");
let plotJ = new plot(7, 7, "J", "bottom left");
let plotK = new plot(3, 6, "K", "top");
let plotL = new plot(4, 5, "L", "top");
let plotM = new plot(2, 4, "M", "top");
let plotN = new plot(4, 6, "N", "top right");
let plotO = new plot(10, 10, "O", "top");
let plotP = new plot(5, 8, "P", "top");
let plotQ = new plot(9, 10, "Q", "top");
let plotR = new plot(9, 8, "R", "top right");
let plotS = new plot(7, 7, "S", "bottom right");
let plotT = new plot(6, 5, "T", "top");
let plotU = new plot(7, 4, "U", "top");
let plotV = new plot(1, 3, "V", "top left");
let plotW = new plot(1, 3, "W", "top right");

let data = [plotA, plotB, plotC, plotD, plotE, plotF, plotG, plotH, plotI, plotJ, plotK, plotL, plotM, plotN, plotO, plotP, plotQ, plotR, plotS, plotT, plotU, plotV, plotW];

let layout = {
  xaxis: {
    range: [0, 10.5]
  },
  yaxis: {
    range: [0, 10.5]
  },
  title:'Trade Off Comparison',
  showlegend: false,
};

Plotly.newPlot(tradeOff, data, layout);

//Credit to Tobi - CI Slack
//Tech - Plotly.js
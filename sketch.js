// all variable declarations
let charts = [];

let hlyData;

let cleanHLY = [];

let bothHLY = [];

let numHLY;

function preload() {
  hlyData = loadTable("data/HLY.csv", "csv", "header")
}

function setup() {
  createCanvas(1200, 1000);
  background(30)
  
  numHLY = hlyData.rows.length;

  for(let i = 0; i < numHLY; i++) {
    cleanHLY.push(hlyData.rows[i].obj)
  }

  bothHLY = cleanHLY.filter(sex => sex.Sex == "Both sexes");

  vBarChart = {
    data:bothHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:100,
    yPos:450,
    axisColour:"#ffffff",
    barColour:"#ffff00",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ff00ff",
    labelRotation:PI/2,
    chartType:"Vertical"
  }

  hBarChart = {
    data:bothHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:600,
    yPos:450,
    axisColour:"#ffffff",
    barColour:"#ffff00",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ff00ff",
    labelRotation:PI/2,
    chartType:"Horizontal"
  }

  charts.push(new BarChart(vBarChart));


  charts.push(new BarChart(hBarChart));

  charts.forEach(chart => chart.render());
}
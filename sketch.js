// all variable declarations
let charts = [];

let hlyData;

let cleanHLY = [];

let bothHLY = [];

let cleanCombinedHLY = []

let numHLY;

function preload() {
  hlyData = loadTable("data/HLY.csv", "csv", "header")
}

function setup() {
  createCanvas(1200, 1200);
  background(30)
  
  numHLY = hlyData.rows.length;

  for(let i = 0; i < numHLY; i++) {
    cleanHLY.push(hlyData.rows[i].obj)
  }

  bothHLY = cleanHLY.filter(sex => sex.Sex == "Both sexes");
  combinedHLY = cleanHLY.filter(sex => sex.Sex == "Male" || sex.Sex == "Female");

  // used for stacked bar chart adn 100%
  let Male;
  let Female;

  for (i = 0; i < combinedHLY.length; i += 2) {
    Male = combinedHLY[i];
    Female = combinedHLY[i+1];
    yupSendIt = [Male, Female];

    cleanCombinedHLY.push(yupSendIt);
  }

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

  sBarChart = {
    data:cleanCombinedHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:100,
    yPos:950,
    axisColour:"#ffffff",
    barColour:"#3cff00",
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ff00ff",
    labelRotation:PI/2,
    chartType:"Stacked",
  }

  bBarChart = {
    data:cleanCombinedHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:600,
    yPos:950,
    axisColour:"#ffffff",
    barColour:"#3cff00",
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ff00ff",
    labelRotation:PI/2,
    chartType:"100%",
  }

  charts.push(new BarChart(vBarChart));


  charts.push(new BarChart(hBarChart));

  charts.push(new BarChart(sBarChart));

  charts.push(new BarChart(bBarChart));

  charts.forEach(chart => chart.render());
}
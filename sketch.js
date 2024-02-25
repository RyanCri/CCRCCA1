// all variable declarations
let charts = [];

let hlyData;

let cleanHLY = [];
let cleanST = [];

let bothHLY = [];

let cleanCombinedHLY = []

let numHLY;

function preload() {
  hlyData = loadTable("data/HLY.csv", "csv", "header");
  studentsTeachers = loadTable("data/studentsToTeachers.csv", "csv", "header");
}

function setup() {
  createCanvas(1800, 1400);
  background(30)
  
  numHLY = hlyData.rows.length;
  numST = studentsTeachers.rows.length;

  for(let i = 0; i < numHLY; i++) {
    cleanHLY.push(hlyData.rows[i].obj)
  }

  for(let i = 0; i < numST; i++) {
    cleanST.push(studentsTeachers.rows[i].obj)
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
    yPos:550,
    axisColour:"#ffffff",
    barColour:"#ffff00",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"Vertical",
    title:"Healthy Living Years after the age of 65 over\nthe last decade"
  }

  hBarChart = {
    data:bothHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:700,
    yPos:550,
    axisColour:"#ffffff",
    barColour:"#ffff00",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"Horizontal",
    title:"Healthy Living Years over the last decade after\nthe age of 65"
  }

  sBarChart = {
    data:cleanCombinedHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:100,
    yPos:1150,
    axisColour:"#ffffff",
    barColour:["#ff0f0f", "#1e00ff"],
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"Stacked",
    title:"Healthy Living Years after the age of 65 over\nthe last decade, separated by Male and Female",
    legend:["Male", "Female"]
  }

  bBarChart = {
    data:cleanCombinedHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:1300,
    yPos:550,
    axisColour:"#ffffff",
    barColour:["#ff0f0f", "#1e00ff"],
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"100%",
    title:"Healthy Living Years after the age of 65 over\nthe last decade, Male v Female Ratio",
    legend:["Male", "Female"]
  }

  lBarChart = {
    data:bothHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:700,
    yPos:1150,
    axisColour:"#ffffff",
    barColour:"#ffff00",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    title:"Trend of healthy living years after the age of 65\nthroughout the last decade",
    chartType:"Line"
  }

  charts.push(new BarChart(vBarChart));

  charts.push(new BarChart(hBarChart));

  charts.push(new BarChart(sBarChart));

  charts.push(new BarChart(lBarChart));

  charts.push(new BarChart(bBarChart));

  charts.forEach(chart => chart.render());
}
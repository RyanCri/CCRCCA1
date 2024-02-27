// all variable declarations
let charts = [];

let hlyData;

let cleanHLY = [];
let cleanST = [];

let bothHLY = [];

let cleanCombinedHLY = []
let cleanIrelandST = []
let cleanAirport = []

let numHLY;

function preload() {
  hlyData = loadTable("data/HLY.csv", "csv", "header");
  studentsTeachers = loadTable("data/studentsToTeachers.csv", "csv", "header");
  airportData = loadTable("data/airportPassenger.csv", "csv", "header");
}

function setup() {
  createCanvas(2400, 1400);
  background(30)
  
  numHLY = hlyData.rows.length;
  numST = studentsTeachers.rows.length;
  numAirport = airportData.rows.length;

  for(let i = 0; i < numHLY; i++) {
    cleanHLY.push(hlyData.rows[i].obj)
  }

  for(let i = 0; i < numST; i++) {
    cleanST.push(studentsTeachers.rows[i].obj)
  }

  for(let i = 0; i < numAirport; i++) {
    cleanAirport.push(airportData.rows[i].obj);
  }

  bothHLY = cleanHLY.filter(sex => sex.Sex == "Both sexes");
  combinedHLY = cleanHLY.filter(sex => sex.Sex == "Male" || sex.Sex == "Female");
  irelandST = cleanST.filter(country => country.Countries == "Ireland")

  // used for stacked bar chart adn 100%
  let Male;
  let Female;

  let prim;
  let sec;

  for (i = 0; i < irelandST.length; i += 3) {
    prim = irelandST[i];
    sec = irelandST[i+2];
    yupSendIt = [prim, sec];

    cleanIrelandST.push(yupSendIt);
  }

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
    data:cleanIrelandST,
    yValue:"Ratio of students to teachers (Ratio)",
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
    title:"Ratio of students to teachers, primary v secondary",
    legend:["Prim.", "Sec."]
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

  gBarChart = {
    data:cleanCombinedHLY,
    yValue:"VALUE",
    xValue:"Year",
    chartWidth:400,
    chartHeight:400,
    xPos:1300,
    yPos:1150,
    axisColour:"#ffffff",
    barColour:["#ff0f0f", "#1e00ff"],
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    title:"Trend of healthy living years after the age of 65\nthroughout the last decade",
    chartType:"Grouped",
    legend:["Male", "Female"]
  }

  iSBarChart = {
    data:cleanIrelandST,
    yValue:"Ratio of students to teachers (Ratio)",
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
    title:"Number of students to teachers in Ireland",
    legend:["Prim.", "Sec."]
  }

  pieChart = {
    data:cleanAirport,
    sliceValue:"Passengers (Number)",
    sliceData:["Cork", "Dublin", "Kerry", "Knock", "Shannon"],
    sliceSource:"Airports",
    chartRadius:400,
    xPos:1650,
    yPos:-50,
    sliceColours:["#157F1F", "#4CB963", "#A0EADE", "#5C6784", "#1D263B"],
    
  }

  charts.push(new BarChart(vBarChart));

  charts.push(new BarChart(hBarChart));

  charts.push(new BarChart(iSBarChart));

  charts.push(new BarChart(lBarChart));

  charts.push(new BarChart(bBarChart));

  charts.push(new BarChart(gBarChart));

  charts.push(new PieChart(pieChart));

  charts.forEach(chart => chart.render());
}
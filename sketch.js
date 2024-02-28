// all variable declarations
let charts = [];

let hlyData;

let cleanHLY = [];
let cleanST = [];

let bothHLY = [];

let cleanCombinedHLY = []
let cleanIrelandST = []
let cleanAirport = []
let cleanBirthDeath = []

let numHLY;

function preload() {
  hlyData = loadTable("data/HLY.csv", "csv", "header");
  studentsTeachers = loadTable("data/studentsToTeachers.csv", "csv", "header");
  airportData = loadTable("data/airportPassenger.csv", "csv", "header");
  birthDeathData = loadTable("data/birthDeath.csv", "csv", "header");
}

function setup() {
  createCanvas(2400, 2200);
  background(30)
  
  numHLY = hlyData.rows.length;
  numST = studentsTeachers.rows.length;
  numAirport = airportData.rows.length;
  numBirthDeath = birthDeathData.rows.length;

  for(let i = 0; i < numHLY; i++) {
    cleanHLY.push(hlyData.rows[i].obj)
  }

  for(let i = 0; i < numST; i++) {
    cleanST.push(studentsTeachers.rows[i].obj)
  }

  for(let i = 0; i < numAirport; i++) {
    cleanAirport.push(airportData.rows[i].obj);
  }

  for(let i = 0; i < numBirthDeath; i++) {
    cleanBirthDeath.push(birthDeathData.rows[i].obj);
  }

  bothHLY = cleanHLY.filter(sex => sex.Sex == "Both sexes");
  combinedHLY = cleanHLY.filter(sex => sex.Sex == "Male" || sex.Sex == "Female");
  irelandST = cleanST.filter(country => country.Countries == "Ireland");
  q3Ireland = cleanAirport.filter(quarter => quarter.Quarter == "2023Q3" && quarter.Airports != "Dublin");
  births = cleanBirthDeath.filter(birth => birth.Births == "TRUE");
  deaths = cleanBirthDeath.filter(death => death.Deaths == "TRUE")
  // q3Ireland = q3Ireland.pop(q3Ireland.sort())

  // used for stacked bar chart adn 100%
  let Male;
  let Female;

  let prim;
  let sec;

  for (i = 0; i < irelandST.length; i += 3) {
    prim = irelandST[i];
    sec = irelandST[i+2];
    s = [prim, sec];

    cleanIrelandST.push(s);
  }

  for (i = 0; i < combinedHLY.length; i += 2) {
    Male = combinedHLY[i];
    Female = combinedHLY[i+1];
    s = [Male, Female]

    cleanCombinedHLY.push(s);
  }

  let birthDeath = [];

  for (i = 0; i < births.length; i ++) {
    let birth = births[i];
    let death = deaths[i];
    s = [birth, death]

    birthDeath.push(s)
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
    barColour:"#9d44b5",
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
    barColour:"#78BC61",
    sW:2,
    barWidth:15,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"Horizontal",
    title:"Healthy Living Years over the last decade after\nthe age of 65"
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
    barColour:["#EF2D56", "#ED7D3A"],
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:40,
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
    yPos:1350,
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
    chartWidth:800,
    chartHeight:400,
    xPos:1300,
    yPos:1350,
    axisColour:"#ffffff",
    barColour:["#3772FF", "#DF2935"],
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
    yPos:1350,
    axisColour:"#ffffff",
    barColour:["#FFBA49", "#20A39E", "#cc55ff", "#20A39E"],
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:40,
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
    chartRadius:200,
    xPos:1900,
    yPos:150,
    sliceColours:["#157F1F", "#4CB963", "#A0EADE", "#5C6784", "#1D263B"],
    sliceValDisplay:true,
    title:"Passengers, Q1 to Q3 of 2023, through Irish airports",
    sW: 3,
    legendTextSize: 20,
    legendColour: 255,
    legendStroke: 255,
    legendRotation: 0,
  }

  hBarChartAirport = {
    data:q3Ireland,
    yValue:"Passengers (Number)",
    xValue:"Airports",
    chartWidth:400,
    chartHeight:400,
    xPos:1900,
    yPos:2050,
    axisColour:"#ffffff",
    barColour:"#E3B505",
    sW:2,
    barWidth:40,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"Horizontal",
    title:"Passengers through Irish airports in Q3 of 2023,\nDublin excluded"
  }

  bdSBarChart = {
    data:birthDeath,
    yValue:"VALUE",
    xValue:"Quarter",
    chartWidth:400,
    chartHeight:400,
    xPos:100,
    yPos:2050,
    axisColour:"#ffffff",
    barColour:["#9B1D20", "#BFAE48", "#BFAE48"],
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:40,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"Stacked",
    title:"Births vs Deaths in Ireland during 2022",
    legend:["Births", "Deaths"]
  }

  bd100BarChart = {
    data:birthDeath,
    yValue:"VALUE",
    xValue:"Quarter",
    chartWidth:400,
    chartHeight:400,
    xPos:700,
    yPos:2050,
    axisColour:"#ffffff",
    barColour:["#08A045", "#0B6E4F"],
    compareBarColour:"#1e00ff",
    sW:2,
    barWidth:40,
    labelTextSize:20,
    labelPadding:10,
    labelColour:"#ffffff",
    labelRotation:PI/2,
    chartType:"100%",
    title:"Ratio of births to deaths in Ireland during 2022",
    legend:["Births", "Deaths"]
  }

  charts.push(new BarChart(vBarChart));

  charts.push(new BarChart(hBarChart));

  charts.push(new BarChart(iSBarChart));

  charts.push(new BarChart(lBarChart));

  charts.push(new BarChart(bBarChart));

  charts.push(new BarChart(gBarChart));

  charts.push(new PieChart(pieChart));

  charts.push(new BarChart(hBarChartAirport))

  charts.push(new BarChart(bdSBarChart))

  charts.push(new BarChart(bd100BarChart))


  charts.forEach(chart => chart.render());
}
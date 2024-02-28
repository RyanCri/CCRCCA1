class BarChart{
    constructor(options) {
        // default values
        const defaults = {
            chartWidth:400,
            chartHeight:400,
            axisColour:"#ffffff",
            barColour:["#FFBA49", "#20A39E", "#cc55ff", "#20A39E"],
            sW:2,
            barWidth:40,
            labelTextSize:20,
            labelPadding:10,
            labelColour:"#ffffff",
            titleSize:25,
            labelRotation:PI/2,
        }
        
        let opts = Object.assign({}, defaults, options);
        this.data = opts.data
        this.yValue = opts.yValue
        this.xValue = opts.xValue
        this.chartWidth = opts.chartWidth
        this.chartHeight = opts.chartHeight
        this.xPos = opts.xPos
        this.yPos = opts.yPos
        this.axisColour = opts.axisColour;
        this.barColour = opts.barColour;
        this.compareBarColour = opts.compareBarColour;
        this.strokeWeight = opts.sW;
        this.barWidth = opts.barWidth;
        this.labelTextSize = opts.labelTextSize;
        this.labelPadding = opts.labelPadding;
        this.labelColour = opts.labelColour;
        this.labelRotation = opts.labelRotation;
        this.chartType = opts.chartType;
        this.titleSize = opts.titleSize;
        this.title = opts.title;
        this.legend = opts.legend;
    }

    render(){
        stroke(this.axisColour);
        strokeWeight(this.strokeWeight);
        push();
        translate(this.xPos, this.yPos);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);

        push(); // this push is for the title of the graph
        translate(this.chartWidth / 2, -this.chartHeight - 70);
        textAlign(CENTER)
        noStroke()
        fill(255)
        textSize(this.titleSize)
        text(this.title, 0, 0)
        pop();

        let numberOfBars; // number of bars in bar chart

        let totals = this.data.map((row => +row[this.yValue])); // the totals for the passed in data
        let scale;
        let gap;

        let colTotal;
        let stack1 = []; // bottom of stacked bar chart
        let allVal = []; // array of all values in data
        let sepVal2 = [];

        let bar = []

        let labels = this.data.map(d => d[this.xValue]) // labels

        if (this.chartType == "Stacked" || this.chartType == "100%" || this.chartType == "Grouped") {
            totals = []; // totals and labels reset for these chart types
            labels = [];
            numberOfBars = this.data.length
            // console.log(this.data)
            for (i = 0; i<numberOfBars; i++) { // for every bar...
                bar = []
                for (let j = 0; j < this.data[i].length; j++) { // for the 2 headers that make up 1 bar...
                    allVal.push(this.data[i][j][this.yValue]) // push the values into 
                    bar.push((this.data[i][j][this.yValue]))
                }

                sepVal2.push(bar)

                colTotal = this.data[i].map((row => +row[this.yValue])) // gives the total value of the bar
                stack1.push(colTotal[0]) // bottom value of bar
                labels.push(this.data[i][0][this.xValue]) // labels
                let total = 0;
                for (let j = 0; j < colTotal.length; j++) {
                    total += colTotal[j]
                }
                totals.push(total) // array of the totals
                // console.log(totals)
            }

            // this code draws the legend with the squares and colours and names
            for (i = 0; i < this.legend.length; i++) {
                push();
                translate(this.chartWidth / 3, 100)
                
                fill(this.barColour[i])
                rectMode(CENTER)
                rect(100*i - 20, -8, 20)

                textSize(20)
                fill(255)
                noStroke()
                text(this.legend[i], 100*i, 0)
                pop();
            }
        } else {
            numberOfBars = this.data.length;
        }

        let maxVal = max(totals);

        //calculates scale and gap of different bar charts
        if (this.chartType == "Horizontal") {
            scale = this.chartWidth / maxVal;
            gap = (this.chartHeight -(numberOfBars * this.barWidth)) / (numberOfBars + 1);
        } else if (this.chartType == "Stacked" || this.chartType == "100%") {
            let h = []
            for (i = 0; i < sepVal2[0].length; i++) {
                h.push(+sepVal2[0][i] + +sepVal2[1][i] + +sepVal2[2][i])
            }
            maxVal = max(totals)
            scale = this.chartHeight / maxVal;
            gap = (this.chartWidth -(numberOfBars * this.barWidth)) / (numberOfBars + 1);
        } else if (this.chartType == "Grouped") {
            maxVal = max(allVal)
            scale = this.chartHeight / maxVal;
            gap = (this.chartWidth -(numberOfBars * (this.barWidth*sepVal2[0].length))) / (numberOfBars + 1);
        } else {
            scale = this.chartHeight / maxVal;
            gap = (this.chartWidth -(numberOfBars * this.barWidth)) / (numberOfBars + 1);
        }

        // draws the bars, vertical or horizontal
        push()
        if (this.chartType == "Horizontal") {
            translate(0, -this.chartHeight)
            translate(0, this.barWidth + gap);
            for (let i = 0; i < numberOfBars; i++) {
                fill(this.barColour);
                rect(0, 0, this.data[i][this.yValue] * scale, -this.barWidth);
                
                // draws labels
                textSize(this.labelTextSize);
                push();
                noStroke();
                translate(-this.barWidth, -this.barWidth / 2);
                rotate(0);
                fill(this.labelColour);
                textAlign(RIGHT, CENTER)
                text (labels[i], this.labelPadding, 0)
                pop();

                translate(0, gap+this.barWidth);
            }
            pop();

            // this draws the vertical elements
            let tickGap = this.chartHeight / 5
            let tickValue = maxVal / 5
            angleMode(RADIANS)
            rotate(PI / 2)
            for (let i = 0; i <= 5; i++) {
                stroke(255);
                line(0, -i*tickGap, 20, -i*tickGap)
                textSize(this.labelTextSize)
                textAlign(LEFT, CENTER)
                noStroke();
                fill(this.labelColour);
                text(round(tickValue*i, 2), 30, -i*tickGap)
            }

            pop();
        } else if (this.chartType == "Vertical") {
            translate(gap, 0);
            for (let i = 0; i < numberOfBars; i++) {
                fill(this.barColour);
                rect(0, 0, this.barWidth, -this.data[i][this.yValue] * scale);                
                
                // draws labels
                textSize(this.labelTextSize);
                push();
                noStroke();
                translate(this.barWidth / 2, 0);
                rotate(this.labelRotation);
                fill(this.labelColour);
                textAlign(LEFT, CENTER)
                text (labels[i], this.labelPadding, 0)
                pop();

                translate(gap+this.barWidth, 0);
            }
            pop();

            // this draws the vertical elements
            let tickGap = this.chartHeight / 5
            let tickValue = maxVal / 5
            for (let i = 0; i <= 5; i++) {
                stroke(255);
                line(0, -i*tickGap, -20, -i*tickGap)
                textSize(this.labelTextSize)
                textAlign(RIGHT, CENTER)
                noStroke();
                fill(this.labelColour);
                text(round(tickValue*i, 2), -20, -i*tickGap)
            }

            pop();
        } else if (this.chartType == "Stacked") {
            translate(gap, 0);
            let h;
            maxVal = maxVal
            for (let i = 0; i < numberOfBars; i++) {
                let col = this.data[i];
                push();
                for (let j = 0; j < sepVal2[0].length; j++) { // this code is not hardcoded but the nature of sepVal limits bars to only 2. Bad.
                    if (j % 2 == 0) {
                        fill(this.barColour[0]);
                    } else {
                        fill(this.barColour[1])
                    }
                    rect(0, 0, this.barWidth, -(sepVal2[i][j] * scale))
                    translate(0, -(sepVal2[i][j] * scale)); // translates up above current bar
                }      
                pop();
  

                // draws labels
                textSize(this.labelTextSize);
                push();
                noStroke();
                translate(this.barWidth / 2, 0);
                rotate(this.labelRotation);
                fill(this.labelColour);
                textAlign(LEFT, CENTER)
                text (labels[i], this.labelPadding, 0)
                pop();

                translate(gap+this.barWidth, 0);
            }
            pop();

            // this draws the vertical elements
            let tickGap = this.chartHeight / 5
            // maxVal = floor(maxVal)
            let tickValue = maxVal / 5
            for (let i = 0; i <= 5; i++) {
                stroke(255);
                line(0, -i*tickGap, -20, -i*tickGap)
                textSize(this.labelTextSize)
                textAlign(RIGHT, CENTER)
                noStroke();
                fill(this.labelColour);
                text(round(tickValue*i, 2), -20, -i*tickGap)
            }

            pop();
        } else if (this.chartType == "100%") {
            translate(gap, 0);
            let percent;
            let h;
            for (let i = 0; i < numberOfBars; i++) {
                push();
                console.log()
                for (let j = 0; j < sepVal2[0].length; j++) { // this code is not hardcoded but the nature of sepVal limits bars to only 2. Bad.
                    if (j % 2 == 0) {
                        fill(this.barColour[0]);
                    } else {
                        fill(this.barColour[1])
                    }
                    scale = this.chartHeight / totals[i];
                    rect(0, 0, this.barWidth, -(sepVal2[i][j] * scale))
                    translate(0, -(sepVal2[i][j] * scale)); // translates up above current bar
                }      
                pop();
                textSize(this.labelTextSize);
                push();
                noStroke();
                translate(this.barWidth / 2, 0);
                rotate(this.labelRotation);
                fill(this.labelColour);
                textAlign(LEFT, CENTER)
                text (labels[i], this.labelPadding, 0)
                pop();

                translate(gap+this.barWidth, 0);
            }
            pop();

            // this draws the vertical elements
            let tickGap = this.chartHeight / 10
            let tickValue = 100 / 10
            for (let i = 0; i <= 10; i++) {
                stroke(255);
                line(0, -i*tickGap, -20, -i*tickGap)
                textSize(this.labelTextSize)
                textAlign(RIGHT, CENTER)
                noStroke();
                fill(this.labelColour);
                text(round(tickValue*i, 2), -20, -i*tickGap)
            }

            pop();
        } else if (this.chartType == "Grouped") {
            translate(gap, 0);
            let h;
            for (let i = 0; i < numberOfBars; i++) {
                let col = this.data[i];
                // fill(this.barColour[0]);
                // rect(0, 0, this.barWidth, -(totals[i] - stack1[i]) * scale); // take away bottom value from total value to give left value
                // translate(this.barWidth, 0)
                // fill(this.barColour[1]); 
                // rect(0, 0, this.barWidth, -stack1[i] * scale) // draw right value 
                push();
                // console.log(sepVal2)
                for (let j = 0; j < sepVal2[0].length; j++) { // this code is not hardcoded but the nature of sepVal limits bars to only 2. Bad.
                    if (j % 2 == 0) {
                        fill(this.barColour[0]);
                    } else {
                        fill(this.barColour[1])
                    }
                    rect(0, 0, this.barWidth, -(sepVal2[i][j] * scale))
                    translate(this.barWidth, 0); // translates up above current bar
                }      
                translate(gap + this.barWidth, 0);

                pop();
                

                // draws labels
                textSize(this.labelTextSize);
                push();
                noStroke();
                translate(this.barWidth / 2, 0);
                rotate(this.labelRotation);
                fill(this.labelColour);
                textAlign(LEFT, CENTER)
                text (labels[i], this.labelPadding, 0)
                pop();

                translate(gap + (this.barWidth*sepVal2[0].length), 0);
            }
            pop();

            // this draws the vertical elements
            let tickGap = this.chartHeight / 5
            let tickValue = maxVal / 5
            for (let i = 0; i <= 5; i++) {
                stroke(127);
                line(0, -i*tickGap, this.chartWidth, -i*tickGap)
                fill(255)
                line(0, -i*tickGap, -20, -i*tickGap)
                textSize(this.labelTextSize)
                textAlign(RIGHT, CENTER)
                noStroke();
                fill(this.labelColour);
                text(round(tickValue*i, 2), -20, -i*tickGap)
            }

            pop();
        } else if (this.chartType == "Line") { // code for line graphs
            translate(-20, 0)
            push();
            translate(-this.chartWidth + 20 + gap, 0); // translate before beginShape as translate does not work in beginShape()
            // if you don't translate here beginShape renders outside of chart

            strokeWeight(5)
            stroke(this.barColour)
            beginShape(LINES);
            let points = [] // empty points array
            points[0] = createVector(gap, -this.data[0][this.yValue] * scale); // create a vector at point 1
            vertex(gap, -this.data[0][this.yValue] * scale) // create a vertex at point 1
            for (let i = 1; i < numberOfBars; i++) { // start for loop on 1...
                fill(this.barColour);

                let prev = points[i-1]; // previous point is current point - 1
                let h = this.data[i][this.yValue] * scale; // height of current point
                let diff = h - (this.data[i-1][this.yValue] * scale) // vertical difference (y co-ord) between previous point and current point
                points[i] = prev.add(createVector((this.barWidth + gap), (-diff))); // create vector at current point by adding to previous vector
                vertex(prev.x, prev.y); // create vertex at previous point
                vertex(points[i].x, points[i].y); // create vertex at current point
            }
            
            for (let i = 0; i < numberOfBars; i++) {

                // draws labels
                push();
                translate(this.chartWidth, 0)
                // rect(50, 600, 0)
                textSize(this.labelTextSize);
                push();
                noStroke();
                translate(this.barWidth / 2, 0);
                rotate(this.labelRotation);
                fill(this.labelColour);
                textAlign(LEFT, CENTER)
                text (labels[i], this.labelPadding, 0)
                pop();
                pop();

                translate(gap+this.barWidth, 0);
            }
            endShape()
            pop();
            pop();

            // this draws the vertical elements
            let tickGap = this.chartHeight / 5
            let tickValue = maxVal / 5
            for (let i = 0; i <= 5; i++) {
                stroke(100)
                line(0, -i*tickGap, this.chartWidth, -i*tickGap)
                stroke(255);
                line(0, -i*tickGap, -20, -i*tickGap)
                
                textSize(this.labelTextSize)
                textAlign(RIGHT, CENTER)
                noStroke();
                fill(this.labelColour);
                text(round(tickValue*i, 2), -20, -i*tickGap)
            }


            pop();
        }
    }
}
class BarChart{
    constructor(obj) {
        this.data = obj.data
        this.yValue = obj.yValue
        this.xValue = obj.xValue
        this.chartWidth = obj.chartWidth
        this.chartHeight = obj.chartHeight
        this.xPos = obj.xPos
        this.yPos = obj.yPos
        this.axisColour = obj.axisColour;
        this.barColour = obj.barColour;
        this.compareBarColour = obj.compareBarColour;
        this.strokeWeight = obj.sW;
        this.barWidth = obj.barWidth;
        this.labelTextSize = obj.labelTextSize;
        this.labelPadding = obj.labelPadding;
        this.labelColour = obj.labelColour;
        this.labelRotation = obj.labelRotation;
        this.chartType = obj.chartType;
        this.title = obj.title;
        this.legend = obj.legend;
    }

    render(){
        stroke(this.axisColour);
        strokeWeight(this.strokeWeight);
        push();
        translate(this.xPos, this.yPos);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);

        push();
        translate(this.chartWidth / 2, -this.chartHeight - 70);
        textAlign(CENTER)
        noStroke()
        fill(255)
        textSize(20)
        text(this.title, 0, 0)
        pop();

        let numberOfBars;

        let totals = this.data.map((row => +row[this.yValue]));
        let scale;
        let gap;

        let colTotal;
        let stack1 = [];

        let labels = this.data.map(d => d[this.xValue])
        console.log(this.data)

        if (this.chartType == "Stacked" || this.chartType == "100%") {
            totals = [];
            labels = [];
            numberOfBars = this.data.length
            for (i = 0; i<numberOfBars; i++) {
                colTotal = this.data[i].map((row => +row[this.yValue]))
                stack1.push(colTotal[0])
                labels.push(this.data[i][0][this.xValue])
                let total = 0;
                for (let j = 0; j < colTotal.length; j++) {
                    total += colTotal[j]
                }
                // let total = colTotal[0] + colTotal[1];
                totals.push(total)
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

        if (this.chartType == "Horizontal") {
            scale = this.chartWidth / maxVal;
            gap = (this.chartHeight -(numberOfBars * this.barWidth)) / (numberOfBars + 1);
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
            rotate(PI/2)
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
            for (let i = 0; i < numberOfBars; i++) {
                let col = this.data[i];
                fill(this.barColour[0]);
                rect(0, 0, this.barWidth, -totals[i] * scale);
                fill(this.barColour[1]);
                rect(0, 0, this.barWidth, -stack1[i] * scale)            

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
        } else if (this.chartType == "100%") {
            translate(gap, 0);
            let percent;
            let h;
            for (let i = 0; i < numberOfBars; i++) {
                let col = this.data[i];
                percent = (stack1[i] / totals[i]) * 100;
                h = (this.chartHeight / 100) * percent;
                fill(this.barColour[0]);
                rect(0, 0, this.barWidth, -this.chartHeight);
                fill(this.barColour[1]);
                rect(0, 0, this.barWidth, -h)            
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
            let tickGap = this.chartHeight / 4
            let tickValue = 100 / 4
            for (let i = 0; i <= 4; i++) {
                stroke(255);
                line(0, -i*tickGap, -20, -i*tickGap)
                textSize(this.labelTextSize)
                textAlign(RIGHT, CENTER)
                noStroke();
                fill(this.labelColour);
                text(round(tickValue*i, 2), -20, -i*tickGap)
            }

            pop();
        } else if (this.chartType == "Line") {
            translate(-20, 0)
            push();
            translate(-this.chartWidth + 20 + gap, 0);

            strokeWeight(5)
            fill(255)
            beginShape(LINES);
            let points = []
            points[0] = createVector(gap, -this.data[0][this.yValue] * scale);
            // console.log(points[0])
            vertex(gap, -this.data[0][this.yValue] * scale)
            for (let i = 1; i < numberOfBars; i++) {
                fill(this.barColour);

                let prev = points[i-1];
                let h = this.data[i][this.yValue] * scale;
                let diff = h - (this.data[i-1][this.yValue] * scale)
                points[i] = prev.add(createVector((this.barWidth + gap), (-diff)));
                vertex(prev.x, prev.y);
                vertex(points[i].x, points[i].y);
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
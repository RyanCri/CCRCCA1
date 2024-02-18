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
        this.strokeWeight = obj.sW;
        this.barWidth = obj.barWidth;
        this.labelTextSize = obj.labelTextSize;
        this.labelPadding = obj.labelPadding;
        this.labelColour = obj.labelColour;
        this.labelRotation = obj.labelRotation;
        this.chartType = obj.chartType;
    }

    render(){
        stroke(this.axisColour);
        strokeWeight(this.strokeWeight);
        push();
        translate(this.xPos, this.yPos);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);

        let numberOfBars = this.data.length;

        let totals = this.data.map((row => +row[this.yValue]));
        let maxVal = max(totals);
        let scale;
        let gap;

        if (this.chartType == "Horizontal") {
            scale = this.chartWidth / maxVal;
            gap = (this.chartHeight -(numberOfBars * this.barWidth)) / (numberOfBars + 1);
        } else {
            scale = this.chartHeight / maxVal;
            gap = (this.chartWidth -(numberOfBars * this.barWidth)) / (numberOfBars + 1);
        }

        let labels = this.data.map(d => d[this.xValue])

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
        }
    }
}
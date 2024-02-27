class PieChart{
    constructor(options) {

        // default values
        const defaults = {
            chartRadius:200,
            sliceColours:["#157F1F", "#4CB963", "#A0EADE", "#5C6784", "#1D263B"],
            sliceValDisplay:true,
            strokeWeight:2,
            legendTextSize: 20,
            legendColour: 255,
            legendStroke: 255,
            legendRotation: 0,
            titleSize: 20,
        }

        let opts = Object.assign({}, defaults, options);
        this.data = opts.data
        this.sliceValue = opts.sliceValue
        this.sliceData = opts.sliceData
        this.sliceSource = opts.sliceSource
        this.chartRadius = opts.chartRadius
        this.xPos = opts.xPos
        this.yPos = opts.yPos
        this.sliceColours = opts.sliceColours
        this.sliceValDisplay = opts.sliceValDisplay
        this.title = opts.title;
        this.strokeWeight = opts.sW;
        this.legendTextSize = opts.legendTextSize;
        this.legendColour = opts.legendColour;
        this.legendStroke = opts.legendStroke;
        this.legendRotation = opts.legendRotation
        this.titleSize = opts.titleSize
    }

    render(){
        angleMode(DEGREES)
        
        
        let c = 360;

        let slices = [];
        let totals = [];

        const initialValue = 0;

        // divides the data up by slices, and then gets the total values for those slices
        for (i = 0; i < this.sliceData.length; i++) {
            slices[i] = this.data.filter(d => d[this.sliceSource] == this.sliceData[i])
            let slice = [];
            for (let j = 0; j < slices[i].length; j ++) {
                slice.push(+slices[i][j][this.sliceValue])
            }
            totals.push(slice.reduce((a, b) => a + b, initialValue))
        }

        let total = totals.reduce((a, b) => a + b, 0);
        let angles = [];
        
        // calculates angles
        for (i = 0; i < totals.length; i++) {
            let slice = totals[i] / total;
            angles.push(slice * c);
        }

        // draws circle
        push();
        translate(this.xPos, this.yPos);

        let lastAngle = 0;
        for (let i = 0; i < slices.length; i++) {
            strokeWeight(this.strokeWeight)
            stroke(255)
            fill(this.sliceColours[i]);
            arc(this.chartRadius, this.chartRadius, this.chartRadius * 2, this.chartRadius * 2, lastAngle, lastAngle + angles[i])
            lastAngle += angles[i]
        }

        // labels and legend
        push();
        translate(this.chartRadius, - 70);
        textAlign(CENTER)
        noStroke()
        fill(this.legendColour)
        textSize(this.titleSize)
        text(this.title, 0, 0)
        pop();
        
        // draws legend and legend boxes
        rectMode(CENTER)
        translate(this.chartRadius / 2, this.chartRadius * 2 + 50)
        for (i = 0; i < this.sliceData.length; i++) {
            textAlign(LEFT)
            fill(this.sliceColours[i])
            stroke(this.legendStroke)
            rect(0, 0, 25)
            noStroke()
            textSize(this.legendTextSize)
            fill(this.legendColour)
            text(this.sliceData[i], 50, 10)
            if (this.sliceValDisplay == true) {
                textAlign(RIGHT)
                text(totals[i], 250, 10)
            }
            translate(0, 40)
        }
        pop();
    }
}
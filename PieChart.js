class PieChart{
    constructor(obj) {
        this.data = obj.data
        this.sliceValue = obj.sliceValue
        this.sliceData = obj.sliceData
        this.sliceSource = obj.sliceSource
        this.chartRadius = obj.chartRadius
        this.xPos = obj.xPos
        this.yPos = obj.yPos
        this.sliceColours = obj.sliceColours
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
            // let gray = map(i, 0, slices.length, 0, 255)
            fill(this.sliceColours[i]);
            arc(this.chartRadius, this.chartRadius, this.chartRadius, this.chartRadius, lastAngle, lastAngle + angles[i])
            lastAngle += angles[i]
        }
        pop();
    }
}
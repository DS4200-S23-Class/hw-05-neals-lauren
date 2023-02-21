// Setting up constant variables 
const F_HEIGHT = 500;
const F_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = F_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = F_WIDTH - MARGINS.left - MARGINS.right;

// frame for vis 1(left column)
const FRAME1 = d3.select("#column1")
					.append("svg")
						.attr("height", F_HEIGHT)
						.attr("width", F_WIDTH)
						.attr("class", "frame");

// read from scatter-data.csv
d3.csv("data/scatter-data.csv").then((data) => {
	console.log(data);

	const X_SCALE = d3.scaleLinear()
						.domain([0, 10])
						.range(0, VIS_WIDTH)

	// add x-axis to vis
		FRAME1.append("g")
	      		.attr("transform", "translate(" + MARGINS.left+ "," + (VIS_HEIGHT + MARGINS.top) + ")")
	      		.call(d3.axisBottom(X_SCALE).ticks(10));

	// add y-axis to vis
	FRAME1.append("g")
	      	.attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.top) + ")")
	      	.call(d3.axisLeft(Y_SCALE).ticks(10));


})




// read data for barchart
d3.csv("data/bar-data.csv", then((data) => {
	console.log(data);


	
}))


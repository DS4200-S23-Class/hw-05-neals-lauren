// Setting up constant variables 
const F_HEIGHT = 500;
const F_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = F_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = F_WIDTH - MARGINS.left - MARGINS.right;

// frame for vis 1(left column)
const FRAME1 = d3.select("#row1")
					.append("svg")
						.attr("height", F_HEIGHT)
						.attr("width", F_WIDTH)
						.attr("class", "frame");

// read from scatter-data.csv
d3.csv("data/scatter-data.csv").then((data) => {
	console.log(data);

	const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });
	const MAX_Y = d3.max(data, (d) => { return parseInt(d.y); });

	const X_SCALE = d3.scaleLinear()
						.domain([0, 10])
						.range([0, VIS_WIDTH])

	const Y_SCALE = d3.scaleLinear()
						.domain([0,10])
						.range([VIS_HEIGHT,0])


	// add x-axis to vis
	FRAME1.append("g")
	      	.attr("transform", "translate(" + MARGINS.left+ "," + (VIS_HEIGHT + MARGINS.top) + ")")
	      	.call(d3.axisBottom(X_SCALE).ticks(10));

	// add y-axis to vis
	FRAME1.append("g")
	      	.attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.top) + ")")
	      	.call(d3.axisLeft(Y_SCALE).ticks(10));

	// Use X_SCALE to plot our points
    FRAME1.selectAll("points")  
        .data(data) // passed from .then  
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE(d.y) + MARGINS.top); }) 
          .attr("r", 10)
          .attr("class", "point");



})


// frame for bar graph(left column)
const FRAME2 = d3.select("#row2")
          .append("svg")
            .attr("height", F_HEIGHT)
            .attr("width", F_WIDTH)
            .attr("class", "frame");


// read from bar-data.csv
d3.csv("data/bar-data.csv").then((data) => {
	console.log(data)

    // scaling
    // find max X and max Y
    const MAX_X = d3.max(data, (d, i) => { return parseInt(d.category); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.amount); });

    const X_SCALE = d3.scaleBand()
            .domain(["A", "B", "C", "D", "E", "F", "G"])
            .range([0, VIS_WIDTH])

    const Y_SCALE = d3.scaleLinear()
            .domain([0,100])
            .range([VIS_HEIGHT, 0])

    // plot our points
    FRAME2.selectAll("bars")  
        .data(data) 
        .enter()       
        .append("rect")  
          .attr("x", (d) => { return (X_SCALE(d.category) + MARGINS.left + 10); }) 
          .attr("y", (d) => { return (Y_SCALE(d.amount) + MARGINS.top); }) 
          .attr("width", 40)
          .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE(d.amount)})
          .attr("class", "bar")
          .style("fill", "blue");


   // To add a tooltip, we will need a blank div that we 
   //  fill in with the appropriate text. Be use to note the
   //  styling we set here and in the .css
   const TOOLTIP = d3.select("#row2")
                       .append("div")
                         .attr("class", "tooltip")
                         .style("opacity", 0); 

    // Define event handler functions for tooltips
    function handleMouseover(event, d) {
      // on mouseover, make opaque 
      TOOLTIP.style("opacity", 1); 
   
    }

    function handleMousemove(event, d) {
      // position the tooltip and fill in information 
      TOOLTIP.html("Category: " + d.category + "<br>Value: " + d.amount)
              .style("left", (event.pageX + 10) + "px") //add offset
                                                          // from mouse
              .style("top", (event.pageY - 50) + "px"); 

    }

    function handleMouseleave(event, d) {
      // on mouseleave, make transparant again 
      TOOLTIP.style("opacity", 0); 
    } 

    // Add event listeners
    FRAME2.selectAll(".bar")
          .on("mouseover", handleMouseover) //add event listeners
          .on("mousemove", handleMousemove)
          .on("mouseleave", handleMouseleave);    

    // add x-axis to vis
    FRAME2.append("g")
            .attr("transform", "translate(" + MARGINS.left+ "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE).ticks(10));

  	// add y-axis to vis
 	FRAME2.append("g")
          .attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.top) + ")")
          .call(d3.axisLeft(Y_SCALE).ticks(10));
})

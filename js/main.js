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
          .attr("class", "point")
          .style("fill", "pink");

    // highlight on mouseover
    function handleMouseover(event, d) {
      d3.select(this).style("fill", "green");
    }

     // unhighlight on mouseleave
    function handleMouseleave(event, d) {
      d3.select(this).style("fill", "pink");
    }

    // add border and update last point when clicked
    function clickPoint(event, d) {
      
      // add/remove border when clicked
      if(d3.select(this).style("stroke-width") == "5") {
        d3.select(this).style("stroke-width", "0");
      } else {
        d3.select(this).style("stroke-width", "5")
                       .style("stroke", "blue");
      }

      // update coordinates of most recently clicked point
      let newText = "(" + d.x +", " + d.y + ")";
      document.getElementById("button-div").innerHTML = newText;

    }

    // add new points
    function createNewPoint() {
      // getting a selected x value 
      let xvals = document.getElementById("x-coord");
      let xselected = xvals.options[xvals.selectedIndex].value;

      // getting a selected y value
      let yvals = document.getElementById("y-coord");
      let yselected = yvals.options[yvals.selectedIndex].value;

      FRAME1.append("circle")
              .attr("cx", (X_SCALE(xselected) + MARGINS.left))
              .attr("cy", (Y_SCALE(yselected) + MARGINS.top))
              .attr("r", 10)
              .attr("class", "point")
              .style("fill", "pink");

    }

    document.getElementById("subButton").addEventListener('click', createNewPoint);

    // add event listeners to the frame
    FRAME1.selectAll("circle")
                      .on("mouseover", handleMouseover)
                      .on("mouseleave", handleMouseleave)
                      .on("click", clickPoint);

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


   // adding a tooltip
   const TOOLTIP = d3.select("#row2")
                       .append("div")
                         .attr("class", "tooltip")
                         .style("opacity", 0); 

    // highlight and show tooltip on mouseover
    function handleMouseover(event, d) {
      d3.select(this).style("fill", "orange");
      TOOLTIP.style("opacity", 1); 
   
    }


    function handleMousemove(event, d) {
      // position the tooltip and fill in information 
      TOOLTIP.html("Category: " + d.category + "<br>Value: " + d.amount)
      //adding offset from where the mouse hovers
              .style("left", (event.pageX + 0.5) + "px")                                                
              .style("top", (event.pageY - 0.5) + "px"); 

    }

    // unhighlight and remove tooltip when mouseleave
    function handleMouseleave(event, d) {
      d3.select(this).style("fill", "blue");
      TOOLTIP.style("opacity", 0); 
    } 

    // Add event listeners to the frame
    FRAME2.selectAll(".bar")
          .on("mouseover", handleMouseover) 
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

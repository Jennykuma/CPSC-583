/**
 * Created by Jennykuma on 2017-09-28.
 */

// Set dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleLinear().range([0, width - 100]);
var y = d3.scaleLinear().range([height, 0]);

// Define axes
var x_axis = d3.axisBottom() // x axis
    .scale(x)
    .ticks(30)
    .tickFormat(d3.format("d")); // remove commas from numbers in the thousands (years)

var y_axis = d3.axisLeft() // y axis
    .scale(y)
    .ticks(13);

// Gridlines
function x_gridlines() {
    return d3.axisBottom(x)
        .ticks(5)
}
function y_gridlines() {
    return d3.axisLeft(y)
        .ticks(7)
}

// Add SVG
var vis = d3.select("#scatterPlot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get data
d3.csv("data/1987-2017.csv", function(error, data) {
    data.forEach(function(d){
        d.year = +d.year;
        d.na_value = +d.na_value;
        d.as_value = +d.as_value;
    });

    // Scale range of the data
    x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function (d) { return d.year; })]);
    y.domain([d3.min(data, function (d) { return d.na_value*-1; }), d3.max(data, function (d) {return d.na_value; })]);


    // Add x axis
    vis.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height/2 + ")")
        .call(x_axis)
        .selectAll("text") // years text settings
        .style("text-anchor", "end") //  text alignment
        .attr("dx", "-0.7em") // x position
        .attr("dy", "+0.10em") // y position
        .attr("transform", "rotate(-45)" ); // transform by rotating

    // Add y axis
    vis.append("g")
        .attr("class", "y axis")
        .call(y_axis);

    // Add x gridline
    vis.append("g")
        .attr("class", "grid") // x gridline
        .attr("transform", "translate(0," + height + ")")
        .call(x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        );

    // Add y gridline
    vis.append("g")
        .attr("class", "grid")
        .call(y_gridlines() // y gridline
            .tickSize(-width)
            .tickFormat("")
        )

    // Add x label
    vis.append("text")
        .attr("class", "label") // x label
        .attr("transform",
            "translate(" + (width-60) + " ," + (height/2) + ")") // fullwidth-70  & height/2
        .style("text-anchor", "end") //  text alignment
        .text("Year");

    // Add y label
    vis.append("text")
        .attr("class", "label") // y label
        .attr("transform", "rotate(-90)") // rotate 90 degrees
        .attr("y", 0 - margin.left + 10) // y position
        .attr("x", 0 - (height/2)) // x position
        .attr("dy", "1em") // relative to x coord
        .attr("text-anchor", "middle") // text alignment
        .text("Anomaly Value");

    // Add the tooltip container to container-fluid
    // it's invisible and its position/contents are defined during mouseover
    var tooltip = d3.select("#scatterPlot")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // when the mouse is on the data point
    var mouseOver = function(d) {
        var yearString = "Year: ";
        var valueString = "Anomaly: ";
        var year = yearString.fontcolor("#107896");
        var value = valueString.fontcolor("#C02F1D");
        var result = year + d.year + "<br/>" + value + d.na_value + "<br/>";

        tooltip.html(result)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .style("padding", "5px")
            .transition()
            .duration(200) // ms
            .style("opacity", .9) // started as 0!

    };
    // when the mouse leaves the data point
    var mouseLeave = function(d) {
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };
    // draw the dots
    vis.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", function(d) { return 25 * Math.sqrt(Math.abs(d.na_value) / Math.PI); }) // radius of circle
        .attr("cx", function(d) { return x(d.year); }) // x position
        .attr("cy", function(d) { return y(d.na_value); }) // y position
        .style("fill-opacity", .8) // set fill opacity
        .style("stroke", "none")    // set line colour
        .style("fill", "white")   // set fill colour
        .style("opacity", 0) // set the graph dots to be none
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave);
});

// booleans for line graph
var na_active = 0;
var as_active = 0;
var eu_active = 0;
var ou_active = 0;
var af_active = 0;
var sa_active = 0;

function na(){ // North America
    toggle_off(); // if the dots are already connected, toggle it off once NA is selected
    na_active = 1; // na toggle on
    as_active = 0;
    eu_active = 0;
    ou_active = 0;
    af_active = 0;
    sa_active = 0;

    // Get data again
    d3.csv("data/1987-2017.csv", function(error, data) {
        data.forEach(function(d) {
            d.year = +d.year;
            d.na_value = +d.na_value;
            d.na_avg = +d.na_avg;

            console.log(d.year);
        });

        // Scale range of the data
        x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function (d) { return d.year; })]);
        y.domain([d3.min(data, function(d) { return d.na_value*-1; }), d3.max(data, function (d) {return d.na_value; })]);

        // create tooltip
        var tooltip = d3.select("#scatterPlot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 10);

        vis = d3.select("#scatterPlot").transition(); // transition
        vis.select(".x.axis") // change x axis values
            .duration(750)
            .call(x_axis);
        vis.select(".y.axis") // change y axis values
            .duration(750)
            .call(y_axis);
        vis.selectAll("circle") // draw the circles again
            .duration(750)
            .attr("r", function(d) { return 25 * Math.sqrt(Math.abs(d.na_value) / Math.PI); }) // radius of circle
            .attr("cx", function(d) { return x(d.year); }) // x position
            .attr("cy", function(d) { return y(d.na_value); }) // y position
            .style("fill-opacity", .8) // set fill opacity
            .style("stroke", "none")   // set line colour
            .style("fill", "white")   // set fill colour
            .style("opacity", 100) // set the graph dots to show

        var vis2 = d3.select("#scatterPlot").selectAll("circle");
        vis2.on("mouseover",function(d){ // when mouse is on the data point
            var yearString = "Year: ";
            var valueString = "Anomaly: ";
            var year = yearString.fontcolor("#107896");
            var value = valueString.fontcolor("#C02F1D");
            var result = year + d.year + "<br/>" + value + d.na_value + "<br/>";

            tooltip.html(result)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("padding", "5px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        })
            .on("mouseleave",function(d){ // when mouse leaves the data point
                tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0);
            });

    });
}

function as(){ // Asia
    toggle_off()
    na_active = 0;
    as_active = 1; // asia toggle on
    eu_active = 0;
    ou_active = 0;
    af_active = 0;
    sa_active = 0;

    // Get data again
    d3.csv("data/1987-2017.csv", function(error, data) {
        data.forEach(function(d) {
            d.year = +d.year;
            d.as_value = +d.as_value;

            console.log(d.year);
        });

        // Scale range of the data
        x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function (d) { return d.year; })]);
        y.domain([d3.min(data, function(d) { return d.as_value*-1; }), d3.max(data, function (d) {return d.as_value; })]);

        // create tooltip
        var tooltip = d3.select("#scatterPlot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 10);

        vis = d3.select("#scatterPlot").transition();
        vis.select(".x.axis") // change x axis values
            .duration(750)
            .call(x_axis);
        vis.select(".y.axis") // change y axis values
            .duration(750)
            .call(y_axis);
        vis.selectAll("circle") // draw the circles
            .duration(750)
            .attr("r", function(d) { return 25 * Math.sqrt(Math.abs(d.as_value) / Math.PI); }) // radius of circle
            .attr("cx", function(d) { return x(d.year); }) // x position
            .attr("cy", function(d) { return y(d.as_value); })
            .style("fill-opacity", .8) // set fill opacity
            .style("stroke", "none")   // set line colour
            .style("fill", "white")   // set fill colour
            .style("opacity", 100) // set the graph dots to show

        var vis2 = d3.select("#scatterPlot").selectAll("circle");
        vis2.on("mouseover",function(d){ // mouse on data point
            var yearString = "Year: ";
            var valueString = "Anomaly: ";
            var year = yearString.fontcolor("#107896");
            var value = valueString.fontcolor("#C02F1D");
            var result = year + d.year + "<br/>" + value + d.as_value + "<br/>";

            tooltip.html(result)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("padding", "5px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        })
            .on("mouseleave",function(d){ // mouse leaves data point
                tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0);
            });
    });
}

function eu(){ // Europe
    toggle_off();
    na_active = 0;
    as_active = 0;
    eu_active = 1; // europe toggle on
    ou_active = 0;
    af_active = 0;
    sa_active = 0;

    // Get data again
    d3.csv("data/1987-2017.csv", function(error, data) {
        data.forEach(function(d) {
            d.year = +d.year;
            d.eu_value = +d.eu_value;

            console.log(d.year);
        });

        // Scale range of the data
        x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function (d) { return d.year; })]);
        y.domain([d3.min(data, function(d) { return d.eu_value*-1; }), d3.max(data, function (d) {return d.eu_value; })]);

        // create tool tip
        var tooltip = d3.select("#scatterPlot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 10);

        vis = d3.select("#scatterPlot").transition();
        vis.select(".x.axis") //  change x axis values
            .duration(750)
            .call(x_axis);
        vis.select(".y.axis") // change y axis values
            .duration(750)
            .call(y_axis);
        vis.selectAll("circle") // draw circles
            .duration(750)
            .attr("r", function(d) { return 25 * Math.sqrt(Math.abs(d.eu_value) / Math.PI); }) // radius of circle
            .attr("cx", function(d) { return x(d.year); }) // x position
            .attr("cy", function(d) { return y(d.eu_value); })
            .style("fill-opacity", .8) // set fill opacity
            .style("stroke", "none")   // set line colour
            .style("fill", "white")   // set fill colour
            .style("opacity", 100) // set the graph dots to show

        var vis2 = d3.select("#scatterPlot").selectAll("circle");
        vis2.on("mouseover",function(d){ // mouse on data point
            var yearString = "Year: ";
            var valueString = "Anomaly: ";
            var year = yearString.fontcolor("#107896");
            var value = valueString.fontcolor("#C02F1D");
            var result = year + d.year + "<br/>" + value + d.eu_value + "<br/>";

            tooltip.html(result)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("padding", "5px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        })
            .on("mouseleave",function(d){ // mouse leave data point
                tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0);
            });
    });
}

function oc(){ // Oceania
    toggle_off();
    na_active = 0;
    as_active = 0;
    eu_active = 0;
    ou_active = 1; // oceania toggle on
    af_active = 0;
    sa_active = 0;

    // Get data again
    d3.csv("data/1987-2017.csv", function(error, data) {
        data.forEach(function(d) {
            d.year = +d.year;
            d.ou_value = +d.ou_value;

            console.log(d.year);
        });

        // Scale range of the data
        x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function (d) { return d.year; })]);
        y.domain([d3.min(data, function(d) { return d.ou_value*-1; }), d3.max(data, function (d) {return d.ou_value; })]);

        // create tool tip
        var tooltip = d3.select("#scatterPlot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 10);

        vis = d3.select("#scatterPlot").transition();
        vis.select(".x.axis") // change x axis values
            .duration(750)
            .call(x_axis);
        vis.select(".y.axis") // change y axis values
            .duration(750)
            .call(y_axis);
        vis.selectAll("circle") // draw circles
            .duration(750)
            .attr("r", function(d) { return 25 * Math.sqrt(Math.abs(d.ou_value) / Math.PI); }) // radius of circle
            .attr("cx", function(d) { return x(d.year); }) // x position
            .attr("cy", function(d) { return y(d.ou_value); })
            .style("fill-opacity", .8) // set fill opacity
            .style("stroke", "none")   // set line colour
            .style("fill", "white")   // set fill colour
            .style("opacity", 100) // set the graph dots to show

        var vis2 = d3.select("#scatterPlot").selectAll("circle");
        vis2.on("mouseover",function(d){ // mouse on data point
            var yearString = "Year: ";
            var valueString = "Anomaly: ";
            var year = yearString.fontcolor("#107896");
            var value = valueString.fontcolor("#C02F1D");
            var result = year + d.year + "<br/>" + value + d.ou_value + "<br/>";

            tooltip.html(result)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("padding", "5px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        })
            .on("mouseleave",function(d){ // mouse leaves data point
                tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0);
            });
    });
}

function af(){
    toggle_off();
    na_active = 0;
    as_active = 0;
    eu_active = 0;
    ou_active = 0;
    af_active = 1; // africa toggle on
    sa_active = 0;

    // Get data again
    d3.csv("data/1987-2017.csv", function(error, data) {
        data.forEach(function(d) {
            d.year = +d.year;
            d.af_value = +d.af_value;

            console.log(d.year);
        });

        // Scale range of the data
        x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function (d) { return d.year; })]);
        y.domain([d3.min(data, function(d) { return d.af_value*-1; }), d3.max(data, function (d) {return d.af_value; })]);

        // create tool tip
        var tooltip = d3.select("#scatterPlot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 10);

        vis = d3.select("#scatterPlot").transition();
        vis.select(".x.axis") // change x axis values
            .duration(750)
            .call(x_axis);
        vis.select(".y.axis") // change y axis values
            .duration(750)
            .call(y_axis);
        vis.selectAll("circle") // draw circles
            .duration(750)
            .attr("r", function(d) { return 25 * Math.sqrt(Math.abs(d.af_value) / Math.PI); }) // radius of circle
            .attr("cx", function(d) { return x(d.year); }) // x position
            .attr("cy", function(d) { return y(d.af_value); })
            .style("fill-opacity", .8) // set fill opacity
            .style("stroke", "none")   // set line colour
            .style("fill", "white")   // set fill colour
            .style("opacity", 100) // set the graph dots to show


        var vis2 = d3.select("#scatterPlot").selectAll("circle");
        vis2.on("mouseover",function(d){ // mouse on data point
            var yearString = "Year: ";
            var valueString = "Anomaly: ";
            var year = yearString.fontcolor("#107896");
            var value = valueString.fontcolor("#C02F1D");
            var result = year + d.year + "<br/>" + value + d.af_value + "<br/>";

            tooltip.html(result)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("padding", "5px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        })
            .on("mouseleave",function(d){ // mouse leaves data point
                tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0);
            });
    });
}

function sa(){
    toggle_off();
    na_active = 0;
    as_active = 0;
    eu_active = 0;
    ou_active = 0;
    af_active = 0;
    sa_active = 1; // south america toggle

    // Get data again
    d3.csv("data/1987-2017.csv", function(error, data) {
        data.forEach(function(d) {
            d.year = +d.year;
            d.sa_value = +d.sa_value;

            console.log(d.year);
        });

        // Scale range of the data
        x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function (d) { return d.year; })]);
        y.domain([d3.min(data, function(d) { return d.sa_value*-1; }), d3.max(data, function (d) {return d.sa_value; })]);

        // create tool tip
        var tooltip = d3.select("#scatterPlot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 10);

        vis = d3.select("#scatterPlot").transition();
        vis.select(".x.axis") // change x axis values
            .duration(750)
            .call(x_axis);
        vis.select(".y.axis") // change y axis values
            .duration(750)
            .call(y_axis);
        vis.selectAll("circle") // draw circles
            .duration(750)
            .attr("r", function(d) { return 25 * Math.sqrt(Math.abs(d.sa_value) / Math.PI); }) // radius of circle
            .attr("cx", function(d) { return x(d.year); }) // x position
            .attr("cy", function(d) { return y(d.sa_value); })
            .style("fill-opacity", .8) // set fill opacity
            .style("stroke", "none")   // set line colour
            .style("fill", "white")   // set fill colour
            .style("opacity", 100) // set the graph dots to show

        var vis2 = d3.select("#scatterPlot").selectAll("circle");
        vis2.on("mouseover",function(d){ // mouse on data point
            var yearString = "Year: ";
            var valueString = "Anomaly: ";
            var year = yearString.fontcolor("#107896");
            var value = valueString.fontcolor("#C02F1D");
            var result = year + d.year + "<br/>" + value + d.sa_value + "<br/>";

            tooltip.html(result)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("padding", "5px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        })
            .on("mouseleave",function(d){ // mouse leaves data point
                tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0);
            });
    });
}

function toggle_on(){ // create line graph and connect the dots

    d3.csv("data/1987-2017.csv", function(error, data) {
        data.forEach(function (d) {
        });

        if (na_active == 1){ // if na toggle on
            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.na_value);
                });

            var vis2 = d3.select("#scatterPlot").select("g");
            vis2.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        } else if (as_active == 1){ // if asia toggle on
            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.as_value);
                });

            var vis2 = d3.select("#scatterPlot").select("g");
            vis2.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        } else if (eu_active == 1){ // if europe toggle on
            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.eu_value);
                });
            var vis2 = d3.select("#scatterPlot").select("g");
            vis2.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
        } else if (ou_active == 1){ // if oceania toggle on
            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.ou_value);
                });
            var vis2 = d3.select("#scatterPlot").select("g");
            vis2.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        } else if (af_active == 1){ // if africa toggle on
            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.af_value);
                });
            var vis2 = d3.select("#scatterPlot").select("g");
            vis2.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        } else if (sa_active == 1){ // if south africa toggle on
            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.sa_value);
                });
            var vis2 = d3.select("#scatterPlot").select("g");
            vis2.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        }else{
            var line = d3.line()
                .x(function(d) {
                    return x(d.year);
                })
                .y(function(d) {
                    return y(d.na_value);
                });
            var vis2 = d3.select("#scatterPlot").select("g");
            vis2.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
            vis.append("path") // draw the path
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
        }
    });
}


function toggle_off(){ // remove the line
    d3.select(".line").remove();
}
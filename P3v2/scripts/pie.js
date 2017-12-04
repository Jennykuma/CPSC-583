
var width = 700,
    height = 600,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(['#C6E2FF','#FFC0CB','#CAFF70','#FFE4C4','#FFA07A','#b19cf9','#FFEC8B', '#E6E6FA', '#EED2EE', '#F5DEB3', '#E5DACE', '#edfafd', '#FFE4E1', '#C1FFC1' ]);

var pie = d3.pie()
    .value(function(d) { return d.yr2010; })
    .sort(null);

var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - 20);

var tooltip = d3.select(".pieChart")
    .append('div')
    .attr('class', 'tooltip');
tooltip.append('div')
    .attr('class', 'label');
tooltip.append('div')
    .attr('class', 'percent');

var svg = d3.select(".pieChart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("text")
    .attr("x", -310)
    .attr("y",  -246)
    .attr("text-anchor", "middle")
    .style("fill", "#000")
    .style("font-size", "30px")
    .style("text-decoration", "underline")
    .text("2010");

/*
svg.append("text")
    .attr("x", -300)
    .attr("y", 400)
    .attr("text-anchor", "left")
    .style("fill", "#000")
    .style("font-size", "15px")
    .attr("id", "bottomInfo")
    .text("** If you hover over a part of the chart, then the market share percentage will be shown! ");
    */

d3.tsv("data/test2.tsv", type, function(error, data) {
    if (error) throw error;

    var path = svg.datum(data).selectAll("path")
        .data(pie)
        .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("stroke", "#fff")
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial angles

    path.on('mouseover', function(d) {
        if(document.getElementById('yr2010').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2010 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }else if(document.getElementById('yr2011').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2011 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }else if(document.getElementById('yr2012').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2012 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }else if(document.getElementById('yr2013').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2013 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }else if(document.getElementById('yr2014').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2014 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }else if(document.getElementById('yr2015').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2015 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }else if(document.getElementById('yr2016').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2016 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }else if(document.getElementById('yr2017').checked) {
            tooltip.select('.label').html(d.data.company).style('color', 'black');
            tooltip.select('.percent').html(d.data.yr2017 + "%").style('color', 'black');
            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);
        }
    });

    path.on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
            .style('left', (d3.event.layerX - 25) + 'px');
    });

    path.on('mouseout', function() {
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });


    d3.selectAll("input")
        .on("change", change);

    var timeout = setTimeout(function() {
        //d3.select("input[value=\"yr2010\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
        var value = this.value;
        clearTimeout(timeout);
        pie.value(function(d) { return d[value]; }); // change the value function
        path = path.data(pie); // compute the new angles
        path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    }
});

function type(d) {
    d.company = d.company;
    d.yr2010 = +d.yr2010;
    d.yr2011 = +d.yr2011;
    d.yr2012 = +d.yr2012;
    d.yr2013 = +d.yr2013;
    d.yr2014 = +d.yr2014;
    d.yr2015 = +d.yr2015;
    d.yr2016 = +d.yr2016;
    d.yr2017 = +d.yr2017;
    return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}

function changeText(){
    if(document.getElementById('yr2010').checked) {
        d3.select("text").text("2010");
       // d3.select("#bottomInfo").text("sjdhskajhdkjas");
    }else if(document.getElementById('yr2011').checked) {
        d3.select("text").text("2011");
       // d3.select("#bottomInfo").text("d");
    }else if(document.getElementById('yr2012').checked) {
        d3.select("text").text("2012");
       // d3.select("#bottomInfo").text("c");
    }else if(document.getElementById('yr2013').checked) {
        d3.select("text").text("2013");
       // d3.select("#bottomInfo").text("e");
    }else if(document.getElementById('yr2014').checked) {
        d3.select("text").text("2014");
       // d3.select("#bottomInfo").text("f");
    }else if(document.getElementById('yr2015').checked) {
        d3.select("text").text("2015");
       // d3.select("#bottomInfo").text("j");
    }else if(document.getElementById('yr2016').checked) {
        d3.select("text").text("2016");
       // d3.select("#bottomInfo").text("k");
    }else if(document.getElementById('yr2017').checked) {
        d3.select("text").text("2017");
       // d3.select("#bottomInfo").text("t");
    }
}

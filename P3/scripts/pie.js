
var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var pie = d3.pie()
    .value(function(d) { return d.yr2010; })
    .sort(null);

var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - 20);

var tooltip = d3.select("body")
    .append('div')
    .attr('class', 'tooltip');
tooltip.append('div')
    .attr('class', 'label');
tooltip.append('div')
    .attr('class', 'percent');

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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
        console.log(d.data);
        tooltip.select('.label').html(d.data.company).style('color','black');
        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

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

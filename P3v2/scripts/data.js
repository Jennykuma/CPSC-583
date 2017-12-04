var w = 600,
    h = 600;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['2010','2011', '2012', '2013', '2014', '2015', '2016', '2017'];

//Data
var d = [
    [
        {axis:"Samsung",value:7.025},
        {axis:"Apple",value:15.4},
        {axis:"Other",value:20.375},
        {axis:"LG",value:0},
        {axis:"Lenovo",value:0},
        {axis:"ZTE",value:0},
        {axis:"Huawei",value:0},
        {axis:"OPPO",value:0},
        {axis:"vivo",value:0},
        {axis:"Xiaomi",value:0},
        {axis:"Sony",value:0},
        {axis:"RIM",value:16.45},
        {axis:"HTC",value:6.825},
        {axis:"Nokia",value:33.925},
    ],[
        {axis:"Samsung",value:18.375},
        {axis:"Apple",value:18.475},
        {axis:"Other",value:23},
        {axis:"LG",value:0},
        {axis:"Lenovo",value:0},
        {axis:"ZTE",value:2.275},
        {axis:"Huawei",value:0.875},
        {axis:"OPPO",value:0},
        {axis:"vivo",value:0},
        {axis:"Xiaomi",value:0},
        {axis:"Sony",value:0.975},
        {axis:"RIM",value:10.7},
        {axis:"HTC",value:9.075},
        {axis:"Nokia",value:16.25},
    ],[
        {axis:"Samsung",value:30.29772},
        {axis:"Apple",value:18.73905},
        {axis:"Other",value:20.94070553},
        {axis:"LG",value:3.627721},
        {axis:"Lenovo",value:2.727045},
        {axis:"ZTE",value:4.228171},
        {axis:"Huawei",value:3.952964724},
        {axis:"OPPO",value:0},
        {axis:"vivo",value:0},
        {axis:"Xiaomi",value:0},
        {axis:"Sony",value:4.378283713},
        {axis:"RIM",value:3.902927195},
        {axis:"HTC",value:3.602702027},
        {axis:"Nokia",value:3.602702027},
    ],[
        {axis:"Samsung",value:31.42177722},
        {axis:"Apple",value:15.12640801},
        {axis:"Other",value:36.43053817},
        {axis:"LG",value:4.730913642},
        {axis:"Lenovo",value:4.382978723},
        {axis:"ZTE",value:2.102628285},
        {axis:"Huawei",value:4.770963705},
        {axis:"OPPO",value:0},
        {axis:"vivo",value:0},
        {axis:"Xiaomi",value:1.03379224},
        {axis:"Sony",value:0},
        {axis:"RIM",value:0},
        {axis:"HTC",value:0},
        {axis:"Nokia",value:0},
    ],[
        {axis:"Samsung",value:24.8125937},
        {axis:"Apple",value:14.59270365},
        {axis:"Other",value:43.2033983},
        {axis:"LG",value:3.573213393},
        {axis:"Lenovo",value:4.597701149},
        {axis:"ZTE",value:0},
        {axis:"Huawei",value:5.672163918},
        {axis:"OPPO",value:0},
        {axis:"vivo",value:0},
        {axis:"Xiaomi",value:3.548225887},
        {axis:"Sony",value:0},
        {axis:"RIM",value:0},
        {axis:"HTC",value:0},
        {axis:"Nokia",value:0},
    ],[
        {axis:"Samsung",value:22.4},
        {axis:"Apple",value:16.075},
        {axis:"Other",value:38.425},
        {axis:"LG",value:1.15},
        {axis:"Lenovo",value:5.2},
        {axis:"ZTE",value:0},
        {axis:"Huawei",value:7.4},
        {axis:"OPPO",value:2.95},
        {axis:"vivo",value:3.775},
        {axis:"Xiaomi",value:0},
        {axis:"Sony",value:0},
        {axis:"RIM",value:0},
        {axis:"HTC",value:0},
        {axis:"Nokia",value:0},
    ],[
        {axis:"Samsung",value:21.36965759},
        {axis:"Apple",value:14.47138215},
        {axis:"Other",value:40.93976506},
        {axis:"LG",value:0},
        {axis:"Lenovo",value:0},
        {axis:"ZTE",value:0},
        {axis:"Huawei",value:9.397650587},
        {axis:"OPPO",value:6.72331917},
        {axis:"vivo",value:5.198700325},
        {axis:"Xiaomi",value:1.899525119},
        {axis:"Sony",value:0},
        {axis:"RIM",value:0},
        {axis:"HTC",value:0},
        {axis:"Nokia",value:0},
    ],[
        {axis:"Samsung",value:22.808},
        {axis:"Apple",value:13.138},
        {axis:"Other",value:39.346},
        {axis:"LG",value:0},
        {axis:"Lenovo",value:0},
        {axis:"ZTE",value:0},
        {axis:"Huawei",value:10.537},
        {axis:"OPPO",value:7.903},
        {axis:"vivo",value:1.734},
        {axis:"Xiaomi",value:4.535},
        {axis:"Sony",value:0},
        {axis:"RIM",value:0},
        {axis:"HTC",value:0},
        {axis:"Nokia",value:0},
    ]

];

//Options for the Radar chart, other than default
var mycfg = {
    w: w,
    h: h,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
}

RadarChart.draw("#chart", emptyData(), mycfg);

//Call function to draw the Radar chart
//Will expect that data is in %'s
//RadarChart.draw("#chart", d, mycfg);

initiateLegend()
;

function changeText(){
    var graphData = emptyData();
    var mycfg2 = {
        w: w,
        h: h,
        maxValue: 0.6,
        levels: 6,
        ExtraWidthX: 300
    }

    if(document.getElementById('yr2010').checked) {
        graphData[0] = d[0];
    }if(document.getElementById('yr2011').checked) {
        graphData[1] = d[1];
    }if(document.getElementById('yr2012').checked) {
        graphData[2] = d[2];
    }if(document.getElementById('yr2013').checked) {
        graphData[3] = d[3];
    }if(document.getElementById('yr2014').checked) {
        graphData[4] = d[4];
    }if(document.getElementById('yr2015').checked) {
        graphData[5] = d[5];
    }if(document.getElementById('yr2016').checked) {
        graphData[6] = d[6];
    }if(document.getElementById('yr2017').checked) {
        graphData[7] = d[7];
    }
    RadarChart.draw("#chart", graphData, mycfg2);
    initiateLegend();
    changeDataText();
}

function changeDataText(){
    if (document.getElementById('yr2010').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2010: </b>" + "Nokia was really popular in the 2000\'s. "
            + "It was in the lead for the highest number of smartphone market shares in 2010. Which I found "
            + "quite surprising because I thought it would've been Apple or Samsung. <br><br> "
            + "This was the time that the iPhone 4 was released and Apple only had 15.4% of market shares.";
    }
    if (document.getElementById('yr2011').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2011: </b>" + "Nokia shares lowered, whereas Samsung and Apple "
            + "shares began to jump and grow from here. Apple probably went up because of the popularity of "
            + "the iPhone 4s. <br><br> Additionally, this was also the introduction to smaller Asian "
            + "companies such as HTC, Huawei, and ZTE.";
    }
    if (document.getElementById('yr2012').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2012: </b>" + "Samsung and Apple grew a lot more this year. "
            + "Apple reached the highest market share it has gotten with 18.74% due to the iPhone 5. "
            + "Samsung then became the leading smartphone vendor in market shares. <br><br>"
            + "Lenovo and LG also joined the competition, but "
            + "had small market shares compared to ZTE, Huawei and Sony.";
    }
    if (document.getElementById('yr2013').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2013: </b>" + "Various unknown companies grew popular during this "
            + "year while Apple lost some market shares and Samsung still went up. This could be due to the "
            + "release of the Samsung Galaxy S4. <br><br>"
            + "A Chinese company called Xiaomi was introduced while Nokia, HTC, Sony, and RIM were knocked out.";
    }
    if (document.getElementById('yr2014').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2014: </b>" + "Even more companies came out with smartphones and "
            + "were shipping them out. <br><br> Meanwhile, Apple and Samsung's shares went down. This could be due to "
            + "the Chinese companies selling phones with high end components for half the cost of an iPhone or "
            + "Samsung Galaxy device.";
    }
    if (document.getElementById('yr2015').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2015: </b>" + "Even more companies came out with smartphones and "
            + "were shipping them out!! We also see the same pattern of Samsung and Apple market shares going down "
            + "<br><br> Huawei keeps continuing to grow. vivo and OPPO joined the game. OPPO's daughter company "
            + "released the OnePlus 2 smartphone.";
    }
    if (document.getElementById('yr2016').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2016: </b>" + "vivo and OPPO grew a bit, while Lenovo and LG "
            + "were booted out. <br><br> Apple has the lowest market it had since 2010. We can also see that more "
            + "users are transitioning to Android devices. ";
    }
    if (document.getElementById('yr2017').checked) {
        document.getElementById("info-paragraph").innerHTML = "<b>2017: </b>" + "We only have information for 3 quarters of this "
            + "year which makes it difficult to see if the iPhone X's release has made a positive impact or not "
            + "for Apple's market shares. <br><br> On the other hand, Samsung's shares rose a little because of "
            + "their Samsung Galaxy releases.";
    }
}


function emptyData(){
    var emptyData = [];
    for(int = i =0; i < 8; i++){
        emptyData.push([
            {axis:"Samsung",value:0},
            {axis:"Apple",value:0},
            {axis:"Other",value:0},
            {axis:"LG",value:0},
            {axis:"Lenovo",value:0},
            {axis:"ZTE",value:0},
            {axis:"Huawei",value:0},
            {axis:"OPPO",value:0},
            {axis:"vivo",value:0},
            {axis:"Xiaomi",value:0},
            {axis:"Sony",value:0},
            {axis:"RIM",value:0},
            {axis:"HTC",value:0},
            {axis:"Nokia",value:0},
        ])
    }
    return emptyData;
}

function initiateLegend(){
    var svg = d3.select('#body')
        .selectAll('svg')
        .append('svg')
        .attr("width", w+300)
        .attr("height", 400)

//Create the title for the legend
    var text = svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(140,0)')
        .attr("x", w - 90)
        .attr("y", 10)
        .attr("font-size", "12px")
        .attr("fill", "#404040")
        .text("Market Share of Smartphone Manufacturers");

//Initiate Legend
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', 'translate(300,20)')
    ;
//Create colour squares
    legend.selectAll('rect')
        .data(LegendOptions)
        .enter()
        .append("rect")
        .attr("x", w - 65)
        .attr("y", function(d, i){ return i * 20;})
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d, i){ return colorscale(i);})
    ;
//Create text next to squares
    legend.selectAll('text')
        .data(LegendOptions)
        .enter()
        .append("text")
        .attr("x", w - 40)
        .attr("y", function(d, i){ return i * 20 + 9;})
        .attr("font-size", "12px")
        .attr("fill", "#737373")
        .text(function(d) { return d; })
}
/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.geodata = am4geodata_worldLow;
// Set projection
chart.projection = new am4maps.projections.Orthographic();
chart.panBehavior = "rotateLongLat";
chart.deltaLongitude = -55;
chart.deltaLatitude = -30;
chart.padding(10, 10, 10, 10);



// limits vertical rotation
chart.adapter.add("deltaLatitude", function (delatLatitude) {
    return am4core.math.fitToRange(delatLatitude, -90, 90);
})

// Zoom control
chart.zoomControl = new am4maps.ZoomControl();

var homeButton = new am4core.Button();
homeButton.events.on("hit", function () {
    chart.goHome();
});

homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);

// Center on the groups by default
chart.homeZoomLevel = -3;

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
// polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(-0.5);
// polygonSeries.mapPolygons.template.nonScalingStroke = true;
// polygonSeries.calculateVisualCenter = true;

var template = polygonSeries.mapPolygons.template;
template.nonScalingStroke = true;
template.fill = am4core.color("#3C435E");
template.stroke = am4core.color("#202331");

polygonSeries.calculateVisualCenter = true;
template.propertyFields.id = "id";
template.tooltipPosition = "fixed";
template.fillOpacity = 1;

// Add line bullets
var cities = chart.series.push(new am4maps.MapImageSeries());
cities.mapImages.template.nonScaling = true;

var city = cities.mapImages.template.createChild(am4core.Circle);
city.radius = 5;
city.fill = am4core.color("#202331");
city.strokeWidth = 2;
city.stroke = am4core.color("#00ffb3");

function addCity(coords, title) {
    var city = cities.mapImages.create();
    city.latitude = coords.latitude;
    city.longitude = coords.longitude;
    city.tooltipText = title;
    return city;
}

var kolkata = addCity({ "latitude": 22.5726, "longitude": 88.3639 }, "Kolkata");
var muscat = addCity({ "latitude": 23.5880, "longitude": 58.3829 }, "Muscat");
var tripoli = addCity({ "latitude": 32.8872, "longitude": 13.1913 }, "Tripoli");
var bandar = addCity({ "latitude": 4.9031, "longitude": 114.9398 }, "Bandar Seri Begawan");
var doha = addCity({ "latitude": 25.2854, "longitude": 51.5310 }, "Doha");
var london = addCity({ "latitude": 51.5074, "longitude": 0.1278 }, "London");


// Add lines
var lineSeries = chart.series.push(new am4maps.MapArcSeries());
lineSeries.mapLines.template.line.strokeWidth = 2;
lineSeries.mapLines.template.line.strokeOpacity = 0.3;
lineSeries.mapLines.template.line.stroke = city.stroke;
lineSeries.mapLines.template.line.nonScalingStroke = true;
lineSeries.mapLines.template.line.strokeDasharray = "1,1";
lineSeries.zIndex = 10;

var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
shadowLineSeries.mapLines.template.shortestDistance = false;
shadowLineSeries.zIndex = 5;

function addLine(from, to) {
    var line = lineSeries.mapLines.create();
    line.imagesToConnect = [from, to];
    line.line.controlPointDistance = -0.3;

    var shadowLine = shadowLineSeries.mapLines.create();
    shadowLine.imagesToConnect = [from, to];

    return line;
}

addLine(kolkata, muscat);
addLine(muscat, tripoli);
addLine(tripoli, bandar);
addLine(bandar, doha);
addLine(doha, london);

// Add plane
var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
plane.position = 0;
plane.width = 48;
plane.height = 48;

plane.adapter.add("scale", function (scale, target) {
    return 0.5 * (1 - (Math.abs(0.5 - target.position)));
})

var planeImage = plane.createChild(am4core.Sprite);
planeImage.scale = 0.12;
planeImage.horizontalCenter = "middle";
planeImage.verticalCenter = "middle";
planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
planeImage.fill = am4core.color("#FFFFFF");
planeImage.strokeOpacity = 0;

var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
shadowPlane.position = 0;
shadowPlane.width = 48;
shadowPlane.height = 48;

var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
shadowPlaneImage.scale = 0.1;
shadowPlaneImage.horizontalCenter = "middle";
shadowPlaneImage.verticalCenter = "middle";
shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
shadowPlaneImage.fill = am4core.color("#000");
shadowPlaneImage.strokeOpacity = 0;

shadowPlane.adapter.add("scale", function (scale, target) {
    target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
    return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
})

// Plane animation
var currentLine = 0;
var direction = 1;
function flyPlane() {

    // Get current line to attach plane to
    plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
    plane.parent = lineSeries;
    shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
    shadowPlane.parent = shadowLineSeries;
    shadowPlaneImage.rotation = planeImage.rotation;

    // Set up animation
    var from, to;
    var numLines = lineSeries.mapLines.length;
    if (direction == 1) {
        from = 0
        to = 1;
        if (planeImage.rotation != 0) {
            planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
        }
    }
    else {
        from = 1;
        to = 0;
        if (planeImage.rotation != 180) {
            planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
        }
    }

    // Start the animation
    var animation = plane.animate({
        from: from,
        to: to,
        property: "position"
    }, 5000, am4core.ease.sinInOut);
    animation.events.on("animationended", flyPlane)
    /*animation.events.on("animationprogress", function(ev) {
      var progress = Math.abs(ev.progress - 0.5);
      //console.log(progress);
      //planeImage.scale += 0.2;
    });*/

    shadowPlane.animate({
        from: from,
        to: to,
        property: "position"
    }, 5000, am4core.ease.sinInOut);

    // Increment line, or reverse the direction
    currentLine += direction;
    if (currentLine < 0) {
        currentLine = 0;
        direction = 1;
    }
    else if ((currentLine + 1) > numLines) {
        currentLine = numLines - 1;
        direction = -1;
    }

}

// Go!
flyPlane();

chart.logo.height = -15;
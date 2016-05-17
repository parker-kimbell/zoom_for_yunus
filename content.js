//alert("Hello from Yunus!")

var width_increase = .50;
var height_increase = .25;

var font_increase = .25;

var square = 1;

var currentlyZoomed = [];

$(window).mousemove(function(event) {
	var msg = "Handler for .mousemove() called at ";
  	msg += event.pageX + ", " + event.pageY;
	console.log(msg); 
	currentlyZoomed = [];
	var newly_zoomed = findNewZoomedElements(event);
	zoomNewElements();
	addNewZoomedElements();
	restoreOldZoomedElements();
	removeOldZoomedElements();
});

function findNewZoomedElements(event) {
	getElementsFromQuadrant(event, square, square); // Upper right quad
	getElementsFromQuadrant(event, -square, square); // Upper left quad
	getElementsFromQuadrant(event, -square, -square); // Lower left quad
	getElementsFromQuadrant(event, square, -square); // Lower right quad
}

function getElementsFromQuadrant(event, xCoord, yCoord) {
	for (var i = 0; i < xCoord; i++) {
		for (var j = 0; j < yCoord; j++) {
			var elem = $(document.elementFromPoint(event.pageX + i, event.pageY + j));
			currentlyZoomed.push(elem);
		}
	}
}

function zoomNewElements() {
	for (var i = 0; i < currentlyZoomed.length; i++) {
		/*var parsedVal = parseInt($(currentlyZoomed[i].css('font-size')), 10);
		console.log('Parsed val ' + parsedVal);*/
		$(currentlyZoomed[i]).css('font-size', '35px');
	}
}

function addNewZoomedElements() {

}

function restoreOldZoomedElements() {

}

function removeOldZoomedElements() {

}
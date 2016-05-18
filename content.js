//alert("Hello from Yunus!")

var width_increase = .50;
var height_increase = .25;

var font_increase = .25;

var square = 5;

var currentlyZoomed = [];

$(window).mousemove(function(event) {
/*	var msg = "Handler for .mousemove() called at ";
  	msg += event.pageX + ", " + event.pageY;
	console.log(msg); 
*/	currentlyZoomed = [];
	var newlyZoomed = findNewZoomedElements(event);
	console.log('newly zoomed')
	console.dir(newlyZoomed)
	zoomNewElements(newlyZoomed);
	addNewZoomedElements(newlyZoomed);
	restoreOldZoomedElements();
	removeOldZoomedElements();
});

function findNewZoomedElements(event) {
	var newlyZoomed = [];
	newlyZoomed = getElementsFromQuadrant(event, square, square, newlyZoomed); // Upper right quad
	newlyZoomed = getElementsFromQuadrant(event, -square, square, newlyZoomed); // Upper left quad
	newlyZoomed = getElementsFromQuadrant(event, -square, -square, newlyZoomed); // Lower left quad
	newlyZoomed = getElementsFromQuadrant(event, square, -square, newlyZoomed); // Lower right quad
	return newlyZoomed;
}

function getElementsFromQuadrant(event, xMax, yMax, newlyZoomed) {
	for (var i = 0; i < xMax; i++) {
		for (var j = 0; j < yMax; j++) {
			var elem = $(document.elementFromPoint(event.pageX + i, event.pageY + j));
			if (jQueryObjectInArray(elem, newlyZoomed) === -1 && jQueryObjectInArray(elem, currentlyZoomed) === -1) { // Case: element is not currently zoomed
				console.log('adding new item');
				console.dir(elem);
				newlyZoomed.push(elem);
			}
		}
	}
	return newlyZoomed;
}

// Finds if a jQuery objects exists within an array of jQuery objects
// returns index of object if it exists, 
// else returns -1
function jQueryObjectInArray($obj, arr) {
	for (var i = 0; i < arr.length; i++) {
		if ($obj.is(arr[i])) {
			return i;
		}
	}
	return -1;
}

function zoomNewElements(newlyZoomed) {
	var len = newlyZoomed.length;
	for (var i = 0; i < len; i++) {
		scaleFont(newlyZoomed[i]);	
	}
}

// possible issue. Not sure if font size is always being pulled in as pixels, and always being set as pixels.
// $.css pulls the computed value. Is this guaranteed to be in pixels in chrome?
function scaleFont($element) {
	var parsedVal = parseInt($element.css('font-size'), 10);
	console.log('Parsed font ' + parsedVal);
	$element.originalFontSize = parsedVal;
	$element.css('font-size', parsedVal + parsedVal * font_increase);
}

function scaleWidth() {

}

function scaleHeight() {

}

function addNewZoomedElements(newlyZoomed) {
	for (var i = 0; i < newlyZoomed.length; i++) {
		currentlyZoomed.push(newlyZoomed[i]);
	}
	console.log('currentlyZoomed');
	console.dir(currentlyZoomed);
}

function restoreOldZoomedElements() {

}

function removeOldZoomedElements() {

}
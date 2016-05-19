//alert("Hello from Yunus!")

var width_increase = 0.50;
var height_increase = 0.25;

var font_increase = 0.25;

var square = 5;

var currentlyZoomed = [];

$(window).mousemove(zoomCycle);

function zoomCycle(event) {
/*	var msg = "Handler for .mousemove() called at ";
  	msg += event.pageX + ", " + event.pageY;
	console.log(msg);   
*/	var newlyZoomed = findNewZoomedElements(event);
	zoomNewElements(newlyZoomed);
	addNewZoomedElements(newlyZoomed);
	restoreOldZoomedElements();
	removeOldZoomedElements();
}

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
			// In these next two lines I'm finding whether this element has already been zoomed, or needs to be zoomed.
			var elementNewlyZoomedInd = jQueryObjectInArray(elem, newlyZoomed);
			var elementCurrentlyZoomedInd = jQueryObjectInArray(elem, currentlyZoomed);
			if (elementNewlyZoomedInd === -1 && elementCurrentlyZoomedInd === -1) { // Case: element is not currently zoomed
				elem.originalProps = {};
				elem.is_zoomed = true;
				newlyZoomed.push(elem);
			} else if (elementCurrentlyZoomedInd > -1) { // Case: The element is still zoomed and should remain zoomed. Mark the element as still being zoomed so we can do a pass later and unzoom the proper elements
				currentlyZoomed[elementCurrentlyZoomedInd].is_zoomed = true;
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
	$element.originalProps['font-size'] = parsedVal;
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
}

function restoreOldZoomedElements() {
	for (var i = 0; i < currentlyZoomed.length; i++) {
		console.dir(currentlyZoomed[i].originalProps)
		if (!currentlyZoomed[i].is_zoomed) {
			currentlyZoomed[i].css('font-size', currentlyZoomed[i].originalProps['font-size']);
		}
	}
}

function removeOldZoomedElements() {
	for (var i = 0; i < currentlyZoomed.length; i++) {
		if (!currentlyZoomed[i].is_zoomed) {
			currentlyZoomed.splice(i, 1);
		}
	}
}
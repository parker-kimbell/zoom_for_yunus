//alert("Hello from Yunus!")

var width_increase = 0.50;
var height_increase = 0.50;

var font_increase = 0.25;

var square = 25;

var currentlyZoomed = [];

$(window).mousemove(zoomCycle);

function zoomCycle(event) {
/*	var msg = "Handler for .mousemove() called at ";
  	msg += event.pageX + ", " + event.pageY;
	console.log(msg);   
*/	var newlyZoomed = findNewZoomedElements(event);
	zoomNewElements(newlyZoomed);
	addNewZoomedElements(newlyZoomed);
	restoreOldZoomedElementsAndRemove();
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
	zoomGivenProperty($element, 'font-size', font_increase);
}

function zoomGivenProperty($element, propertyName, scaleValue) {
	var parsedVal = parseInt($element.css(propertyName), 10);
	$element.originalProps[propertyName] = parsedVal;
	$element.css(propertyName, parsedVal + parsedVal * scaleValue);
}

function scaleWidth() {
	zoomGivenProperty($element, 'width', width_increase);
}

function scaleHeight() {
	zoomGivenProperty($element, 'height', height_increase);
}

function addNewZoomedElements(newlyZoomed) {
	for (var i = 0; i < newlyZoomed.length; i++) {
		currentlyZoomed.push(newlyZoomed[i]);
	}
}

function restoreOldZoomedElementsAndRemove() {
	currentlyZoomed = _.filter(currentlyZoomed, function(zoomedElement) {
		if (!zoomedElement.is_zoomed) { // Case: This element has not been marked for zoom, but was zoomed, so must be restored
			zoomedElement.css('font-size', zoomedElement.originalProps['font-size']);
			return false;
		} else { // Case: This element has been marked for zoom and can remain in the array
			// We need to mark this element as unzoomed (is_zoomed = false) so, if it's still in the zoom square
			// it can be switched to zoomed (is_zoomed = true) when we make another pass when the mouse moves,
			zoomedElement.is_zoomed = false;
			return true;
		}
	});
}
var width_increase = 0.50;
var height_increase = 0.50;
var font_increase = 0.25;
var squareRadius = 10;

var currentlyZoomed = [];
var transition_string = '-webkit-transition: all 220ms ease-in-out';

var $display_div = $("<div id='view_box' style='z-index: 9999; border:solid black 1px; position:fixed; height:" + squareRadius * 2 + "px; width: " + squareRadius * 2 + "px'></div>");

$('body').append($display_div);
$(window).mousemove(zoomCycle);

function zoomCycle(event) {
/*	var msg = "Handler for .mousemove() called at ";
  	msg += event.pageX + ", " + event.pageY;
	console.log(msg);
*/	
	devOnlyMoveSquare(event);
	var newlyZoomed = findNewZoomedElements(event);
	zoomNewElements(newlyZoomed);
	addNewZoomedElements(newlyZoomed);
	restoreOldZoomedElementsAndRemove();
}

function devOnlyMoveSquare(event) {
	$display_div.css('top', event.clientY - squareRadius);
	$display_div.css('left', event.clientX - squareRadius);
}

function findNewZoomedElements(event) {
	var newlyZoomed = [];
	newlyZoomed = getElementsFromTopRightQuad(event, squareRadius, squareRadius, newlyZoomed); // Upper right quad
	newlyZoomed = getElementsFromTopLeftQuad(event, -squareRadius, squareRadius, newlyZoomed); // Upper left quad
	newlyZoomed = getElementsFromBottomLeftQuad(event, -squareRadius, -squareRadius, newlyZoomed); // Lower left quad
	newlyZoomed = getElementsFromBottomRightQuad(event, squareRadius, -squareRadius, newlyZoomed); // Lower right quad
	return newlyZoomed;
}

function getElementsFromTopRightQuad(event, xMax, yMax, newlyZoomed) {
	for (var i = 0; i < xMax; i++) {
		for (var j = 0; j < yMax; j++) {
			getElementAt(event, newlyZoomed, i, j);
		}
	}
	return newlyZoomed;
}

function getElementsFromTopLeftQuad(event, xMax, yMax, newlyZoomed) {
	for (var i = 0; i > xMax; i--) { // -x coord
		for (var j = 0; j < yMax; j++) { // +y coord
			getElementAt(event, newlyZoomed, i, j);
		}
	}
	return newlyZoomed;
}

function getElementsFromBottomLeftQuad(event, xMax, yMax, newlyZoomed) {
	for (var i = 0; i > xMax; i--) { // -x coord
		for (var j = 0; j > yMax; j--) { // - y coord
			getElementAt(event, newlyZoomed, i, j);
		}
	}
	return newlyZoomed;
}

function getElementsFromBottomRightQuad(event, xMax, yMax, newlyZoomed) {
	for (var i = 0; i < xMax; i++) { // +xcoord
		for (var j = 0; j > yMax; j--) { // -ycoord
			getElementAt(event, newlyZoomed, i, j);
		}
	}
	return newlyZoomed;
}

function getElementAt(event, newlyZoomed, i, j) {
	var elem = $(document.elementFromPoint(event.pageX + i, event.pageY + j));
	if (elem.prop('nodeName') === 'BODY' || elem.prop('nodeName') === 'HTML' ) return;
	// In these next two lines I'm finding whether this element has already been zoomed, or needs to be zoomed.
	var elementNewlyZoomedInd = jQueryObjectInArray(elem, newlyZoomed);
	var elementCurrentlyZoomedInd = jQueryObjectInArray(elem, currentlyZoomed);
	if (elementNewlyZoomedInd === -1 && elementCurrentlyZoomedInd === -1) { // Case: element is not currently zoomed
		elem.originalProps = {};
		elem.is_zoomed = true;
		newlyZoomed.push(elem);
		console.log('i just pushed: ')
		console.dir(elem[0]);
	} else if (elementCurrentlyZoomedInd > -1) { // Case: The element is still zoomed and should remain zoomed. Mark the element as still being zoomed so we can do a pass later and unzoom the proper elements
		currentlyZoomed[elementCurrentlyZoomedInd].is_zoomed = true;
	}
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
		/*scaleWidth(newlyZoomed[i]);
		scaleHeight(newlyZoomed[i]);*/
		addTransition(newlyZoomed[i]);
	}
}

// possible issue. Not sure if font size is always being pulled in as pixels, and always being set as pixels.
// $.css pulls the computed value. Is this guaranteed to be in pixels in chrome?
function scaleFont($element) {
	zoomGivenProperty($element, 'font-size', font_increase);
}

function zoomGivenProperty($element, propertyName, scaleValue) {
	var parsedVal = parseInt($element.css(propertyName), 10);
	if (parsedVal) {
		$element.originalProps[propertyName] = $element.css(propertyName);
		$element.css(propertyName, parsedVal + parsedVal * scaleValue);
		/*$element.css(propertyName, '20px');*/
	}
}

function scaleWidth($element) {
	zoomGivenProperty($element, 'width', width_increase);
}

function scaleHeight($element) {
	zoomGivenProperty($element, 'height', height_increase);
}

function addTransition($element) {
	$element = $element.css('-webkit-transition', 'all 220ms ease-in-out');
}

function addNewZoomedElements(newlyZoomed) {
	for (var i = 0; i < newlyZoomed.length; i++) {
		currentlyZoomed.push(newlyZoomed[i]);
	}
}

function restoreOldZoomedElementsAndRemove() {
	currentlyZoomed = _.filter(currentlyZoomed, function(zoomedElement) {
		if (!zoomedElement.is_zoomed) { // Case: This element has not been marked for zoom, but was zoomed, so must be restored
			/*console.dir(zoomedElement[0]);
			console.log('restoring size to ' + zoomedElement.originalProps['font-size']);*/
			if (zoomedElement.originalProps['font-size'])
				zoomedElement.css('font-size', zoomedElement.originalProps['font-size']);
			/*zoomedElement.css('width', zoomedElement.originalProps.width);
			zoomedElement.css('height', zoomedElement.originalProps.height);*/
			return false;
		} else { // Case: This element has been marked for zoom and can remain in the array
			// We need to mark this element as unzoomed (is_zoomed = false) so, if it's still in the zoom squareRadius
			// it can be switched to zoomed (is_zoomed = true) when we make another pass when the mouse moves,
			zoomedElement.is_zoomed = false;
			return true;
		}
	});
}
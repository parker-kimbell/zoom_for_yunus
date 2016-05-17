//alert("Hello from Yunus!")
$(window).mousemove(function(event) {
	var msg = "Handler for .mousemove() called at ";
  	msg += event.pageX + ", " + event.pageY;
	console.log(msg); 
	console.log(
		$(
			document.elementFromPoint(event.pageX, event.pageY)
		)
	);
	var newly_zoomed = findNewZoomedElements();
	zoomNewElements();
	addNewZoomedElements();
	restoreOldZoomedElements();
	removeOldZoomedElements();
});

function zoomNewElements() {

}

function addNewZoomedElements() {

}

function restoreOldZoomedElements() {

}

function removeOldZoomedElements() {

}
QUnit.module('content.js', function() {

	var mock_event;

	QUnit.module('when the mouse moves', {

		beforeEach : function() {
			currentlyZoomed = [$('#already_zoomed')];
			currentlyZoomed[0].originalProps = {};
			currentlyZoomed[0].originalProps['font-size'] = '16px';
			currentlyZoomed[0].is_zoomed = true; // Set zoomed to true to simulate an element that is marked as being a valid zoom
			square = 100;
			mock_event = { 
				pageX : 100,
				pageY : 100,
			};
		}

	}, function() { 

		QUnit.test('it should add newly found objects to the currenly zoomed array and increase their font size', function(assert) {

			zoomCycle(mock_event); 
			assert.ok($('#already_zoomed').is(currentlyZoomed[0]), 'the first element in the array of zoomed elements should still be "#already_zoomed"');
			assert.equal(currentlyZoomed.length, 2, 'The two elements on the page should have both been added to the list of zoomed elements');
			assert.notOk(currentlyZoomed[0].is_zoomed, 'Once a zoom cycle completed, all currentlyZoomed elements should be marked as not zoomed so they can be validated or removed on the next pass');
			assert.notOk(currentlyZoomed[1].is_zoomed, 'Once a zoom cycle completed, all currentlyZoomed elements should be marked as not zoomed so they can be validated or removed on the next pass');
			// Note: this 20px value is derived from the default 16px for all the elements on the page. I'm not sure 
			// why it's defaulting to 16px and this is totally something I could use help with
			assert.equal($('#already_zoomed').css('font-size'), '20px', 'the font size should have been increased by ' + font_increase);
			assert.equal($('#not_yet_zoomed').css('font-size'), '20px', 'the font size should have been increased by ' + font_increase);

		});

		QUnit.test('any elements no longer in the zoom square should be restored to their original font size and removed from the list of currently zoomed items', function(assert) {

			// This simulates the square moving into an area where currently
			// zoomed items are no longer in the zoom square
			square = 0;
			mock_event = { 
				pageX : -100,
				pageY : -100,
			};
			currentlyZoomed = [$('#already_zoomed'), $('#not_yet_zoomed')];
			currentlyZoomed[0].originalProps = {};
			currentlyZoomed[1].originalProps = {};
			currentlyZoomed[0].originalProps['font-size'] = '16px';
			currentlyZoomed[1].originalProps['font-size'] = '16px';
			currentlyZoomed[0].is_zoomed = false;
			currentlyZoomed[1].is_zoomed = false;
			zoomCycle(mock_event);
			assert.equal(currentlyZoomed.length, 0);
			assert.equal($('#already_zoomed').css('font-size'), '16px', 'the font size should have been returned to its original size');
			assert.equal($('#not_yet_zoomed').css('font-size'), '16px', 'the font size should have been returned to its original size');

		});

	});

});
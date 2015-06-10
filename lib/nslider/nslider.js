"use strict";

function NSlider(opt) {

	opt = opt || { };





	var slider = $('<div>&nbsp;</div>').addClass('zoomSlider');
	slider.onChange = opt.onChange,
	slider.onRelease = opt.onRelease;
	slider.onPress = opt.onPress;
	slider.V = opt.V || 0.5;


	update();

	var mousedown = false;

	function update(e) {
		var s = slider;
		var px = s.offset().left;

		var sw = parseFloat(s.outerWidth());

		var x;

		if (e == null)
			x = slider.V * (sw);
		else
			x = e.clientX - px;

		var p = (parseFloat(x) / sw);
		if (slider.V===p && e!=null)
			return;

		slider.V = p;
		var cr = parseInt(255.0 * p);
		var cg = parseInt(25.0);
		var cb = parseInt(255.0 * (1.0 - p));
		var cc = 'rgb(' + cr + ',' + cg + ',' + cb + ')';


		console.log(px, x, sw, p, slider.V, cc);

		if (slider.onChange)
			slider.onChange(p, slider);

		slider.css({
			borderLeftWidth: parseInt(x) + 'px',
			borderLeftColor: cc
		});

		return p;
	}

	slider.mouseup(function(e) {
		var p = update(e);
		mousedown = false;

		if (slider.onRelease)
			slider.onRelease(p, slider);

		return false;
	});
	slider.mousedown(function(e) {
		if (e.which == 1) {

			mousedown = true;

			if (slider.onPress)
				slider.onPress(p, slider);
		}
		return false;
	});

	slider.mousemove(function(e) {
		if (e.which == 0) mousedown = false;

		if (mousedown) {
			update(e);
		}
	});

	/*slider.mousewheel(function(evt){
	 var direction = evt.deltaY;
	 if (direction < 0) {
	 scaleNode(1.2);
	 }
	 else {
	 scaleNode(1.0/1.2);
	 }
	 return false;
	 });*/

	//slider.mouseleave(function(e) { mousedown = false; });



	return slider;
}

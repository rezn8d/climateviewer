"use strict";

function NSlider(opt) {

	opt = opt || { };

	if (!opt.element)
		opt.element = $('<div>');

	if (!opt.barColor)
		opt.barColor = function(p) {
			var cr = parseInt(150.0 * (1.0-p));
			var cg = parseInt(30.0);
			var cb = parseInt(255.0 * p);
			return 'rgb(' + cr + ',' + cg + ',' + cb + ')';
		};


	var slider = opt.element;
	slider.addClass('nslider');
	slider.onChange = opt.onChange;
	slider.onRelease = opt.onRelease;
	slider.onPress = opt.onPress;
    slider.nValue = opt.nValue || 0;
	slider.barColor = opt.barColor;



	var mousedown = false;

	function update(e) {
		var s = slider;
		var px = s.offset().left;

		var sw = parseFloat(s.outerWidth());

		var x = opt.nValue;

		if (e == null) {
            x = slider.nValue * (sw);
        } else {
            x = e.clientX - px;
        }

        var p = (parseFloat(x) / sw);
		if (slider.nValue===p && e!=null)
			return;

		slider.nValue = p;
		var cc = slider.barColor(p);

		// console.log(px, x, sw, p, slider.nValue, cc);

		if (slider.onChange) {
            slider.onChange(p, slider);
        }

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

	update(null);

	return slider;
}

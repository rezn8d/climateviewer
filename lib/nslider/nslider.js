"use strict";

function NSlider(opt) {

	opt = opt || { };

	var slider = $('<input class="zoomSlider" type="text">&nbsp;</input>');
	slider.onChange = opt.onChange;
	slider.onRelease = opt.onRelease;
	slider.onPress = opt.onPress;
    slider.nValue = opt.nValue;

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
		var cr = parseInt(255.0 * p);
		var cg = parseInt(77.0);
		var cb = parseInt(0.0 * p);
		var cc = 'rgb(' + cr + ',' + cg + ',' + cb + ')';

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

	return slider;
}

/* https://note.kiriukun.com/entry/20181206-rgb-and-hsl-conversion より 少し改変 */
const hsl2rgb = function(h, s, l) {
	const RGB_MAX = 255;
	const HUE_MAX = 360;
	const SATURATION_MAX = 100;
	const LIGHTNESS_MAX = 100;
	let r, g, b, max, min;
	
	h = h % HUE_MAX;
	s = s / SATURATION_MAX;
	l = l / LIGHTNESS_MAX;
	
	if (l < 0.5) {
		max = l + l * s;
		min = l - l * s;
	} else {
		max = l + (1 - l) * s;
		min = l - (1 - l) * s;
	}
	
	const hp = HUE_MAX / 6;
	const q = h / hp;
	if (q <= 1) {
		r = max;
		g = (h / hp) * (max - min) + min;
		b = min;
	} else if (q <= 2) {
		r = ((hp * 2 - h) / hp) * (max - min) + min;
		g = max;
		b = min;
	} else if (q <= 3) {
		r = min;
		g = max;
		b = ((h - hp * 2) / hp) * (max - min) + min;
	} else if (q <= 4) {
		r = min;
		g = ((hp * 4 - h) / hp) * (max - min) + min;
		b = max;
	} else if (q <= 5) {
		r = ((h - hp * 4) / hp) * (max - min) + min;
		g = min;
		b = max;
	} else {
		r = max;
		g = min;
		b = ((HUE_MAX - h) / hp) * (max - min) + min;
	}

	return [r*RGB_MAX,g*RGB_MAX,b*RGB_MAX];
};
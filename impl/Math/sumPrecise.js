import { abs } from "../../native/Math/abs";

// Neumaier (compensated) summation: substantially more accurate than naive
// accumulation, returning the sum rounded once. Based on the improvement of
// Kahan summation described by Siegfried M. Rump / Ogita–Oishi.
// Accepts an iterable (Symbol.iterator) or an array-like (length + indexed).
export function sumPrecise(values) {
	var sum = 0;
	var c = 0;
	var hasIterator = typeof Symbol !== "undefined" && Symbol && typeof Symbol.iterator !== "undefined";
	function add(x) {
		var t = sum + x;
		if (abs(sum) >= abs(x)) {
			c += (sum - t) + x;
		} else {
			c += (x - t) + sum;
		}
		sum = t;
	}
	if (hasIterator && values && typeof values[Symbol.iterator] === "function") {
		var it = values[Symbol.iterator]();
		var step;
		while (!(step = it.next()).done) {
			add(step.value);
		}
	} else {
		var i = 0;
		var len = values.length;
		while (i < len) {
			add(values[i++]);
		}
	}
	return sum + c;
}

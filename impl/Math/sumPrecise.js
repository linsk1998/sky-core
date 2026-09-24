import { abs } from "../../native/Math/abs";
import { Symbol } from "../../native/Symbol";

// Neumaier (compensated) summation: substantially more accurate than naive
// accumulation. Accepts an iterable (Symbol.iterator) or an array-like.
// Traversal mirrors the style of impl/Math/hypot.js (plain while loop over
// arguments), extended to iterables via createIteratorHelper-style probing.
var hasIterator = typeof Symbol !== "undefined" && Symbol && typeof Symbol.iterator !== "undefined";
export function sumPrecise(values) {
	var sum = 0;
	var c = 0;
	function add(x) {
		var t = sum + x;
		if(abs(sum) >= abs(x)) {
			c += (sum - t) + x;
		} else {
			c += (x - t) + sum;
		}
		sum = t;
	}
	if(hasIterator && values && typeof values[Symbol.iterator] === "function") {
		var it = values[Symbol.iterator]();
		var step;
		while(!(step = it.next()).done) {
			add(step.value);
		}
	} else {
		var i = 0;
		var len = values.length;
		while(i < len) {
			add(values[i++]);
		}
	}
	return sum + c;
}

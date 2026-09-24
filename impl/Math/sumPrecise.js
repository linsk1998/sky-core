import { abs } from "../../native/Math/abs";
import { createIteratorHelper } from "../../utils/createIteratorHelper";

// Neumaier (compensated) summation over an iterable.
// Only iterables are accepted (no array-like fallback); a non-iterable
// input throws TypeError, mirroring impl-modern/Set.js.
export function sumPrecise(values) {
	var _iterator = createIteratorHelper(values), _step;
	if(!_iterator) {
		throw new TypeError(typeof values + " " + values + " is not iterable.");
	}
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
	try {
		for(_iterator.s(); !(_step = _iterator.n()).done;) {
			add(_step.value);
		}
	} catch(err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}
	return sum + c;
}

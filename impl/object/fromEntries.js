import { createIteratorHelper } from "../../utils/createIteratorHelper";

export function fromEntries(obj) {
	var o = {};
	var _iterator = createIteratorHelper(obj), _step;
	if(!_iterator) throw new TypeError(typeof obj + " " + obj + " is not iterable.");
	try {
		for(_iterator.s(); !(_step = _iterator.n()).done;) {
			var item = _step.value;
			if(Array.isArray(item)) {
				o[item[0]] = item[1];
			} else {
				throw new TypeError("Iterator value 1 is not an entry object");
			}
		}
	} catch(err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}
	return o;
}
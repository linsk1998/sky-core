import { enumIterableHelper } from "../Iterator/enumIterableHelper";

export function groupBy(iterable, keySelector) {
	var r = Object.create(null);
	var i = 0;
	var _iterator = enumIterableHelper(iterable), _step;
	if(!_iterator) throw new TypeError(typeof iterable + " " + iterable + " is not iterable.");
	try {
		for(_iterator.s(); !(_step = _iterator.n()).done;) {
			var value = _step.value;
			var key = keySelector(value, i++);
			if(key in r) {
				r[key].push(value);
			} else {
				r[key] = [value];
			}
		}
	} catch(err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}
	return r;
}
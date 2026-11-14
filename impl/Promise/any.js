import { isFunction } from "../../utils/isFunction";
import { createIteratorHelper } from "../../utils/createIteratorHelper";

export function any(promises) {
	return new Promise(function(resolve, reject) {
		var _iterator = createIteratorHelper(promises), _step;
		if(!_iterator) {
			reject(new TypeError(typeof promises + " " + promises + " is not iterable."));
			return;
		}
		var errors = [];
		var pending = 0;
		var index = 0;
		var done = false;
		try {
			for(_iterator.s(); !(_step = _iterator.n()).done;) {
				var one = _step.value;
				var i = index++;
				if(one != null && isFunction(one.then)) {
					pending++;
					(function(i, one) {
						one.then(resolve, function(error) {
							errors[i] = error;
							if(--pending === 0 && done) reject(new AggregateError(errors));
						});
					})(i, one);
				} else {
					resolve(one);
				}
			}
			done = true;
			if(pending === 0) reject(new AggregateError(errors));
		} catch(err) {
			_iterator.e(err);
			reject(err);
		} finally {
			_iterator.f();
		}
	});
};
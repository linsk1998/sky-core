import { isFunction } from "../../utils/isFunction";
import { createIteratorHelper } from "../../utils/createIteratorHelper";

export function allSettled(promises) {
	if(!promises) {
		return this.reject(new TypeError('You must pass promises to allSettled.'));
	}
	return new this(function(resolve, reject) {
		var _iterator = createIteratorHelper(promises), _step;
		if(!_iterator) {
			reject(new TypeError(typeof promises + " " + promises + " is not iterable."));
			return;
		}
		var result = [];
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
						one.then(function(data) {
							result[i] = { value: data, status: 'fulfilled' };
							if(--pending === 0 && done) resolve(result);
						}, function(data) {
							result[i] = { reason: data, status: 'rejected' };
							if(--pending === 0 && done) resolve(result);
						});
					})(i, one);
				} else {
					result[i] = { value: one, status: 'fulfilled' };
				}
			}
			done = true;
			if(pending === 0) resolve(result);
		} catch(err) {
			_iterator.e(err);
			reject(err);
		} finally {
			_iterator.f();
		}
	});
}
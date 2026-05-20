import { slice } from "../../native/Array/prototype/slice";
import { isFunction } from "../../utils/isFunction";

export function allSettled(promises) {
	if(!promises) {
		return this.reject(new TypeError('You must pass promises to allSettled.'));
	}
	return new this(function(resolve, reject) {
		var array = slice.call(promises);
		if(array.length == 0) return resolve(array);
		var c = 0;
		array.forEach(function(one, index, array) {
			if(one != null && isFunction(one.then)) {
				one.then(function(data) {
					c++;
					array[index] = { value: data, status: 'fulfilled' };
					if(c >= array.length) {
						resolve(array);
					}
				}, function(data) {
					c++;
					array[index] = { reason: data, status: 'rejected' };
					if(c >= array.length) {
						resolve(array);
					}
				});
			} else {
				c++;
				array[index] = { value: one, status: 'fulfilled' };
				if(c >= array.length) {
					resolve(array);
				}
			}
		});
	});
}
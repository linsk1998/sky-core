import { isFunction } from "../../utils/isFunction";

export function allSettled(promises) {
	// if(!Array.isArray(promises)) {
	// 	return Promise.reject(new TypeError('You must pass an array to allSettled.'));
	// }
	return new Promise(function(resolve, reject) {
		var array = Array.from(promises);
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
				array[index] = { value: data, status: 'fulfilled' };
				if(c >= array.length) {
					resolve(array);
				}
			}
		});
	});
}
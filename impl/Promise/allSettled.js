
export function allSettled(promises) {
	if(!Array.isArray(promises)) {
		return Promise.reject(new TypeError('You must pass an array to allSettled.'));
	}
	return new Promise(function(resolve, reject) {
		if(promises.length == 0) return resolve(new Array());
		var result = new Array(promises.length);
		var c = 0;
		promises.forEach(function(one, index) {
			if(typeof one.then === "function") {
				one.then(function(data) {
					c++;
					result[index] = { value: data, status: 'fulfilled' };
					if(c >= promises.length) {
						resolve(result);
					}
				}, function(data) {
					c++;
					result[index] = { reason: data, status: 'rejected' };
					if(c >= promises.length) {
						resolve(result);
					}
				});
			} else {
				c++;
				result[index] = { value: data, status: 'fulfilled' };
				if(c >= promises.length) {
					resolve(result);
				}
			}
		});
	});
}

export function allSettled(promises) {
	if(!Array.isArray(promises)) {
		throw new TypeError('You must pass an array to all.');
	}
	return new Promise(function(resolve, reject) {
		if(promises.length == 0) return resolve(new Array());
		var result = new Array(promises.length);
		var c = 0;
		promises.forEach(function(one, index) {
			if(typeof one.then === "function") {
				one.finally(function(data) {
					c++;
					result[index] = data;
					if(c >= promises.length) {
						resolve(result);
					}
				});
			} else {
				c++;
				result[index] = one;
				if(c >= promises.length) {
					resolve(result);
				}
			}
		});
	});
}
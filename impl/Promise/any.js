
export function any(promises) {
	// if(!Array.isArray(promises)) {
	// 	throw new TypeError('You must pass an array to any.');
	// }
	// if(promises.length == 0) return Promise.reject();
	return new Promise(function(resolve, reject) {
		var errors = Array.from(promises);
		if(errors.length === 0) {
			return reject(new AggregateError(errors));
		}
		var c = 0;
		errors.forEach(function(one, index, errors) {
			if(typeof one.then === "function") {
				one.then(function(data) {
					resolve(data);
				}, function(error) {
					c++;
					errors[index] = error;
					if(c >= errors.length) {
						reject(new AggregateError(errors));
					}
				});
			} else {
				resolve(one);
			}
		});
	});
};
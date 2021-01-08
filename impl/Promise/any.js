
export function any(promises) {
	if(!Array.isArray(promises)) {
		throw new TypeError('You must pass an array to any.');
	}
	if(promises.length == 0) return Promise.reject();
	return new Promise(function(resolve, reject) {
		var errors = new Array(promises.length);
		var c = 0;
		promises.forEach(function(one, index) {
			if(typeof one.then === "function") {
				one.then(function(data) {
					resolve(data);
				}, function(error) {
					c++;
					errors[index] = error;
					if(c >= promises.length) {
						reject(new AggregateError(errors), 'No one promise resolved');
					}
				});
			} else {
				c++;
				if(c >= promises.length) {
					resolve();
				}
			}
		});
	});
};
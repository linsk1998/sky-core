export function withResolvers() {
	var resolve, reject, promise = new Promise(function(res, rej) {
		resolve = res;
		reject = rej;
	});
	return {
		resolve: resolve,
		reject: reject,
		promise: promise
	};
}
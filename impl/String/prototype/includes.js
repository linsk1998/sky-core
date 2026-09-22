export function includes(search) {
	if(search instanceof RegExp) {
		throw new TypeError("First argument must not be a regular expression");
	}
	var start = arguments[1];
	if(typeof start !== 'number') {
		start = 0;
	}
	return this.indexOf(search, start) !== -1;
}
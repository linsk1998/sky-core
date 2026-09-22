export function filter(fn) {
	var thisArg = arguments[1];
	var arr = [];
	for(var k = 0, length = this.length; k < length; k++) {
		fn.call(thisArg, this[k], k, this) && arr.push(this[k]);
	}
	return arr;
}
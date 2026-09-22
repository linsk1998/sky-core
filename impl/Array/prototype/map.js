export function map(fn) {
	var thisArg = arguments[1];
	var arr = [];
	for(var k = 0, length = this.length; k < length; k++) {
		arr.push(fn.call(thisArg, this[k], k, this));
	}
	return arr;
}
export function some(fn) {
	var thisArg = arguments[1];
	var passed = false;
	for(var k = 0, length = this.length; k < length; k++) {
		if(passed === true) break;
		passed = !!fn.call(thisArg, this[k], k, this);
	}
	return passed;
}
export function every(fn) {
	var thisArg = arguments[1];
	var passed = true;
	for(var k = 0, length = this.length; k < length; k++) {
		if(passed === false) break;
		passed = !!fn.call(thisArg, this[k], k, this);
	}
	return passed;
}
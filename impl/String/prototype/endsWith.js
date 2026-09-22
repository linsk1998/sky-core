export function endsWith(search) {
	if(search instanceof RegExp) {
		throw new TypeError("First argument must not be a regular expression");
	}
	var len = this.length;
	var pos = arguments[1];
	if(pos == null) {
		pos = len;
	} else if(isNaN(pos)) {
		pos = 0;
	} else {
		pos = pos > len ? len : +pos;
	}
	search = String(search);
	return this.substring(pos - search.length, pos) === search;
}
export function startsWith(search) {
	if(search instanceof RegExp) {
		throw new TypeError("First argument must not be a regular expression");
	}
	var pos = arguments[1];
	pos = isNaN(pos) ? 0 : (pos < 0 ? 0 : +pos);
	search = String(search);
	return this.substring(pos, pos + search.length) === search;
}
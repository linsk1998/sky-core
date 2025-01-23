export function at(n) {
	var len = this.length;
	if(isNaN(n)) {
		return this[0];
	}
	n = Math.trunc(n);
	if(n >= 0) {
		return this[n];
	}
	return this[len + n];
}
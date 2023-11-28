export function at(n) {
	if(isNaN(n)) {
		return this[0];
	}
	n = parseInt(n);
	if(n >= 0) {
		return this[n];
	}
	return this[this.length + n];
}
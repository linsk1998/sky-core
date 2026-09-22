export function lastIndexOf(e) {
	var i = this.length;
	if(arguments.length > 1) {
		i = Math.min(1 + arguments[1], i);
		if(i < 1) {
			i += this.length;
			if(i < 1) {
				return -1;
			}
		}
	}
	while(i--) {
		if(i in this && this[i] === e) { return i; }
	}
	return -1;
}
import "sky-core/polyfill/String/prototype/repeat";

export function padEnd(targetLength) {
	var x = targetLength - this.length;
	if(x > 0) {
		var padString = arguments[1];
		if(padString == null) {
			padString = " ";
		}
		var len = padString.length;
		if(len) {
			return this + padString.repeat(Math.ceil(x / len)).substr(0, x);
		}
	}
	return String(this);
}
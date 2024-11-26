import { isSymbol } from "sky-core/utils/isSymbol";

export function toWellFormed() {
	if(this == null) {
		throw new TypeError("toWellFormed called on null or undefined");
	}
	if(isSymbol(this)) {
		throw new TypeError("Cannot convert a Symbol value to a string");
	}
	var S = String(this);
	var len = S.length;
	var r = new Array(S.length);
	// https://tc39.es/ecma262/#sec-string.prototype.towellformed
	for(var i = 0; i < len; i++) {
		var charCode = S.charCodeAt(i);
		// single UTF-16 code unit
		if((charCode & 0xF800) !== 0xD800) r[i] = S.charAt(i);
		// unpaired surrogate
		else if(charCode >= 0xDC00 || i + 1 >= len || (S.charCodeAt(i + 1) & 0xFC00) !== 0xDC00) r[i] = "\uFFFD";
		// surrogate pair
		else {
			r[i] = S.charAt(i);
			r[++i] = S.charAt(i);
		}
	}
	return r.join('');
}
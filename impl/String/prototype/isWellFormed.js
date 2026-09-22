import { isSymbol } from "sky-core/utils/isSymbol";

export function isWellFormed() {
	if(this == null) {
		throw new TypeError("isWellFormed called on null or undefined");
	}
	if(isSymbol(this)) {
		throw new TypeError("Cannot convert a Symbol value to a string");
	}
	var str = String(this);
	// https://github.com/tc39/proposal-is-usv-string
	for(var i = 0; i < str.length; ++i) {
		var isSurrogate = (str.charCodeAt(i) & 0xF800) == 0xD800;
		if(!isSurrogate) {
			continue;
		}
		var isLeadingSurrogate = str.charCodeAt(i) < 0xDC00;
		if(!isLeadingSurrogate) {
			return false; // unpaired trailing surrogate
		}
		var isFollowedByTrailingSurrogate = i + 1 < str.length && (str.charCodeAt(i + 1) & 0xFC00) == 0xDC00;
		if(!isFollowedByTrailingSurrogate) {
			return false; // unpaired leading surrogate
		}
		++i;
	}
	return true;
}
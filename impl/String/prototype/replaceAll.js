import { isRegExp } from "../../../utils/isRegExp";
import { escapeRegExp } from "../../../utils/escapeRegExp";
var replace = String.prototype.replace;
export function replaceAll(searchValue, replaceValue) {
	if(isRegExp(searchValue)) {
		if(!searchValue.global) {
			throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument");
		} else {
			return this.replace(searchValue, replaceValue);
		}
	}
	searchValue = new RegExp(escapeRegExp(String(searchValue)), "g");
	return replace.call(this, searchValue, replaceValue);
};
import { isRegExp } from "../../../utils/isRegExp";
import { escapeRegExp } from "../../../utils/escapeRegExp";
if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(searchValue, replaceValue) {
		if(isRegExp(searchValue)) {
			if(!searchValue.global) {
				throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument");
			} else {
				return this.replace(searchValue, replaceValue);
			}
		}
		searchValue = new RegExp(escapeRegExp(String(searchValue)), "g");
		return this.replace(searchValue, replaceValue);
	};
}
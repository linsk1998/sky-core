import { isRegExp } from "../../utils/isRegExp";

export function fix_RegExp(NativeRegExp) {
	function RegExp(source) {
		if(isRegExp(source)) {
			var flags = "";
			if(source.global) flags += "g";
			if(source.ignoreCase) flags += "i";
			if(source.multiline) flags += "m";
			return new NativeRegExp(source.source, flags);
		}
		return new NativeRegExp(source, arguments[1]);
	};
	RegExp.__proto__ = NativeRegExp;
	RegExp.prototype = NativeRegExp.prototype;
	return RegExp;
}

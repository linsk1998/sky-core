import { defineProperty as modern_defineProperty } from "../../impl-modern/Object/defineProperty";
import { compat_defineProperty, ie8_defineProperty } from "../../impl-compat/Object/defineProperty";

export default (function() {
	if(Object.defineProperties) {
		return Object.defineProperty;
	} else {
		if(Object.defineProperty) {
			if(Object.prototype.__defineSetter__) {
				return modern_defineProperty;
			} else {
				return ie8_defineProperty;
			}
		} else {
			return compat_defineProperty;
		}
	}
})();
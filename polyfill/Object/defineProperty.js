import { Object } from "../../native/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperty as modern_defineProperty } from "../../impl-modern/Object/defineProperty";
import { compat_defineProperty, ie8_defineProperty } from "../../impl-compat/Object/defineProperty";

if(!defineProperty) {
	if(Object.prototype.__defineSetter__) {
		Object.defineProperty = modern_defineProperty;
	} else {
		Object.defineProperty = compat_defineProperty;
	}
} else if(!Object.defineProperties) {
	Object.defineProperty = ie8_defineProperty;
}
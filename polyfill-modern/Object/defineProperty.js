import { Object } from "../../native/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperty as modern_defineProperty } from "../../impl-modern/Object/defineProperty";
if(!defineProperty) {
	if(Object.prototype.__defineSetter__) {
		Object.defineProperty = modern_defineProperty;
	}
}
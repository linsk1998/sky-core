import { Object } from "../../native/Object";
import { defineProperty as modern_defineProperty } from "../../impl-modern/Object/defineProperty";
if(!Object.defineProperty) {
	if(Object.prototype.__defineSetter__) {
		Object.defineProperty = modern_defineProperty;
	}
}
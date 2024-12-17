import { Object } from "../../native/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { getOwnPropertyDescriptors$ff, getOwnPropertyDescriptors$ie } from "../../impl-modern/Object/getOwnPropertyDescriptors";
if(!Object.getOwnPropertyDescriptors) {
	if(defineProperty) {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$ie;
	} else if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$ff;
	}
}
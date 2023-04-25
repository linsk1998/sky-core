import { Object } from "../../native/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { ff_getOwnPropertyDescriptors, ie_getOwnPropertyDescriptors } from "../../impl-modern/Object/getOwnPropertyDescriptors";
if(!Object.getOwnPropertyDescriptors) {
	if(defineProperty) {
		Object.getOwnPropertyDescriptors = ie_getOwnPropertyDescriptors;
	} else if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyDescriptors = ff_getOwnPropertyDescriptors;
	}
}
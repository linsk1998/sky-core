import { defineProperty } from "../../native/Object/defineProperty";
import { getOwnPropertyDescriptors } from "../../impl-compat/Object/getOwnPropertyDescriptors";
import { ff_getOwnPropertyDescriptors, ie_getOwnPropertyDescriptors } from "../../impl-modern/Object/getOwnPropertyDescriptors";
if(!Object.getOwnPropertyDescriptors) {
	if(defineProperty) {
		Object.getOwnPropertyDescriptors = ie_getOwnPropertyDescriptors;
	} else if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyDescriptors = ff_getOwnPropertyDescriptors;
	} else {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
	}
}
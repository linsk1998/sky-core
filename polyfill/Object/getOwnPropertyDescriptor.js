import { Object } from "../../native/Object";
import { accessor } from "../../support/accessor";
import { getOwnPropertyDescriptor as compat_getOwnPropertyDescriptor, ie8_getOwnPropertyDescriptor } from "../../impl-compat/Object/getOwnPropertyDescriptor";
import { getOwnPropertyDescriptor as modern_getOwnPropertyDescriptor } from "../../impl-modern/Object/getOwnPropertyDescriptor";
if(!accessor) {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyDescriptor = modern_getOwnPropertyDescriptor;
	} else {
		if(Object.getOwnPropertyDescriptor) {
			Object.getOwnPropertyDescriptor = ie8_getOwnPropertyDescriptor;
		} else {
			Object.getOwnPropertyDescriptor = compat_getOwnPropertyDescriptor;
		}
	}
}
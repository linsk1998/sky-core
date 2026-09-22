import { Object } from "../../native/Object";
import { getOwnPropertyDescriptor } from "../../impl-modern/Object/getOwnPropertyDescriptor";
if(!Object.getOwnPropertyDescriptor) {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
	}
}
import { Object } from "../../native/Object";
import { getOwnPropertyDescriptors } from "../../impl-modern/Object/getOwnPropertyDescriptors";
if(!Object.getOwnPropertyDescriptors) {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
	}
}
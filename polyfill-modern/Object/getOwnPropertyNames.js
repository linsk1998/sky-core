import { Object } from "../../native/Object";
import { getOwnPropertyNames } from "../../impl-modern/Object/getOwnPropertyNames";
if(!Object.getOwnPropertyNames) {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyNames = getOwnPropertyNames;
	}
}
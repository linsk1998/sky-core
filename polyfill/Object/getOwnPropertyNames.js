import { Object } from "../../native/Object";
import { getOwnPropertyNames as compat_getOwnPropertyNames } from "../../impl-compat/Object/getOwnPropertyNames";
import { getOwnPropertyNames as modern_getOwnPropertyNames } from "../../impl-modern/Object/getOwnPropertyNames";
if(!Object.getOwnPropertyNames) {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyNames = modern_getOwnPropertyNames;
	} else {
		Object.getOwnPropertyNames = compat_getOwnPropertyNames;
	}
}
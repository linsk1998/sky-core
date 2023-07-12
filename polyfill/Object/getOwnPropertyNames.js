import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames as compat_getOwnPropertyNames } from "../../impl-compat/Object/getOwnPropertyNames";
import { ff_getOwnPropertyNames, ie_getOwnPropertyNames } from "../../impl-modern/Object/getOwnPropertyNames";
if(getOwnPropertyNames) {
	if(!Symbol) {
		Object.getOwnPropertyNames = ie_getOwnPropertyNames;
	}
} else {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyNames = ff_getOwnPropertyNames;
	} else {
		Object.getOwnPropertyNames = compat_getOwnPropertyNames;
	}
}
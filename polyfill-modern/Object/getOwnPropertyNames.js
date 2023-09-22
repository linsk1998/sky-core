import { Object } from "../../native/Object";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { Symbol } from "../../native/Symbol";
import { ff_getOwnPropertyNames, ie_getOwnPropertyNames } from "../../impl-modern/Object/getOwnPropertyNames";
if(getOwnPropertyNames) {
	if(!Symbol) {
		Object.getOwnPropertyNames = ie_getOwnPropertyNames;
	}
} else {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyNames = ff_getOwnPropertyNames;
	}
}
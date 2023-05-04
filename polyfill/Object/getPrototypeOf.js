import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { getPrototypeOf as compat_getPrototypeOf } from "../../impl-compat/Object/getPrototypeOf";
import { ff_getPrototypeOf, ie_getPrototypeOf } from "../../impl-modern/Object/getPrototypeOf";
if(!getPrototypeOf) {
	if(Object.prototype.__proto__) {
		Object.getPrototypeOf = ff_getPrototypeOf;
	} else {
		Object.getPrototypeOf = compat_getPrototypeOf;
	}
} else if(!setPrototypeOf) {
	Object.getPrototypeOf = ie_getPrototypeOf;
}
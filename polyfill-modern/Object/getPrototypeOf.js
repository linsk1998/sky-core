import { ff_getPrototypeOf, ie_getPrototypeOf } from "../../impl-modern/Object/getPrototypeOf";
import { Object } from "../../native/Object";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
if(!getPrototypeOf) {
	if('__proto__' in Object.prototype) {
		Object.getPrototypeOf = ff_getPrototypeOf;
	}
} else if(!setPrototypeOf) {
	Object.getPrototypeOf = ie_getPrototypeOf;
}

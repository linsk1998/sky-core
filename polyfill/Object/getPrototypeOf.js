import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { getPrototypeOf as compat_getPrototypeOf } from "../../impl-compat/Object/getPrototypeOf";
import { getPrototypeOf$legacy, getPrototypeOf$ie } from "../../impl-modern/Object/getPrototypeOf";
if(!getPrototypeOf) {
	if(Object.__proto__) {
		Object.getPrototypeOf = getPrototypeOf$legacy;
	} else {
		Object.getPrototypeOf = compat_getPrototypeOf;
	}
} else if(!setPrototypeOf) {
	Object.getPrototypeOf = getPrototypeOf$ie;
}
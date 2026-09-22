import { getPrototypeOf$legacy, getPrototypeOf$ie } from "../../impl-modern/Object/getPrototypeOf";
import { Object } from "../../native/Object";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
if(!getPrototypeOf) {
	if('__proto__' in Object.prototype) {
		Object.getPrototypeOf = getPrototypeOf$legacy;
	}
} else if(!setPrototypeOf) {
	Object.getPrototypeOf = getPrototypeOf$ie;
}

import { getPrototypeOf } from "../../../native/Object/getPrototypeOf";

export function getPrototypeOf$ie(object) {
	if('__proto__' in object) {
		return object.__proto__;
	}
	return getPrototypeOf(object);
}

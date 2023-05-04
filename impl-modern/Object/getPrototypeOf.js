import { getPrototypeOf } from "../../native/Object/getPrototypeOf";

export function ff_getPrototypeOf(object) {
	return object.__proto__;
};
export function ie_getPrototypeOf(object) {
	if('__proto__' in object) {
		return object.__proto__;
	}
	return getPrototypeOf(object);
};

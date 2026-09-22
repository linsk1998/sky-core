import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { nullProto } from "../../support/nullProto";

export function getPrototypeOf$ff(object) {
	return object.__proto__ || null;
};
export function getPrototypeOf$o(object) {
	var __proto__ = object.__proto__;
	return __proto__ === nullProto ? null : __proto__;
};

export var getPrototypeOf$legacy = nullProto ? getPrototypeOf$o : getPrototypeOf$ff;

export function getPrototypeOf$ie(object) {
	if('__proto__' in object) {
		return object.__proto__;
	}
	return getPrototypeOf(object);
};

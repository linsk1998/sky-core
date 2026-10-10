import { isNullBase } from "./nullProto$es3";

export function getPrototypeOf$o(object) {
	return isNullBase(object) ? null : object.__proto__;
}
getPrototypeOf$o.sham = true;

import { getOwnPropertyDescriptor } from "../../../native/Object/getOwnPropertyDescriptor";
import { isNullBase } from "../proto/nullProto$jscript";
import { getOwnPropertyDescriptor$es3 } from "./getOwnPropertyDescriptor$es3";

export function getOwnPropertyDescriptor$ie8(obj, prop) {
	if(obj instanceof Object || isNullBase(obj)) {
		return getOwnPropertyDescriptor$es3.apply(Object, arguments);
	}
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	if(typeof obj !== "object" && typeof obj !== "function") {
		return;
	}
	return getOwnPropertyDescriptor.apply(Object, arguments);
}
getOwnPropertyDescriptor$ie8.sham = true;

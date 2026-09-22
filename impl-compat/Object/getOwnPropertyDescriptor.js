import { NullProtoObject } from "../../impl-compat/Object/NullProtoObject";
import { getOwnPropertyDescriptor as native_getOwnPropertyDescriptor } from "../../native/Object/getOwnPropertyDescriptor";

export function getOwnPropertyDescriptor(obj, prop) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	if(typeof obj !== "object" && typeof obj !== "function") {
		return;
	}
	var key = '@@desc:' + prop;
	if(key in obj) {
		var descriptor = obj[key];
		if('value' in descriptor) {
			descriptor.value = obj[prop];
		}
		return descriptor;
	}
	if(Object.hasOwn(obj, prop)) {
		return {
			value: obj[prop],
			writable: true,
			enumerable: String(prop).substring(0, 2) !== "__",
			configurable: true
		};
	}
};
getOwnPropertyDescriptor.sham = true;
export function ie8_getOwnPropertyDescriptor(obj, prop) {
	if(obj instanceof Object || obj instanceof NullProtoObject) {
		return getOwnPropertyDescriptor.apply(Object, arguments);
	} else {
		if(obj == null) {
			throw new TypeError("Cannot convert undefined or null to object");
		}
		if(typeof obj !== "object" && typeof obj !== "function") {
			return;
		}
		return native_getOwnPropertyDescriptor.apply(Object, arguments);
	}
};
ie8_getOwnPropertyDescriptor.sham = true;
import { NullProtoObject } from "../../impl-compat/Object/NullProtoObject";
import { hasOwnProperty } from "../../native/Object/prototype/hasOwnProperty";

export function hasOwn(obj, key) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	if(typeof obj !== "object") {
		return false;
	}
	if(!(key in obj)) {
		return false;
	}
	if(obj instanceof NullProtoObject) {
		return false;
	}
	var value = obj[key];
	if(!(obj instanceof Object)) {
		var constructor = obj.constructor;
		if(constructor) {
			var proto = constructor.prototype;
			if(obj !== proto) {
				return proto[key] !== value;
			}
		}
	}
	return hasOwnProperty.call(obj, key);
};
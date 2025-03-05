import { NullProtoObject } from "../impl-compat/Object/NullProtoObject";

export function isPlainObject(obj) {
	if(typeof obj === "object" && obj !== null) {
		if(obj instanceof Object) {
			return obj.constructor === Object;
		} else {
			return obj instanceof NullProtoObject;
		}
	}
	return false;
};

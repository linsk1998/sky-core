import { NullProtoObject } from "../impl-compat/Object/NullProtoObject";

export function isJsObject(o) {
	if(typeof o !== "object") {
		return false;
	}
	if(o instanceof Object) {
		return true;
	}
	if(o instanceof NullProtoObject) {
		return true;
	}
	return false;
}
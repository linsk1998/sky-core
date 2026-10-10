import { isNullBase } from "../impl/object/proto/nullProto$jscript";

export function isJsObject(o) {
	if(typeof o !== "object") {
		return false;
	}
	if(o instanceof Object) {
		return true;
	}
	if(isNullBase(o)) {
		return true;
	}
	return false;
}

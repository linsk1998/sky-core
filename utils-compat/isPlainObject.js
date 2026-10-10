import { isNullBase } from "../impl/object/proto/nullProto$jscript";

export function isPlainObject(obj) {
	if(typeof obj === "object" && obj !== null) {
		if(obj instanceof Object) {
			return obj.constructor === Object;
		} else {
			return isNullBase(obj);
		}
	}
	return false;
};

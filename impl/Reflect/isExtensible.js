import { isExtensible as Object_isExtensible } from "../../native/Object/isExtensible";
import { proto } from "../../support/proto";

export function isExtensible$object(target) {
	if(!isNotNullObject(target)) {
		throw new TypeError("isExtensible called on non-object");
	}
	return Object_isExtensible(target);
};

export function isExtensible(target) {
	if(!isNotNullObject(target)) {
		throw new TypeError("isExtensible called on non-object");
	}
	if(o instanceof Object) {
		return true;
	}
	if(proto) {
		return true;
	}
	return false;
};
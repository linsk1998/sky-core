import { preventExtensions as Object_preventExtensions } from "../../native/Object/preventExtensions";

export function preventExtensions$object(target) {
	if(!isNotNullObject(target)) {
		throw new TypeError("isExtensible called on non-object");
	}
	try {
		Object_preventExtensions(target);
		return true;
	} catch(e) {
		return false;
	}
};

export function preventExtensions(target) {
	if(!isNotNullObject(target)) {
		throw new TypeError("isExtensible called on non-object");
	}
	return false;
};
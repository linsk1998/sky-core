import { isNotNullObject } from "../../utils/isNotNullObject";

export function preventExtensions(target) {
	if(!isNotNullObject(target)) {
		throw new TypeError("preventExtensions called on non-object");
	}
	try {
		Object.preventExtensions(target);
		return true;
	} catch(e) {
		return false;
	}
};

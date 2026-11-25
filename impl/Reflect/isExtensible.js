import { isNotNullObject } from "../../utils/isNotNullObject";

export function isExtensible(target) {
	if(!isNotNullObject(target)) {
		throw new TypeError("isExtensible called on non-object");
	}
	return Object.isExtensible(target);
};

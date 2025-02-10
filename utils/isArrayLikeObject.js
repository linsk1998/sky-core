import { isArrayLike } from "./isArrayLike";
export function isArrayLikeObject(obj) {
	if(isArrayLike(obj) && typeof obj === "object") {
		return true;
	}
	return false;
};
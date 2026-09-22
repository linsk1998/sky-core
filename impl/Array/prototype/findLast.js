import { findLastIndex } from "./findLastIndex";
export function findLast(callback) {
	var thisArg = arguments[1];
	var i = findLastIndex.call(this, callback, thisArg);
	if(i >= 0) {
		return this[i];
	}
};
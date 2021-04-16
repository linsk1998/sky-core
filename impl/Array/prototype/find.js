import { findIndex } from "./findIndex";
export function find(callback) {
	var thisArg = arguments[1];
	var i = findIndex.call(this, callback, thisArg);
	if(i >= 0) {
		return this[i];
	}
};
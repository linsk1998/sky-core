import { findIndex } from "./findIndex";
export function find(array, callback, thisArg) {
	var i = findIndex(array, callback, thisArg);
	if(i >= 0) {
		return array[i];
	}
};
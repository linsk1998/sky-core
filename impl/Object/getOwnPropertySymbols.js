import { isPrimitive } from "../../utils/isPrimitive";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { allSymbols } from "../Symbol";

export function getOwnPropertySymbols$property(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	var keys = getOwnPropertyNames(obj);
	var len = keys.length;
	for(var i = 0; i < len; i++) {
		var key = keys[i];
		if(key.slice(0, 2) === "@@") {
			if(Object.hasOwn(allSymbols, key) && key in allSymbols) {
				arr.push(allSymbols[key]);
			}
		}
	}
	return arr;
}
export function getOwnPropertySymbols(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	for(var key in obj) {
		if(key.slice(0, 2) === "@@") {
			if(Object.hasOwn(obj, key) && key in allSymbols) {
				arr.push(allSymbols[key]);
			}
		}
	}
	return arr;
} 
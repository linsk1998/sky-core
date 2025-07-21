import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";

export function ownKeys$symbol(obj) {
	return getOwnPropertyNames(obj).concat(getOwnPropertySymbols(obj));
}

export function ownKeys$property(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	var keys = getOwnPropertyNames(obj);
	var len = keys.length;
	for(var i = 0; i < len; i++) {
		var key = keys[i];
		if(Object.hasOwn(allSymbols, key)) {
			if(key.slice(0, 2) === "@@") {
				if(key in allSymbols) {
					arr.push(allSymbols[key]);
				}
			} else {
				arr.push(key);
			}
		}
	}
	return arr;
}
export function ownKeys(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	for(var key in obj) {
		if(Object.hasOwn(allSymbols, key)) {
			if(key.slice(0, 2) === "@@") {
				if(key in allSymbols) {
					arr.push(allSymbols[key]);
				}
			} else {
				arr.push(key);
			}
		}
	}
	return arr;
} 
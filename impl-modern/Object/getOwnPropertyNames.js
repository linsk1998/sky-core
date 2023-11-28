import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { isNotSymbolKey } from "./isNotSymbolKey";
import { keys as modern_keys } from "./keys";

var length = 'length';
export function ff_getOwnPropertyNames(obj) {
	var keys = modern_keys(obj);
	if(keys.indexOf(length) < 0) {
		if(Object.hasOwn(obj, length)) {
			keys.push(length);
		}
	}
	return keys;
}
export function ie_getOwnPropertyNames(obj) {
	return getOwnPropertyNames(obj).filter(isNotSymbolKey);
}
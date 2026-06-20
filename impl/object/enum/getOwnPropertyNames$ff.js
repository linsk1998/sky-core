import { keys as modern_keys } from "./keys";

var length = 'length';
export function getOwnPropertyNames$ff(obj) {
	var keys = modern_keys(obj);
	if(keys.indexOf(length) < 0) {
		if(Object.hasOwn(obj, length)) {
			keys.push(length);
		}
	}
	return keys;
}

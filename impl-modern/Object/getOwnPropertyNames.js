import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { isNotSymbolKey } from "./isNotSymbolKey";

import { keys as modern_keys } from "./keys";
export function ff_getOwnPropertyNames(obj) {
	var keys = modern_keys(obj);
	var i = keys.length;
	var names = [];
	while(i-- > 0) {
		var key = keys[i];
		var set = obj.__lookupSetter__(key);
		var get = obj.__lookupGetter__(key);
		if(set || get) {
			names.push(key);
		}
	}
	return descs;
}
export function ie_getOwnPropertyNames(obj) {
	return getOwnPropertyNames(obj).filter(isNotSymbolKey);
}
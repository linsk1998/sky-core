import { Symbol } from "../../native/Symbol";
import { keys as native_keys } from "../../native/Object/keys";
import { isNotSymbolKey } from "./isNotSymbolKey";
export function ie_keys(obj) {
	return native_keys.call(Object, obj).filter(isNotSymbolKey);
}
export function nie_keys(obj) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	var result = [];
	for(var key in obj) {
		if(key.substring(0, 2) !== "@@" && Object.prototype.hasOwnProperty.call(obj, key)) {
			result.push(key);
		}
	}
	return result;
}
export function keys(obj) {
	if(!native_keys) {
		return nie_keys(obj);
	} else if(Symbol) {
		return native_keys(obj);
	} else {
		return ie_keys(obj);
	}
}
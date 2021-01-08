import "../../polyfill/String/prototype/startsWith";
import { Symbol } from "../../native/Symbol";
import { keys as native_keys } from "../../native/Object/keys";
export function ie_keys(obj) {
	return native_keys.call(Object, obj).filter(checkSymbolKey);
}
function checkSymbolKey(key) {
	return !key.startsWith("@@");
}
export function nie_keys(obj) {
	var result = [];
	for(var key in obj) {
		if(!key.startsWith("@@") && Object.prototype.hasOwnProperty.call(obj, key)) {
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
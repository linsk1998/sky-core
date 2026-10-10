import { getOwnPropertyNames } from "../../../native/Object/getOwnPropertyNames";
import { getOwnPropertySymbols } from "../../../native/Object/getOwnPropertySymbols";

export function getOwnPropertyDescriptors$sb(obj) {
	var keys = getOwnPropertyNames(obj);
	var symbols = getOwnPropertySymbols(obj);
	var descs = {};
	var key, i;
	i = keys.length;
	while(i-- > 0) {
		key = keys[i];
		descs[key] = Object.getOwnPropertyDescriptor(obj, key);
	}
	i = symbols.length;
	while(i-- > 0) {
		key = symbols[i];
		descs[key] = Object.getOwnPropertyDescriptor(obj, key);
	}
	return descs;
}

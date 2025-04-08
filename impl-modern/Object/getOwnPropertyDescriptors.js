import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
export function getOwnPropertyDescriptors$ff(obj) {
	var ownKeys = Object.keys(obj);
	var i = ownKeys.length;
	var descs = {};
	while(i-- > 0) {
		var key = ownKeys[i];
		var set = obj.__lookupSetter__(key);
		var get = obj.__lookupGetter__(key);
		if(set || get) {
			var desc = {
				enumerable: true,
				configurable: true
			};
			desc.set = set;
			desc.get = get;
			descs[key] = desc;
		}
	}
	return descs;
}
export function getOwnPropertyDescriptors$ie(obj) {
	var ownKeys = getOwnPropertyNames(obj);
	var i = ownKeys.length;
	var descs = {};
	while(i-- > 0) {
		var key = ownKeys[i];
		descs[key] = Object.getOwnPropertyDescriptor(obj, key);
	}
	return descs;
}
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
import { getOwnPropertyDescriptor$es3 } from "./getOwnPropertyDescriptor$es3";

export function getOwnPropertyDescriptors$es3(obj) {
	var keys = Object.getOwnPropertyNames(obj);
	keys = keys.concat(Object.getOwnPropertySymbols(obj));
	var o = {};
	var i, key;
	for(i = 0; i < keys.length; i++) {
		key = keys[i];
		o[key] = getOwnPropertyDescriptor$es3(obj, key);
	}
	return o;
}
getOwnPropertyDescriptors$es3.sham = true;

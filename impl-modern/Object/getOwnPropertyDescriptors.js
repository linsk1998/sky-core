import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { _getOwnPropertyDescriptor } from "./getOwnPropertyDescriptor";

export function getOwnPropertyDescriptors$ff(obj) {
	var ownKeys = Object.keys(obj);
	var i = ownKeys.length;
	var descs = {};
	while(i-- > 0) {
		var key = ownKeys[i];
		descs[key] = _getOwnPropertyDescriptor(obj, key);
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
import { getOwnPropertyNames } from "../../../native/Object/getOwnPropertyNames";

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

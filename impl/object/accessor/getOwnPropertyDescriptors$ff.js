import { getOwnPropertyDescriptor$ff } from "./getOwnPropertyDescriptor$ff";

export function getOwnPropertyDescriptors$ff(obj) {
	var ownKeys = Object.keys(obj);
	var i = ownKeys.length;
	var descs = {};
	while(i-- > 0) {
		var key = ownKeys[i];
		descs[key] = getOwnPropertyDescriptor$ff(obj, key);
	}
	return descs;
}

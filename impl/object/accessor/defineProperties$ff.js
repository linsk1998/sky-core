import { defineProperty$ff } from "./defineProperty$ff";

export function defineProperties$ff(obj, properties) {
	var ownKeys = Object.keys(properties);
	var len = ownKeys.length;
	for(var i = 0; i < len; i++) {
		var key = ownKeys[i];
		defineProperty$ff(obj, key, properties[key]);
	}
	return obj;
};

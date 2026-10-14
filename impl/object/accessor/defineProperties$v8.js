import { defineProperty$v8 } from "./defineProperty$v8";

export function defineProperties$v8(obj, properties) {
	var ownKeys = Object.keys(properties);
	var len = ownKeys.length;
	for(var i = 0; i < len; i++) {
		var key = ownKeys[i];
		defineProperty$v8(obj, key, properties[key]);
	}
	return obj;
};

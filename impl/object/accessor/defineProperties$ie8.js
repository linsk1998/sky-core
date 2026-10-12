import { defineProperty$ie8 } from "./defineProperty$ie8";

export function defineProperties$ie8(obj, properties) {
	var ownKeys = Object.keys(properties);
	var len = ownKeys.length;
	for(var i = 0; i < len; i++) {
		var key = ownKeys[i];
		defineProperty$ie8(obj, key, properties[key]);
	}
	return obj;
};
defineProperties$ie8.sham = true;

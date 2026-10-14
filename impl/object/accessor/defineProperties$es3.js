import { defineProperty$es3 } from "./defineProperty$es3";

export function defineProperties$es3(obj, properties) {
	var ownKeys = Object.keys(properties);
	var len = ownKeys.length;
	for(var i = 0; i < len; i++) {
		var key = ownKeys[i];
		defineProperty$es3(obj, key, properties[key]);
	}
	return obj;
};
defineProperties$es3.sham = true;

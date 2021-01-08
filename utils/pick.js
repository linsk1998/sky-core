
import "sky-core/polyfill/Array/prototype/includes";
export function pick(obj, keys) {
	var rest = {};
	if(obj) {
		var ownKeys = Object.keys(obj);
		var i = keys.length;
		while(i--) {
			var key = keys[i];
			if(ownKeys.includes(key)) {
				rest[key] = obj[key];
			}
		}
	}
	return rest;
};
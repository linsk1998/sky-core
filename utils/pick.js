
import includes from "sky-core/pure/Array/prototype/includes";
export function pick(obj, keys) {
	var rest = {};
	if(obj) {
		var ownKeys = Object.keys(obj);
		var i = keys.length;
		while(i--) {
			var key = keys[i];
			if(includes.call(ownKeys, key)) {
				rest[key] = obj[key];
			}
		}
	}
	return rest;
};
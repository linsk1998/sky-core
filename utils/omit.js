
import includes from "sky-core/pure/Array/prototype/includes";
export function omit(obj, keys) {
	var rest = {};
	if(obj) {
		var ownKeys = Object.keys(obj);
		var i = ownKeys.length;
		while(i--) {
			var key = ownKeys[i];
			if(!includes.call(keys, key)) {
				rest[key] = obj[key];
			}
		}
	}
	return rest;
};
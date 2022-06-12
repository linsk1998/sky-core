import indexOf from "sky-core/pure/Array/prototype/indexOf";
import { keys as compat_keys } from "./keys";
export function getOwnPropertyNames(obj) {
	var keys = compat_keys(obj);
	for(var key in obj) {
		if(key.substring(0, 8) === "@@desc:") {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				var prop = key.substring(7);
				if(indexOf.call(keys, prop) < 0) {
					keys.push(prop);
				}
			}
		}
	}
	return keys;
};
import indexOf from "sky-core/pure/Array/prototype/indexOf";
import { keys as compat_keys } from "./keys";
export function getOwnPropertyDescriptors(obj) {
	var o = {};
	var keys = [];
	for(var key in obj) {
		if(key.substring(0, 8) === "@@desc:") {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				var prop = key.substring(7);
				o[prop] = obj[key];
				keys.push(prop);
			}
		}
	}
	var ks = compat_keys(obj);
	var i = ks.length;
	while(i-- > 0) {
		var k = ks[i];
		if(indexOf.call(keys, k) < 0) {
			var desc = new Object();
			desc.value = obj[k];
			desc.writable = true;
			desc.enumerable = true;
			desc.configurable = true;
			o[k] = desc;
		}
	}
	return o;
};
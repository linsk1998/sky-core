import {keys as compat_keys} from "./keys";
export function getOwnPropertyNames(obj){
	var keys=compat_keys(obj);
	for(var key in obj){
		if(key.startsWith("@@desc:")){
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				var prop=key.substring(7);
				if(!keys.includes(prop)){
					keys.push(prop);
				}
			}
		}
	}
	return keys;
};
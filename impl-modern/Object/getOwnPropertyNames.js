
import {keys as modern_keys} from "./keys";
export function getOwnPropertyNames(obj){
	var keys=modern_keys(obj);
	var i=keys.length;
	var names=[];
	while(i-->0){
		var key=keys[i];
		var set=obj.__lookupSetter__(key);
		var get=obj.__lookupGetter__(key);
		if(set || get){
			names.push(key);
		}
	}
	return descs;
}
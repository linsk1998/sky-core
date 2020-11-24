import {keys} from "sky-core/pure/Object/keys";
import {defineProperty} from "sky-core/pure/Object/defineProperty";

export function defineProperties(obj,properties){
	var ownKeys=keys(properties);
	var len=ownKeys.length;
	for(var i=0;i<len;i++){
		var key=ownKeys[i];
		defineProperty(obj,key,properties[key]);
	}
};
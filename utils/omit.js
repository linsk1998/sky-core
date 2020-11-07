import "core-js/modules/es.object.keys";
import "core-js/modules/es.array.includes";
export function omit(obj,keys){
	var rest={};
	if(obj){
		var ownKeys=Object.keys(obj);
		var i=ownKeys.length;
		while(i--){
			var key=ownKeys[i];
			if(!keys.includes(key)){
				rest[key]=obj[key];
			}
		}
	}
	return rest;
};
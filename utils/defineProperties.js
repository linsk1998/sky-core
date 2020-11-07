import "sky-core/polyfill/Object/defineProperty";
export function defineProperties(obj,properties){
	var keys=Object.keys(obj);
	var i=keys.length;
	while(i-->0){
		var key=keys[i];
		var descriptor=properties[key];
		Object.defineProperty(obj,key,descriptor);
	}
};
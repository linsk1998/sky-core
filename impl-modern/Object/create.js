import {defineProperties} from "sky-core/pure/Object/defineProperties";
export function create(proto,properties){
	var o={};
	Object.setPrototypeOf(o,proto);
	if(properties){
		defineProperties(o,properties);
	}
	return o;
};

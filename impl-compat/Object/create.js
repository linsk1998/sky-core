import {defineProperties} from "sky-core/pure/Object/defineProperties";
export function create(proto,properties){
	function F(){}
	F.prototype = proto;
	var o=new F();
	if(properties){
		defineProperties(o,properties);
	}
	return o;
};

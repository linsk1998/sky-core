import { NullProtoObject } from "./NullProtoObject";

function F() { /* empty */ };
export function create(proto, properties) {
	var o;
	if(proto !== null) {
		F.prototype = proto;
		var o = new F();
		F.prototype = null;
	} else {
		o = NullProtoObject();
	}
	o.__proto__ = proto;
	if(properties) {
		Object.defineProperties(o, properties);
	}
	return o;
};
create.sham = true;
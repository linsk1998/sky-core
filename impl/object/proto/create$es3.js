import { getNullProto } from "./nullProto$es3";

function F() { /* empty */ }

export function create$es3(proto, properties) {
	var o;
	if(proto !== null) {
		F.prototype = proto;
		o = new F();
		F.prototype = null;
	} else {
		F.prototype = getNullProto();
		o = new F();
		F.prototype = null;
	}
	o.__proto__ = proto;
	if(properties) {
		Object.defineProperties(o, properties);
	}
	return o;
}
create$es3.sham = true;

import { getNullProto } from "./nullProto$jscript";

function F() { /* empty */ }

export function create$jscript(proto, properties) {
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
create$jscript.sham = true;

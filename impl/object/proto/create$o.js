import { getNullProto } from "./nullProto$es3";

export function create$o(proto, properties) {
	var o = {};
	if(proto === null) {
		o.__proto__ = getNullProto();
	} else {
		o.__proto__ = proto;
	}
	if(properties) {
		Object.defineProperties(o, properties);
	}
	return o;
}
create$o.sham = true;

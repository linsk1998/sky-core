export function setPrototypeOf$ie(o, proto) {
	o.__proto__ = proto;
	for(var key in proto) {
		if(Object.hasOwn(proto, key)) {
			o[key] = proto[key];
		}
	}
	return o;
}

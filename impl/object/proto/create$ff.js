export function create$ff(proto, properties) {
	var o = {};
	o.__proto__ = proto;
	if(properties) {
		Object.defineProperties(o, properties);
	}
	return o;
}

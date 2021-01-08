
export function create(proto, properties) {
	var o = {};
	Object.setPrototypeOf(o, proto);
	if(properties) {
		Object.defineProperties(o, properties);
	}
	return o;
};

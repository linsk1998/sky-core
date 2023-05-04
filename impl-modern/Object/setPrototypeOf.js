
export function ff_setPrototypeOf(obj, proto) {
	obj.__proto__ = proto;
	return obj;
}

export function ie_setPrototypeOf(o, proto) {
	o.__proto__ = proto;
	for(var key in proto) {
		if(Object.prototype.hasOwnProperty.call(proto, key)) {
			o[key] = proto[key];
		}
	}
	return o;
}

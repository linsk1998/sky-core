
export function get(target, propertyKey, receiver) {
	if(receiver === void 0) { receiver = target; }
	var o = target, attributes;
	do {
		attributes = Object.getOwnPropertyDescriptor(o, propertyKey);
		if(attributes) {
			if(attributes.get) {
				return attributes.get.call(receiver);
			}
			return attributes.value;
		}
		o = Object.getPrototypeOf(o);
	} while(o && o !== Object.prototype);
	return target[propertyKey];
};
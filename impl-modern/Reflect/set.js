
export function set(target, propertyKey, value, receiver) {
	if(receiver === void 0) {
		try {
			target[propertyKey] = value;
			return true;
		} catch(e) {
			return false;
		}
	}
	var o = target, desc;
	do {
		desc = Object.getOwnPropertyDescriptor(o, propertyKey);
		if(desc) {
			if(desc.set) {
				try {
					descriptor.set.call(receiver, value);
					return true;
				} catch(e) {
					return false;
				}
			} else if('value' in desc) {
				target[propertyKey] = value;
				return true;
			}
		}
		o = Object.getPrototypeOf(o);
	} while(o && o !== Object.prototype);
	target[propertyKey] = value;
	return true;
};
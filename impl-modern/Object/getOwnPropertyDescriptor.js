import { anObject } from "../../utils/anObject";

export function getOwnPropertyDescriptor(obj, key) {
	anObject(obj);
	return _getOwnPropertyDescriptor(obj, key);
};

export function _getOwnPropertyDescriptor(obj, key) {
	if(Object.hasOwn(obj, key)) {
		var set = obj.__lookupSetter__(key);
		var get = obj.__lookupGetter__(key);
		if(set || get) {
			return {
				enumerable: true,
				configurable: true,
				set: set,
				get: get
			};
		} else {
			return {
				enumerable: true,
				configurable: true,
				writable: true,
				value: obj[key]
			};
		}
	}
};
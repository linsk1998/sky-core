import { anObject } from "../../utils/anObject";

export function getOwnPropertyDescriptor(obj, key) {
	if(Object.prototype.hasOwnProperty.call(obj, key)) {
		anObject(obj);
		var r = new Object();
		r.enumerable = true;
		r.configurable = true;
		r.set = obj.__lookupSetter__(key);
		r.get = obj.__lookupGetter__(key);
		return r;
	}
};
import { anObject } from "../../utils/anObject";

export function getOwnPropertyDescriptor(obj, key) {
	if(Object.prototype.hasOwnProperty.call(obj, key)) {
		anObject(obj);
		var r = new Object();
		r.enumerable = true;
		r.configurable = true;
		var set = obj.__lookupSetter__(key);
		var get = obj.__lookupGetter__(key);
		if(set || get) {
			r.writable = !!set;
			r.set = set;
			r.get = get;
		} else {
			r.writable = true;
			r.value = obj[key];
		}
		return r;
	}
};
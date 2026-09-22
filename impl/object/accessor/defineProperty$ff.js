import { anObject } from "../../../utils/anObject";
import { __defineGetter__ } from "../../../native/Object/prototype/__defineGetter__";
import { __defineSetter__ } from "../../../native/Object/prototype/__defineSetter__";

export function defineProperty$ff(obj, prop, descriptor) {
	anObject(obj);
	prop = String(prop);
	if('value' in descriptor) {
		var value = descriptor.value;
		if(descriptor.writable) {
			if(!(prop in obj) || Object.hasOwn(obj, prop)) {
				delete obj[prop];
				obj[prop] = value;
			} else {
				__defineGetter__.call(obj, prop, function() { return value; });
				__defineSetter__.call(obj, prop, function(v) { value = v; });
			}
		} else {
			__defineGetter__.call(obj, prop, function() { return value; });
		}
	} else {
		if(descriptor.get) __defineGetter__.call(obj, prop, descriptor.get);
		if(descriptor.set) __defineSetter__.call(obj, prop, descriptor.set);
	}
	return obj;
};
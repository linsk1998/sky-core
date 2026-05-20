import { isNotNullObject } from "../../utils/isNotNullObject";
import { defineProperty } from "../../native/Object/defineProperty";


export function ff_defineProperty(obj, prop, descriptor) {
	if(!isNotNullObject(obj)) {
		throw new TypeError("Object.defineProperty called on non-object");
	}
	prop = String(prop);
	if('value' in descriptor) {
		delete obj[prop];
		obj[prop] = descriptor.value;
	} else {
		if(descriptor.get) obj.__defineGetter__(prop, descriptor.get);
		if(descriptor.set) obj.__defineSetter__(prop, descriptor.set);
	}
	return obj;
};

export function v8_defineProperty(obj, prop, descriptor) {
	if(descriptor.configurable && descriptor.writable && 'value' in descriptor) {
		var value = descriptor.value;
		return defineProperty(obj, prop, {
			get: function() { return value; },
			set: function(v) { value = v; },
			enumerable: false,
			configurable: true
		});
	}
	return defineProperty(obj, prop, descriptor);
};
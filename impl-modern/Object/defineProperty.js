import { isNotNullObject } from "../../utils/isNotNullObject";
import { defineProperty } from "../../native/Object/defineProperty";
import { noop } from "../../utils/noop";


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
	if(descriptor.configurable && descriptor.writable) {
		defineProperty(obj, prop, {
			get: noop,
			set: noop,
			enumerable: false,
			configurable: true
		});
	}
	return defineProperty(obj, prop, descriptor);
};
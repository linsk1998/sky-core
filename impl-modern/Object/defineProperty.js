import { isNotNullObject } from "../../utils/isNotNullObject";

export function defineProperty(obj, prop, descriptor) {
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
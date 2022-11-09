

import { defineProperty as native_defineProperty } from "../../native/Object/defineProperty";
export function ie8_defineProperty(obj, prop, descriptor) {
	if(obj instanceof Object) {
		compat_defineProperty.apply(Object, arguments);
	} else {
		delete descriptor.enumerable;
		native_defineProperty.apply(Object, arguments);
	}
	return obj;
};
export function defineProperty(obj, prop, descriptor) {
	if(native_defineProperty) {
		if(obj instanceof Object) {
			compat_defineProperty.apply(Object, arguments);
		} else {
			delete descriptor.enumerable;
			native_defineProperty.apply(Object, arguments);
		}
	} else {
		compat_defineProperty.apply(Object, arguments);
	}
	return obj;
};

export function compat_defineProperty(obj, prop, descriptor) {
	if(typeof obj !== "object") {
		throw new TypeError("Object.defineProperty called on non-object");
	}
	prop = String(prop);
	if('value' in descriptor) {
		obj[prop] = descriptor.value;
	} else {
		console.warn("ES3 do NOT support accessor.");
	}
	obj['@@desc:' + prop] = descriptor;
	return obj;
};
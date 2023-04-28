import { NullProtoObject } from "../../impl-compat/Object/NullProtoObject";
import { defineProperty as native_defineProperty } from "../../native/Object/defineProperty";
export function ie8_defineProperty(obj, prop, descriptor) {
	if(obj instanceof Object || obj instanceof NullProtoObject) {
		compat_defineProperty.apply(Object, arguments);
	} else {
		delete descriptor.enumerable;
		native_defineProperty.apply(Object, arguments);
	}
	return obj;
};
export function defineProperty(obj, prop, description) {
	if(native_defineProperty) {
		if(obj instanceof Object || obj instanceof NullProtoObject) {
			compat_defineProperty.apply(Object, arguments);
		} else {
			delete description.enumerable;
			native_defineProperty.apply(Object, arguments);
		}
	} else {
		compat_defineProperty.apply(Object, arguments);
	}
	return obj;
};

export function compat_defineProperty(obj, prop, description) {
	if(typeof obj !== "object" && typeof obj !== "function") {
		throw new TypeError("Object.defineProperty called on non-object");
	}
	prop = String(prop);
	var descriptor = {
		configurable: true,
		enumerable: true,
		writable: true,
	};
	if('value' in description) {
		obj[prop] = description.value;
		descriptor.value = description.value;
	} else {
		console.warn("ES3 do NOT support accessor.");
		descriptor.get = description.get;
		descriptor.set = description.set;
	}
	obj['@@desc:' + prop] = descriptor;
	return obj;
};
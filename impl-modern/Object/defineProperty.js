import { isNotNullObject } from "../../utils/isNotNullObject";
import { defineProperty } from "../../native/Object/defineProperty";

var __defineGetter__ = Object.prototype.__defineGetter__;
var __defineSetter__ = Object.prototype.__defineSetter__;

export function ff_defineProperty(obj, prop, descriptor) {
	if(!isNotNullObject(obj)) {
		throw new TypeError("Object.defineProperty called on non-object");
	}
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
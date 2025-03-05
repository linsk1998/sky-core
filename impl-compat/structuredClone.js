import { toString } from "../native/Object/prototype/toString";
import { NullProtoObject } from "../impl-compat/Object/NullProtoObject";
import { Symbol } from "../impl-compat/Symbol/constructor";

export function structuredClone(obj) {
	var r;
	if(arguments.length === 0) {
		throw new Error("Failed to execute 'structuredClone': 1 argumnet required.");
	}
	if(typeof obj === "object") {
		if(obj === null) {
			return obj;
		}
		if(Array.isArray(obj)) {
			return arrayClone(obj);
		} else if(obj instanceof NullProtoObject) {
			return objectClone({}, obj);
		} else if(!(obj instanceof Object)) {
			throw new Error("Failed to execute 'structuredClone' on DOM");
		} else if(obj.constructor === Object) {
			return objectClone({}, obj);
		} else if(obj instanceof Set) {
			return new Set(obj);
		} else if(obj instanceof Map) {
			return new Map(obj);
		} else if(obj instanceof Array) {
			return arrayClone(obj);
		} else if(obj instanceof Error) {
			r = Object.create(Object.getPrototypeOf(obj));
			r.message = obj.message;
			r.stack = obj.stack;
			if('cause' in obj) {
				r.cause = obj.cause;
			}
			if('errors' in obj) {
				r.errors = obj.errors;
			}
			return r;
		} else if(obj instanceof Symbol) {
			throw new Error("Failed to execute 'structuredClone' on Symbol");
		}
		var type = toString.call(obj);
		switch(type) {
			case '[object Object]':
				return objectClone(Object.create(Object.getPrototypeOf(obj)), obj);
			case '[object Date]':
				return new Date(obj);
			case '[object Number]':
				return new Number(obj);
			case '[object String]':
				return new String(obj);
			case '[object Boolean]':
				return new Boolean(obj.valueOf());
			case '[object RegExp]':
				return new RegExp(obj);
			default:
				throw new Error("Failed to execute 'structuredClone' on " + type);
		}
	} else if(typeof obj === "function") {
		throw new Error("Failed to execute 'structuredClone' on Function");
	} else {
		return obj;
	}
}

function arrayClone(obj) {
	var r, keys, len, i, key;
	r = new Array(obj.length);
	keys = Object.keys(obj);
	len = keys.length;
	for(i = 0; i < len; i++) {
		key = keys[i];
		r[key] = structuredClone(obj[key]);
	}
	return r;
}
function objectClone(r, obj) {
	var keys, len, i, key;
	keys = Object.keys(obj);
	len = keys.length;
	for(i = 0; i < len; i++) {
		key = keys[i];
		r[key] = structuredClone(obj[key]);
	}
	return r;
}
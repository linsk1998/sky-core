import { isNode } from "sky-core/utils/isNode";
import { toString } from "../native/Object/prototype/toString";
import { isPlainObject } from "sky-core/utils/isPlainObject";
import { isSymbol } from "sky-core/utils/isSymbol";
import { isWindow } from "sky-core/utils/isWindow";

export function structuredClone(obj) {
	var r;
	if(arguments.length === 0) {
		throw new Error("Failed to execute 'structuredClone': 1 argumnet required.");
	}
	if(isSymbol(obj)) {
		throw new Error("Failed to execute 'structuredClone' on Symbol");
	}
	if(typeof obj === "object") {
		if(obj === null) {
			return obj;
		}
		if(Array.isArray(obj)) {
			return arrayClone(obj);
		} else if(isPlainObject(obj)) {
			return objectClone({}, obj);
		} else if(!(obj instanceof Object) || isNode(obj)) {
			throw new Error("Failed to execute 'structuredClone' on DOM");
		} else if(obj instanceof Set) {
			return new Set(obj);
		} else if(obj instanceof Map) {
			return new Map(obj);
		} else if(obj instanceof Array) {
			if(obj.buffer) {
				return new obj.constructor(obj);
			} else {
				return arrayClone(obj);
			}
		} else if(obj instanceof Error) {
			r = Object.create(Object.getPrototypeOf(obj));
			r.message = obj.message;
			Object.defineProperty(r, 'stack', {
				value: obj.stack,
				configurable: true,
				enumerable: true,
				writable: true
			});
			if('cause' in obj) {
				r.cause = obj.cause;
			}
			if('errors' in obj) {
				r.errors = obj.errors;
			}
			return r;
		} else if(isWindow(obj)) {
			throw new Error("Failed to execute 'structuredClone' on Window");
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
			case '[object ArrayBuffer]':
				return new Uint8Array(obj).buffer;
			case '[object DataView]':
				return new DataView(new Uint8Array(obj.buffer).buffer);
			case '[object Blob]':
				return obj.slice(0, obj.size, obj.type);
			case '[object BigInt]':
				return obj.valueOf();
			case '[object File]':
				if(window.File) {
					return new File([obj], obj.name);
				}
				return obj;
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
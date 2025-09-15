import { toString } from "../native/Object/prototype/toString";
import { Symbol } from "../impl/Symbol";
import { isRegExp } from "../utils/isRegExp";

export function structuredClone(obj) {
	var r;
	if(arguments.length === 0) {
		throw new Error("Failed to execute 'structuredClone': 1 argumnet required.");
	}
	if(typeof obj === "object") {
		if(obj === null) {
			return obj;
		}
		if(obj instanceof Symbol) {
			throw new Error("Failed to execute 'structuredClone' on Symbol");
		}
		var proto = Object.getPrototypeOf(obj);
		if(proto === null || proto === Object.prototype) {
			return objectClone({}, obj);
		} else if(Array.isArray(obj)) {
			return arrayClone(obj);
		} else if(obj instanceof Node || obj instanceof Event || obj === window) {
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
			r = Object.create(proto);
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
		}
		var type = toString.call(obj);
		switch(type) {
			case '[object Object]':
				return objectClone(Object.create(proto), obj);
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
				if(obj.toString() === '[object File]') {
					return new File([obj], obj.name, {
						type: obj.type,
						lastModified: obj.lastModified
					});
				}
				return obj.slice(0, obj.size, obj.type);
			case '[object File]':
				if(window.File) {
					return new File([obj], obj.name, {
						type: obj.type,
						lastModified: obj.lastModified
					});
				}
				return obj;
			case '[object FileList]':
				var transfer = new DataTransfer();
				for(var i = 0, len = obj.length; i < len; i++) {
					transfer.items.add(obj[i]);
				}
				return transfer.files;
			case '[object DOMRectReadOnly]':
				return new DOMRectReadOnly(obj.x, obj.y, obj.width, obj.height);
			case '[object DOMRect]':
				return new DOMRect(obj.x, obj.y, obj.width, obj.height);
			case '[object DOMPointReadOnly]':
				return new DOMPointReadOnly(obj.x, obj.y, obj.z, obj.w);
			case '[object DOMPoint]':
				return new DOMPoint(obj.x, obj.y, obj.z, obj.w);
			case '[object DOMQuad]':
				return new DOMQuad(obj.p1, obj.p2, obj.p3, obj.p4);
			default:
				throw new Error("Failed to execute 'structuredClone' on " + type);
		}
	} else if(typeof obj === "function") {
		if(isRegExp(obj)) {
			return new RegExp(obj);
		}
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
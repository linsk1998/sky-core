import { structuredClone as native_structuredClone } from "../native/structuredClone";
import { toString } from "../native/Object/prototype/toString";

export function structuredClone(obj) {
	if(arguments.length === 0) {
		throw new Error("Failed to execute 'structuredClone': 1 argumnet required.");
	}
	if(typeof obj === "object") {
		if(obj === null) {
			return obj;
		}
		let proto = Object.getPrototypeOf(obj);
		if(proto === null || proto === Object.prototype) {
			return objectClone({}, obj);
		} else if(Array.isArray(obj)) {
			return arrayClone(obj);
		} else if(obj instanceof Node || obj instanceof Event || obj instanceof Window) {
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
			let r = Object.create(Object.getPrototypeOf(obj));
			r.message = obj.message;
			r.stack = obj.stack;
			if('cause' in obj) {
				r.cause = obj.cause;
			}
			if('errors' in obj) {
				r.errors = arrayClone(obj.errors);
			}
			return r;
		}
		let type = toString.call(obj);
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
				return new Object(obj.valueOf());
			case '[object File]':
				return new File([obj], obj.name, {
					type: obj.type,
					lastModified: obj.lastModified
				});
			case '[object FileList]':
				const transfer = new DataTransfer();
				for(let it of obj) {
					transfer.items.add(it);
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
		throw new Error("Failed to execute 'structuredClone' on Function");
	} else if(typeof obj === "symbol") {
		throw new Error("Failed to execute 'structuredClone' on Symbol");
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

export function structuredClone$fix(obj) {
	if(typeof obj === "object") {
		if(obj instanceof Error) {
			let r = Object.create(Object.getPrototypeOf(obj));
			r.message = obj.message;
			r.stack = obj.stack;
			if('cause' in obj) {
				r.cause = obj.cause;
			}
			if('errors' in obj) {
				r.errors = arrayClone$fix(obj.errors);
			}
			return r;
		}
	}
	return native_structuredClone.apply(this, arguments);
}
function arrayClone$fix(obj) {
	var r, keys, len, i, key;
	r = new Array(obj.length);
	keys = Object.keys(obj);
	len = keys.length;
	for(i = 0; i < len; i++) {
		key = keys[i];
		r[key] = structuredClone$fix(obj[key]);
	}
	return r;
}
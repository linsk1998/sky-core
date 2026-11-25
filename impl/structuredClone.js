import { toString } from "../native/Object/prototype/toString";
import { isPlainObject } from "../utils/isPlainObject";
import { isNode } from "../utils/isNode";
import { isWindow } from "../utils/isWindow";
import { isRegExp } from "../utils/isRegExp";
import { Symbol } from "./Symbol/Symbol";

function isEvent(obj) {
	// IE9~11 的 window.Event 不是构造函数，裸 instanceof 会抛 TypeError
	return typeof Event === "function" && obj instanceof Event;
}

function fileClone(obj) {
	if(window.File) {
		return new File([obj], obj.name, {
			type: obj.type,
			lastModified: obj.lastModified
		});
	}
	return obj;
}

export function structuredClone(obj) {
	var r;
	if(arguments.length === 0) {
		throw new Error("Failed to execute 'structuredClone': 1 argument required.");
	}
	if(typeof obj === "object") {
		if(obj === null) {
			return obj;
		}
		if(obj instanceof Symbol) {
			throw new Error("Failed to execute 'structuredClone' on Symbol");
		}
		if(Array.isArray(obj)) {
			return arrayClone(obj);
		} else if(isPlainObject(obj)) {
			return objectClone({}, obj);
		} else if(!(obj instanceof Object) || isNode(obj) || isEvent(obj)) {
			throw new Error("Failed to execute 'structuredClone' on DOM");
		} else if(obj instanceof Set) {
			return new Set(obj);
		} else if(obj instanceof Map) {
			return new Map(obj);
		} else if(obj instanceof Array) {
			if(obj.buffer) {
				return new obj.constructor(obj);
			}
			return arrayClone(obj);
		} else if(Error.isError(obj)) {
			// FF60~85 的 WebAssembly Error 不是 Error 子类，跨 realm 的 Error instanceof 同样为 false，
			// Error.isError 的品牌检查兜住这两类；裸引用经 conditional 的既有映射按 tier 注入
			r = Object.create(Object.getPrototypeOf(obj));
			r.message = obj.message;
			r.stack = obj.stack;
			if('cause' in obj) {
				r.cause = obj.cause;
			}
			if('errors' in obj) {
				r.errors = arrayClone(obj.errors);
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
				if(obj.toString() === '[object File]') {
					return fileClone(obj);
				}
				return obj.slice(0, obj.size, obj.type);
			case '[object File]':
				return fileClone(obj);
			case '[object FileList]':
				var transfer = new DataTransfer();
				for(var i = 0, len = obj.length; i < len; i++) {
					transfer.items.add(obj[i]);
				}
				return transfer.files;
			case '[object BigInt]':
				return new Object(obj.valueOf());
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

import { isString } from "../../utils/isString";
import { isFunction } from "../../utils/isFunction";
import { iterator } from "../String/prototype/@@iterator";

var push = Array.prototype.push;

export function from(arrayLike) {
	if(arrayLike == null) {
		throw new TypeError("Array.from requires an array-like object - not null or undefined");
	}
	var ArrayLike = this;
	if(!isFunction(ArrayLike)) {
		ArrayLike = Array;
	}
	var mapFn = arguments[1];
	var thisArg;
	if(mapFn !== undefined) {
		if(!isFunction(mapFn)) {
			throw new TypeError(mapFn + " is not a function");
		}
		thisArg = arguments[2];
	}
	var arr = new ArrayLike();
	arr.length = 0;
	var entries = arrayLike[Symbol.iterator];
	if(!entries && isString(arrayLike)) {
		entries = iterator;
	}
	var i, item;
	if(entries) {
		var normalCompletion = true;
		var error, it;
		try {
			it = entries.call(arrayLike);
			i = 0;
			while(true) {
				var next = it.next();
				normalCompletion = next.done;
				if(next.done) break;
				item = next.value;
				if(mapFn) {
					item = mapFn.call(thisArg, item, i);
				}
				push.call(arr, item);
				i++;
			}
		} catch(e) {
			error = e;
		} finally {
			try {
				if(!normalCompletion) {
					var onReturn = it['return'];
					if(onReturn) {
						onReturn.call(it);
					}
				}
			} finally {
				if(error) {
					throw error;
				}
			}
		}
	} else if(arrayLike.length >= 0 && arrayLike.length <= Number.MAX_SAFE_INTEGER) {
		for(i = 0; i < arrayLike.length; i++) {
			item = arrayLike[i];
			if(mapFn) {
				item = mapFn.call(thisArg, item, i);
			}
			push.call(arr, item);
		}
	}
	return arr;
};
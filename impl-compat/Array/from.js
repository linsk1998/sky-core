import { isString } from "../../utils/isString";
import { isFunction } from "../../utils/isFunction";
import { iterator } from "../../impl/String/prototype/@@iterator";
import { createIteratorHelper } from "../../utils/createIteratorHelper";

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
		var _iterator = createIteratorHelper(arrayLike), _step;
		if(!_iterator) throw new TypeError(typeof arrayLike + " " + arrayLike + " is not iterable.");
		try {
			i = 0;
			for(_iterator.s(); !(_step = _iterator.n()).done;) {
				item = _step.value;
				if(mapFn) {
					item = mapFn.call(thisArg, item, i);
				}
				push.call(arr, item);
				i++;
			}
		} catch(err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
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
import { isString } from "../../utils/isString";

var push = Array.prototype.push;

export function from(arrayLike) {
	if(arrayLike == null) {
		throw new TypeError("Array.from requires an array-like object - not null or undefined");
	}
	var ArrayLike = this;
	if(typeof ArrayLike !== "function") {
		ArrayLike = Array;
	}
	var mapFn = arguments[1];
	var thisArg;
	if(mapFn !== undefined) {
		if(typeof mapFn !== "function") {
			throw new TypeError(mapFn + " is not a function");
		}
		thisArg = arguments[2];
	}
	var arr = new ArrayLike();
	var i, item;
	if(isString(arrayLike)) {
		let size = arrayLike.length;
		i = 0;
		for(let p = 0; p < arrayLike.length; p++) {
			item = arrayLike.charAt(p);
			let first = arrayLike.charCodeAt(p);
			if( // 检查是否开始 surrogate pair
				first >= 0xD800 && first <= 0xDBFF && // high surrogate
				size > p + 1 // 下一个编码单元
			) {
				let second = arrayLike.charCodeAt(p + 1);
				if(second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
					item = arrayLike.substr(p, 2);
					p++;
				}
			}
			if(mapFn) {
				item = mapFn.call(thisArg, item, i);
			}
			push.call(arr, item);
			i++;
		}
	} else {
		let entries = arrayLike[Symbol.iterator];
		let normalCompletion = true;
		if(entries) {
			let error, iterator;
			try {
				iterator = entries.call(arrayLike);
				i = 0;
				while(true) {
					let next = iterator.next();
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
						let onReturn = iterator['return'];
						if(onReturn) {
							onReturn.call(iterator);
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
	}
	return arr;
};
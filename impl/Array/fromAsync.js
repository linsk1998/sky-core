import { isString } from "../../utils/isString";
import { isFunction } from "../../utils/isFunction";
import iterator from "../../pure/Symbol/iterator";
import asyncIterator from "../../pure/Symbol/asyncIterator";

var push = Array.prototype.push;

// Array.fromAsync（ES2025）
// 接受 async iterable / sync iterable / array-like，返回 Promise<Array>
// 支持 mapFn（结果会被 await）、子类化
export function fromAsync(items) {
	if(items == null) {
		return Promise.reject(new TypeError("Array.fromAsync requires an array-like or iterable object - not null or undefined"));
	}
	var thisArg = arguments[1];
	var mapFn;
	var thisArg2;
	var C = isFunction(this) ? this : Array;

	// 只有一个参数时没有 mapFn
	if(arguments.length > 1) {
		if(!isFunction(thisArg)) {
			return Promise.reject(new TypeError(thisArg + " is not a function"));
		}
		mapFn = thisArg;
		thisArg2 = arguments[2];
	}

	return Promise.resolve().then(function() {
		// 优先 async iterator
		var asyncItMethod = items[asyncIterator];
		if(isFunction(asyncItMethod)) {
			var asyncIt = asyncItMethod.call(items);
			return fromAsync$iterator(C, asyncIt, true, mapFn, thisArg2);
		}

		// 再试 sync iterator，wrap 成 async
		var syncItMethod = items[iterator];
		if(!syncItMethod && isString(items)) {
			// 字符串本来就有 iterator，但为了和 from 保持一致
		}
		if(isFunction(syncItMethod)) {
			var syncIt = syncItMethod.call(items);
			return fromAsync$iterator(C, syncIt, false, mapFn, thisArg2);
		}

		// array-like
		var len = +items.length;
		if(len === len && len >= 0 && len <= Number.MAX_SAFE_INTEGER) {
			return fromAsync$arrayLike(C, items, len, mapFn, thisArg2);
		}

		throw new TypeError("Array.fromAsync requires an array-like or iterable object");
	});
}

// 统一处理 iterator（sync 或 async）
function fromAsync$iterator(C, it, isAsync, mapFn, thisArg) {
	if(it === null || (typeof it !== 'object' && typeof it !== 'function')) {
		throw new TypeError("Iterator is not an object");
	}
	// 提前取 next
	var next = it.next;

	var arr = new C();
	// 规范：构造函数不接收参数，长度是 0
	arr.length = 0;

	var i = 0;

	function step() {
		var result;
		try {
			result = next.call(it);
		} catch(e) {
			return cleanup(e);
		}

		var done, valuePromise;

		if(isAsync) {
			valuePromise = Promise.resolve(result).then(function(res) {
				if(res === null || (typeof res !== 'object' && typeof res !== 'function')) {
					throw new TypeError("AsyncIterator result is not an object");
				}
				done = res.done;
				return res.value;
			});
		} else {
			if(result === null || (typeof result !== 'object' && typeof result !== 'function')) {
				throw new TypeError("Iterator result is not an object");
			}
			done = result.done;
			valuePromise = Promise.resolve(result.value);
		}

		return valuePromise.then(function(value) {
			if(done) return arr;
			var mapped;
			if(mapFn) {
				mapped = mapFn.call(thisArg, value, i);
			} else {
				mapped = value;
			}
			return Promise.resolve(mapped).then(function(resolved) {
				push.call(arr, resolved);
				i++;
				return step();
			});
		}).catch(cleanup);
	}

	function cleanup(err) {
		// 调用 return() 关闭迭代器
		var ret;
		try {
			ret = it['return'];
		} catch(e) {
			throw err;
		}
		if(ret != null) {
			var closeResult;
			try {
				closeResult = ret.call(it);
			} catch(e) {
				throw err; // 原错误优先
			}
			if(isAsync) {
				// async iterator 的 return() 也可能返回 Promise
				return Promise.resolve(closeResult).then(function() {
					throw err;
				}, function() {
					throw err; // cleanup error 被忽略
				});
			}
			// sync iterator: return() 如果返回 Promise 也要 await
			if(closeResult && typeof closeResult.then === 'function') {
				return closeResult.then(function() {
					throw err;
				}, function() {
					throw err;
				});
			}
		}
		throw err;
	}

	try {
		return step();
	} catch(e) {
		return Promise.reject(e);
	}
}

// 处理 array-like（只有 length）
function fromAsync$arrayLike(C, items, len, mapFn, thisArg) {
	var arr = new C(len);

	function loop(i) {
		if(i >= len) return arr;
		var valuePromise;
		try {
			var raw = items[i];
			valuePromise = Promise.resolve(raw);
		} catch(e) {
			return Promise.reject(e);
		}
		return valuePromise.then(function(value) {
			var mapped;
			if(mapFn) {
				mapped = mapFn.call(thisArg, value, i);
			} else {
				mapped = value;
			}
			return Promise.resolve(mapped).then(function(resolved) {
				arr[i] = resolved;
				return loop(i + 1);
			});
		});
	}

	return loop(0);
}

import { Promise } from "../../native/Promise";
import { Array } from "../../native/Array";
import { isFunction } from "../../utils/isFunction";
import { isString } from "../../utils/isString";
import iterator from "sky-core/pure/Symbol/iterator";
import asyncIterator from "sky-core/pure/Symbol/asyncIterator";
import { iterator as stringIterator } from "../String/prototype/@@iterator";

var push = Array.prototype.push;

export function fromAsync(arrayLike) {
	if(arrayLike == null) {
		throw new TypeError("Array.fromAsync requires an array-like object - not null or undefined");
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

	var asyncIterMethod = arrayLike[asyncIterator];
	var syncIterMethod = arrayLike[iterator];
	var isString_ = !syncIterMethod && isString(arrayLike);
	var isAsyncIterable = !!asyncIterMethod;
	var isSyncIterable = !!syncIterMethod || isString_;
	var hasLength = !isAsyncIterable && !isSyncIterable && arrayLike.length >= 0 && arrayLike.length <= Number.MAX_SAFE_INTEGER;

	return new Promise(function(resolve, reject) {
		var arr;
		try {
			arr = new ArrayLike();
		} catch(e) {
			return reject(e);
		}
		arr.length = 0;

		var i = 0;

		function handleItem(value, next) {
			var mapped = value;
			if(mapFn) {
				try {
					mapped = mapFn.call(thisArg, value, i);
				} catch(e) {
					return reject(e);
				}
			}
			settleThen(mapped, function(v) {
				try {
					push.call(arr, v);
				} catch(e) {
					return reject(e);
				}
				i++;
				next();
			});
		}

		function settleThen(v, after) {
			if(v && isFunction(v.then)) {
				v.then(after, reject);
			} else {
				after(v);
			}
		}

		function done() {
			try {
				arr.length = i;
			} catch(e) {
				return reject(e);
			}
			resolve(arr);
		}

		// async iterable path
		if(isAsyncIterable) {
			var aIt;
			try {
				aIt = asyncIterMethod.call(arrayLike);
			} catch(e) {
				return reject(e);
			}
			function next() {
				var step;
				try {
					step = aIt.next();
				} catch(e) {
					return reject(e);
				}
				settleThen(step, function(s) {
					if(s.done) {
						return done();
					}
					settleThen(s.value, function(v) {
						handleItem(v, next);
					});
				});
			}
			next();
			return;
		}

		// sync iterable path
		if(isSyncIterable) {
			var iterMethod = syncIterMethod || (isString_ ? stringIterator : null);
			var sIt;
			try {
				sIt = iterMethod.call(arrayLike);
			} catch(e) {
				return reject(e);
			}
			function next() {
				var step;
				try {
					step = sIt.next();
				} catch(e) {
					return reject(e);
				}
				if(step.done) {
					return done();
				}
				settleThen(step.value, function(v) {
					handleItem(v, next);
				});
			}
			next();
			return;
		}

		// array-like path
		if(hasLength) {
			var len = arrayLike.length;
			function next() {
				if(i >= len) {
					return done();
				}
				var v;
				try {
					v = arrayLike[i];
				} catch(e) {
					return reject(e);
				}
				settleThen(v, function(resolved) {
					handleItem(resolved, next);
				});
			}
			next();
			return;
		}

		// fallback: empty
		done();
	});
}

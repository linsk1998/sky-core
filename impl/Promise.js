import "sky-core/polyfill/Array/prototype/forEach";
import { isNotNullObject } from "../utils/isNotNullObject";
import { isFunction } from "../utils/isFunction";
import { createIteratorHelper } from "../utils/createIteratorHelper";

var PENDING = 1;
var RESOLVED = 2;
var REJECTED = 3;

function Promise(executor) {
	if(!executor) {
		throw new TypeError("undefined is not a promise");
	}
	this._resolveds = [];
	this._rejecteds = [];
	this._state = PENDING;//resolved | rejected

	var me = this;
	function resolve(value) {
		if(me._state === PENDING) {
			if(value) {
				try {
					var then = value.then;
					if(isFunction(then)) {
						queueMicrotask(function() {
							try {
								value.then(resolve, reject);
							} catch(e) {
								reject(e);
							}
						});
						return;
					}
				} catch(e) {
					reject(e);
					return;
				}
			}
			me._value = value;
			me._state = RESOLVED;
			queueMicrotask(function() {
				var a = me._resolveds, len = a.length, i;
				for(i = 0; i < len; i++)
					a[i].call(me, me._value);
				me._resolveds = null;
			});
		}
	}
	function reject(reason) {
		if(me._state === PENDING) {
			me._value = reason;
			me._state = REJECTED;
			queueMicrotask(function() {
				var a = me._rejecteds, len = a.length, i;
				for(i = 0; i < len; i++)
					a[i].call(me, me._value);
				me._rejecteds = null;
			});
		}
	}
	try {
		executor(resolve, reject);
	} catch(e) {
		reject(e);
	}
}
function nextPromise(before, after, resolve, reject) {
	return function(value) {
		try {
			var x = before(value);
			if(x != null && isFunction(x.then)) {
				x.then(resolve, reject);
			} else {
				after(x);
			}
		} catch(r) {
			reject(r);
		}
	};
}
function returnArg1(arg1) {
	return arg1;
}
function throwArg1(arg1) {
	throw arg1;
}
Promise.prototype.then = function then(onResolved, onRejected) {
	// var Class = speciesConstructor(this, Promise);
	var me = this;
	onResolved = onResolved || returnArg1;
	onRejected = onRejected || throwArg1;
	return new Promise(function(resolve, reject) {
		switch(me._state) {
			case RESOLVED:
				queueMicrotask(nextPromise(onResolved, resolve, resolve, reject), me._value);
				break;
			case REJECTED:
				queueMicrotask(nextPromise(onRejected, resolve, resolve, reject), me._value);
				break;
			default:
				me._resolveds.push(nextPromise(onResolved, resolve, resolve, reject));
				me._rejecteds.push(nextPromise(onRejected, resolve, resolve, reject));
		}
	});
};
Promise.prototype.catch = function(onRejected) {
	return this.then(undefined, onRejected);
};

function ResolvePromise(value) {
	this._value = value;
	this._state = RESOLVED;
}
ResolvePromise.prototype = Promise.prototype;

function RejectPromise(value) {
	this._value = value;
	this._state = REJECTED;
}
RejectPromise.prototype = Promise.prototype;

Promise.resolve = function resolve(value) {
	if(!this) {
		throw TypeError("Promise.resolve called on non-object");
	}
	if(!isFunction(this)) {
		throw TypeError(this + " is not a constructor");
	}
	if(value != null) {
		if(value.constructor === this) {
			return value;
		}
		if(isFunction(value.then)) {
			return new this(function(resolve, reject) {
				value.then(resolve, reject);
			});
		}
	}
	if(this === Promise) {
		return new ResolvePromise(value);
	}
	return new this(function(resolve) { resolve(value); });
};
Promise.reject = function reject(value) {
	if(!this) {
		throw TypeError("Promise.resolve called on non-object");
	}
	if(!isFunction(this)) {
		throw TypeError(this + " is not a constructor");
	}
	if(this === Promise) {
		return new RejectPromise(value);
	}
	return new this(function(resolve, reject) { reject(value); });
};

Promise.all = function(promises) {
	return new Promise(function(resolve, reject) {
		var _iterator = createIteratorHelper(promises), _step;
		if(!_iterator) {
			reject(new TypeError(typeof promises + " " + promises + " is not iterable."));
			return;
		}
		var result = [];
		var pending = 0;
		var index = 0;
		var done = false;
		try {
			for(_iterator.s(); !(_step = _iterator.n()).done;) {
				var one = _step.value;
				var i = index++;
				if(isNotNullObject(one) && isFunction(one.then)) {
					pending++;
					(function(i, one) {
						one.then(function(data) {
							result[i] = data;
							if(--pending === 0 && done) resolve(result);
						}, reject);
					})(i, one);
				} else {
					result[i] = one;
				}
			}
			done = true;
			if(pending === 0) resolve(result);
		} catch(err) {
			_iterator.e(err);
			reject(err);
		} finally {
			_iterator.f();
		}
	});
};
Promise.race = function(promises) {
	return new Promise(function(resolve, reject) {
		var _iterator = createIteratorHelper(promises), _step;
		if(!_iterator) {
			reject(new TypeError(typeof promises + " " + promises + " is not iterable."));
			return;
		}
		try {
			for(_iterator.s(); !(_step = _iterator.n()).done;) {
				var one = _step.value;
				if(isNotNullObject(one) && isFunction(one.then)) {
					one.then(resolve, reject);
				} else {
					resolve(one);
				}
			}
		} catch(err) {
			_iterator.e(err);
			reject(err);
		} finally {
			_iterator.f();
		}
	});
};

export { Promise };
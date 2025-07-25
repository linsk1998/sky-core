import "sky-core/polyfill/Array/prototype/forEach";
import { isNotNullObject } from "../utils/isNotNullObject";
import { isFunction } from "../utils/isFunction";

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
Promise.prototype.then = function then(onResolved, onRejected) {
	// var Class = speciesConstructor(this, Promise);
	var me = this;
	onResolved = onResolved || returnArg1;
	onRejected = onRejected || returnArg1;
	return new Promise(function(resolve, reject) {
		switch(me._state) {
			case RESOLVED:
				queueMicrotask(nextPromise(onResolved, resolve, resolve, reject), me._value);
				break;
			case REJECTED:
				queueMicrotask(nextPromise(onRejected, reject, resolve, reject), me._value);
				break;
			default:
				me._resolveds.push(nextPromise(onResolved, resolve, resolve, reject));
				me._rejecteds.push(nextPromise(onRejected, reject, resolve, reject));
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
	if(value && typeof value === "object" && value.constructor === this) {
		return value;
	}
	if(!this) {
		throw TypeError("Promise.resolve called on non-object");
	}
	if(!isFunction(this)) {
		throw TypeError(this + " is not a constructor");
	}
	return new ResolvePromise(value);
	// var Class = this;
	// if(Class === Promise) {
	// }
	// var promiseCapability = new PromiseCapability(Class);
	// var resolve = promiseCapability.resolve;
	// resolve(value);
	// return promiseCapability.promise;
};
Promise.reject = function reject(value) {
	if(value && typeof value === "object" && value.constructor === this) {
		return value;
	}
	if(!this) {
		throw TypeError("Promise.resolve called on non-object");
	}
	if(!isFunction(this)) {
		throw TypeError(this + " is not a constructor");
	}
	return new RejectPromise(value);
};

Promise.all = function(promises) {
	if(!Array.isArray(promises)) {
		throw new TypeError('You must pass an array to all.');
	}
	if(promises.length == 0) return Promise.resolve();
	return new Promise(function(resolve, reject) {
		var result = new Array(promises.length);
		var c = 0;
		promises.forEach(function(one, index) {
			if(isNotNullObject(one) && isFunction(one.then)) {
				one.then(function(data) {
					c++;
					result[index] = data;
					if(c >= promises.length) {
						resolve(result);
					}
				}, reject);
			} else {
				c++;
				result[index] = one;
				if(c >= promises.length) {
					resolve(result);
				}
			}
		});
	});
};
Promise.race = function(promises) {
	if(!Array.isArray(promises)) {
		throw new TypeError('You must pass an array to all.');
	}
	return new Promise(function(resolve, reject) {
		var i = promises.length;
		while(i--) {
			promises[i].then(resolve, reject);
		}
	});
};

export { Promise };
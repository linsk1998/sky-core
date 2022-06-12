
import forEach from "sky-core/pure/Array/prototype/forEach";
import { noop } from "../utils/noop";
import { aFunction } from "../utils/aFunction";
import { isFunction } from "../utils/isFunction";
import { speciesConstructor } from "../impl/Symbol/species";

var PENDING = Symbol("pending");
var RESOLVED = Symbol("resolved");
var REJECTED = Symbol("rejected");

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
				forEach.call(me._resolveds, callAll, me);
				me._resolveds = null;
			});
		}
	}
	function reject(reason) {
		if(me._state === PENDING) {
			me._value = reason;
			me._state = REJECTED;
			queueMicrotask(function() {
				forEach.call(me._rejecteds, callAll, me);
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
function callAll(fn) {
	fn.call(this, this._value);
}
function nextPromise(before, after, resolve, reject) {
	return function(value) {
		try {
			var x = before(value);
			if(x && (typeof x.then === "function")) {
				x.then(resolve, reject);
			} else {
				after(x);
			}
		} catch(r) {
			reject(r);
		}
	};
}
Promise.prototype.then = function then(onResolved, onRejected) {
	// var Class = speciesConstructor(this, Promise);
	var me = this;
	onResolved = onResolved || noop;
	onRejected = onRejected || noop;
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
	if(value.constructor === this) {
		return value;
	}
	if(!this) {
		throw TypeError("Promise.resolve called on non-object");
	}
	if(typeof this !== "function") {
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
	if(value.constructor === this) {
		return value;
	}
	if(!this) {
		throw TypeError("Promise.resolve called on non-object");
	}
	if(typeof this !== "function") {
		throw TypeError(this + " is not a constructor");
	}
	return new RejectPromise(value);
};

Promise.all = function all(promises) {
	if(!this) {
		throw TypeError("Promise.all called on non-object");
	}
	if(typeof this !== "function") {
		throw TypeError(this + " is not a constructor");
	}
	// var Promise = this;
	if(promises) {
		var entries = promises[Symbol.iterator];
		if(entries) {
			var it = entries.call(promises);
			promises = [];
			while(true) {
				var next = it.next();
				if(next.done) break;
				var value = next.value;
				try {
					promises.push(Promise.resolve(value));
				} catch(e) {
					if(it.return) {
						try {
							it.return();
						} catch(e) { }
					}
					throw e;
				}
			}
			return new Promise(function(resolve, reject) {
				var c = 0;
				var result = new Array(promises.length);
				forEach.call(promises, function(p, index) {
					p.then(function(data) {
						c++;
						result[index] = data;
						if(c >= promises.length) {
							resolve(result);
						}
					}, function(error) {
						reject(error);
					});
					c++;
					if(c >= promises.length) {
						resolve();
					}
				});
			});
		}
	}
	throw new TypeError(promises + 'is not iterable');
};
Promise.race = function race(promises) {
	if(!this) {
		throw TypeError("Promise.all called on non-object");
	}
	if(typeof this !== "function") {
		throw TypeError(this + " is not a constructor");
	}
	// var Promise = this;
	if(promises) {
		var entries = promises[Symbol.iterator];
		if(entries) {
			var it = entries.call(promises);
			promises = [];
			while(true) {
				var next = it.next();
				if(next.done) break;
				var value = next.value;
				try {
					promises.push(Promise.resolve(value));
				} catch(e) {
					if(it.return) {
						try {
							it.return();
						} catch(e) { }
					}
					throw e;
				}
			}
			return new Promise(function(resolve, reject) {
				forEach.call(promises, function(one) {
					one.then(function() {
						resolve();
					}, function() {
						reject();
					});
				});
			});
		}
	}
	throw new TypeError(promises + 'is not iterable');
};


function PromiseCapability(Promise) {
	var resolve, reject;
	this.promise = new Promise(function($$resolve, $$reject) {
		if(resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
		resolve = $$resolve;
		reject = $$reject;
	});
	this.resolve = aFunction(resolve);
	this.reject = aFunction(reject);
};
export { Promise };
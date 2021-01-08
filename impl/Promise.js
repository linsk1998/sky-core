
import "sky-core/polyfill/Array/prototype/forEach";
import { noop } from "../utils/noop";

var PENDING = Symbol("pending");
var RESOLVED = Symbol("resolved");
var REJECTED = Symbol("rejected");

function Promise(executor) {
	this._resolveds = [];
	this._rejecteds = [];
	this._state = PENDING;//resolved | rejected

	var me = this;
	function resolve(value) {
		queueMicrotask(function() {
			if(me._state === PENDING) {
				me._value = value;
				me._state = RESOLVED;
				me._resolveds.forEach(callAll, me);
				me._resolveds = null;
			}
		});
	}
	function reject(reason) {
		queueMicrotask(function() {
			if(me._state === PENDING) {
				me._value = reason;
				me._state = REJECTED;
				me._rejecteds.forEach(callAll, me);
				me._rejecteds = null;
			}
		});
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
Promise.prototype.then = function(onResolved, onRejected) {
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
Promise.prototype['catch'] = function(onRejected) {
	return this.then(undefined, onRejected);
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
			if(typeof one.then === "function") {
				one.then(function(data) {
					c++;
					result[index] = data;
					if(c >= promises.length) {
						resolve(result);
					}
				}, function(error) {
					reject(error);
				});
			} else {
				c++;
				if(c >= promises.length) {
					resolve();
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
		promises.forEach(function(one) {
			one.then(function() {
				resolve();
			}, function() {
				reject();
			});
		});
	});
};
function ResolvePromise(value) {
	this._value = value;
	this._state = RESOLVED;
}
ResolvePromise.prototype = Promise.prototype;
Promise.resolve = function(arg) {
	return new ResolvePromise(arg);
};
function RejectPromise(value) {
	this._value = value;
	this._state = REJECTED;
}
RejectPromise.prototype = Promise.prototype;
Promise.reject = function(arg) {
	return new RejectPromise(arg);
};
export { Promise };
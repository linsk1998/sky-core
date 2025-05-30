import { Set as GSet } from "../native/Set";
import { toES6Iterator } from "../utils-modern/toES6Iterator";
import { createIteratorHelper } from "../utils/createIteratorHelper";
import { Symbol } from "../native/Symbol";

// 只有原生支持Symbol.iterator的情况下才会调用这个函数
var setConstructorIteratorReturn = false;
export function checkSetSupportConstructorIteratorReturn() {
	try {
		var called = 0;
		var iteratorWithReturn = {
			next: function() {
				return { done: !!called++ };
			},
			return: function() {
				setConstructorIteratorReturn = true;
			}
		};
		iteratorWithReturn[Symbol.iterator] = function() {
			return this;
		};
		new GSet(iteratorWithReturn);
	} catch(error) { /* empty */ }
	checkSetSupportConstructorIteratorReturn = function() {
		return setConstructorIteratorReturn;
	};
	return setConstructorIteratorReturn;
}
export function createAndFixSubSet() {
	var Set = createSubSet();
	var set = new Set();
	// V8 ~ Chromium 42- fails only with 5+ elements
	var i = 5;
	while(i--) set.add(i);
	if(!set.has(-0)) {
		fixN0(Set);
	}
	return Set;
}
export function createSubSet() {
	function Set() {
		var arr = arguments[0];
		var set = new GSet();
		Object.setPrototypeOf(set, Object.getPrototypeOf(this));
		if(arr) {
			var _iterator = createIteratorHelper(arr), _step, item;
			if(!_iterator) throw new TypeError(typeof arr + " " + arr + " is not iterable.");
			try {
				for(_iterator.s(); !(_step = _iterator.n()).done;) {
					item = _step.value;
					set.add(item);
				}
			} catch(err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
		}
		return set;
	}
	Object.setPrototypeOf(Set, GSet);
	Set.prototype = Object.create(GSet.prototype);
	return Set;

}
export function fixSet() {
	var Set = createSubSet();
	var s = new GSet();
	if(s.size !== 0) {
		// firefox 18-
		Object.defineProperty(Set.prototype, 'size', {
			get: function() {
				return GSet.prototype.size.call(this);
			},
			enumerable: true
		});
	}
	// ie11 not support iterator
	if(Set.prototype.iterator) {
		// firefox 17~26 iterator return firefox iterator
		// firefox 17~23
		Set.prototype.values = Set.prototype.keys = function values() {
			return toES6Iterator(this.iterator());
		};
		// firefox 17~23
		Set.prototype.entries = function entries() {
			return toES6Iterator(this.iterator(), getValueX2);
		};
		if(!Set.prototype.forEach) {
			// firefox 17~24
			Set.prototype.forEach = function forEach(callbackfn) {
				var it = this.iterator();
				while(true) {
					try {
						var next = it.next();
					} catch(e) {
						break;
					}
					callbackfn.call(arguments[1], next, next, this);
				}
			};
		}
	}
	if(s.add(-0) !== s) {
		if(s.has(0)) {
			fixChain(Set);
		} else {
			fixN0(Set);
		}
	}
	if(!Set.prototype['@@iterator']) {
		Set.prototype['@@iterator'] = Set.prototype.values;
	}
	return Set;
};

function fixChain(Set) {
	var prototype = Set.prototype;
	var a = prototype.add;
	var d = prototype.delete;
	prototype.add = function add(v) {
		a.apply(this, arguments);
		return this;
	};
}
function fixN0(Set) {
	var prototype = Set.prototype;
	var a = prototype.add;
	var d = prototype.delete;
	var h = prototype.has;
	prototype.add = function add(v) {
		if(v === 0) {
			a.call(this, 0);
		} else {
			a.apply(this, arguments);
		}
		return this;
	};
	prototype.delete = function(v) {
		if(v === 0) {
			return d.call(this, 0, v);
		} else {
			return d.apply(this, arguments);
		}
	};
	prototype.has = function has(v) {
		if(v === 0) {
			return h.call(this, 0);
		} else {
			return h.apply(this, arguments);
		}
	};
}

function getValueX2(item) {
	return [item, item];
}
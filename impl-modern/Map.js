import { Map as GMap } from "../native/Map";
import { toES6Iterator } from "../utils-modern/toES6Iterator";
import { createIteratorHelper } from "../utils/createIteratorHelper";
import { Symbol } from "../native/Symbol";

// 只有原生支持Symbol.iterator的情况下才会调用这个函数
var mapConstructorIteratorReturn = false;
export function checkMapSupportConstructorIteratorReturn() {
	try {
		var called = 0;
		var iteratorWithReturn = {
			next: function() {
				return { done: !!called++ };
			},
			return: function() {
				mapConstructorIteratorReturn = true;
			}
		};
		iteratorWithReturn[Symbol.iterator] = function() {
			return this;
		};
		new GMap(iteratorWithReturn);
	} catch(error) { /* empty */ }
	checkMapSupportConstructorIteratorReturn = function() {
		return mapConstructorIteratorReturn;
	};
	return mapConstructorIteratorReturn;
}
export function createAndFixSubMap() {
	var Map = createSubMap();
	var map = new Map();
	// V8 ~ Chromium 42- fails only with 5+ elements
	var i = 5;
	while(i--) map.set(i, 0);
	if(!map.has(-0)) {
		fixN0(Map);
	}
	return Map;
}

export function createSubMap() {
	function Map() {
		var arr = arguments[0];
		var map = new GMap();
		Object.setPrototypeOf(map, Object.getPrototypeOf(this));
		if(arr) {
			var _iterator = createIteratorHelper(arr), _step, item;
			if(!_iterator) throw new TypeError(typeof arr + " " + arr + " is not iterable.");
			try {
				for(_iterator.s(); !(_step = _iterator.n()).done;) {
					item = _step.value;
					map.set(item[0], item[1]);
				}
			} catch(err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
		}
		return map;
	}
	Object.setPrototypeOf(Map, GMap);
	Map.prototype = Object.create(GMap.prototype);
	return Map;
}
export function fixMap() {
	var Map = createSubMap();
	var prototype = Map.prototype;
	var m = new GMap();
	if(m.size !== 0) {
		// firefox 18-
		var size = m.size;
		Object.defineProperty(prototype, 'size', {
			get: function() {
				return size.call(this);
			},
			enumerable: true
		});
	}
	// ie11 not support iterator
	if(prototype.iterator) {
		// firefox 17~26 iterator return firefox iterator
		// firefox 17~19
		Map.prototype.entries = function entries() {
			return toES6Iterator(this.iterator());
		};
		Map.prototype.keys = function keys() {
			return toES6Iterator(this.iterator(), getKey);
		};
		Map.prototype.values = function values() {
			return toES6Iterator(this.iterator(), getValue);
		};
		if(!Map.prototype.forEach) {
			// firefox 17~24
			// myMap.forEach(callback([value][, key][, map])[, thisArg])
			Map.prototype.forEach = function forEach(callbackfn) {
				var it = this.iterator();
				while(true) {
					try {
						var next = it.next();
					} catch(e) {
						break;
					}
					callbackfn.call(arguments[1], next[1], next[0], this);
				}
			};
		}
	}
	if(m.set(-0, 0) !== m) {
		if(m.has(0)) {
			fixChain(Map);
		} else {
			fixN0(Map);
		}
	}
	if(!Map.prototype['@@iterator']) {
		Map.prototype['@@iterator'] = Map.prototype.entries;
	}
	return Map;
}

function fixChain(Map) {
	var prototype = Map.prototype;
	var s = prototype.set;
	var d = prototype.delete;
	prototype.set = function set(k, v) {
		s.apply(this, arguments);
		return this;
	};
}
function fixN0(Map) {
	var prototype = Map.prototype;
	var s = prototype.set;
	var d = prototype.delete;
	var g = prototype.get;
	var h = prototype.has;
	prototype.set = function set(k, v) {
		if(k === 0) {
			s.call(this, 0, v);
		} else {
			s.apply(this, arguments);
		}
		return this;
	};
	prototype.delete = function(k, v) {
		if(k === 0) {
			return d.call(this, 0, v);
		} else {
			return d.apply(this, arguments);
		}
	};
	prototype.get = function get(k) {
		if(k === 0) {
			return g.call(this, 0);
		} else {
			return g.apply(this, arguments);
		}
	};
	prototype.has = function has(k) {
		if(k === 0) {
			return h.call(this, 0);
		} else {
			return h.apply(this, arguments);
		}
	};
}

function getKey(item) {
	return item[0];
}
function getValue(item) {
	return item[1];
}
import { inherits } from "sky-core/utils/inherits";

export function fixSymbol(BugWeakMap) {
	function WeakMap() {
		var m = new BugWeakMap(arguments[0]);
		Object.setPrototypeOf(m, Object.getPrototypeOf(this));
		return m;
	}
	inherits(WeakMap, BugWeakMap);
	var s = BugWeakMap.prototype.set;
	WeakMap.prototype.set = function set(k, v) {
		if(typeof k === "symbol") {
			this[k] = v;
			return this;
		} else {
			return s.apply(this, arguments);
		}
	};
	var g = BugWeakMap.prototype.get;
	WeakMap.prototype.get = function get(k) {
		if(typeof k === "symbol") {
			return this[k];
		} else {
			return g.apply(this, arguments);
		}
	};
	var h = BugWeakMap.prototype.has;
	WeakMap.prototype.has = function has(k) {
		if(typeof k === "symbol") {
			return k in this;
		} else {
			return h.apply(this, arguments);
		}
	};
	var d = BugWeakMap.prototype.delete;
	WeakMap.prototype.delete = function(k, v) {
		if(typeof k === "symbol") {
			if(k in this) {
				delete this[k];
				return true;
			}
			return false;
		} else {
			return d.apply(this, arguments);
		}
	};
	return WeakMap;
}
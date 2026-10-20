import { inherits } from "sky-core/utils/inherits";

export function fix_WeakMap$symbol(GWeakMap) {
	function WeakMap() {
		var m = new GWeakMap(arguments[0]);
		Object.setPrototypeOf(m, Object.getPrototypeOf(this));
		return m;
	}
	inherits(WeakMap, GWeakMap);
	var s = GWeakMap.prototype.set;
	WeakMap.prototype.set = function set(k, v) {
		if(typeof k === "symbol") {
			this[k] = v;
			return this;
		} else {
			return s.apply(this, arguments);
		}
	};
	var g = GWeakMap.prototype.get;
	WeakMap.prototype.get = function get(k) {
		if(typeof k === "symbol") {
			return this[k];
		} else {
			return g.apply(this, arguments);
		}
	};
	var h = GWeakMap.prototype.has;
	WeakMap.prototype.has = function has(k) {
		if(typeof k === "symbol") {
			return k in this;
		} else {
			return h.apply(this, arguments);
		}
	};
	var d = GWeakMap.prototype.delete;
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
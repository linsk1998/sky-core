import { inherits } from "sky-core/utils/inherits";

export function fix_WeakSet$symbol(GWeakSet) {
	function WeakSet() {
		var m = new GWeakSet(arguments[0]);
		Object.setPrototypeOf(m, Object.getPrototypeOf(this));
		return m;
	}
	inherits(WeakSet, GWeakSet);
	var a = GWeakSet.prototype.add;
	WeakSet.prototype.add = function add(v) {
		if(typeof v === "symbol") {
			this[v] = v;
			return this;
		} else {
			return a.apply(this, arguments);
		}
	};
	var h = GWeakSet.prototype.has;
	WeakSet.prototype.has = function has(v) {
		if(typeof v === "symbol") {
			return v in this;
		} else {
			return h.apply(this, arguments);
		}
	};
	var d = GWeakSet.prototype.delete;
	WeakSet.prototype.delete = function(v) {
		if(typeof v === "symbol") {
			if(v in this) {
				delete this[v];
				return true;
			}
			return false;
		} else {
			return d.apply(this, arguments);
		}
	};
	return WeakSet;
}
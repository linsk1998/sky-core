export function fixN0(Map) {
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

export function fixN0(Set) {
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

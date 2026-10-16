export function fixChain(Map) {
	var prototype = Map.prototype;
	var s = prototype.set;
	var d = prototype.delete;
	prototype.set = function set(k, v) {
		s.apply(this, arguments);
		return this;
	};
}

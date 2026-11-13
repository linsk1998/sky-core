export function fixChain(Map) {
	var prototype = Map.prototype;
	var s = prototype.set;
	prototype.set = function set(k, v) {
		s.apply(this, arguments);
		return this;
	};
}

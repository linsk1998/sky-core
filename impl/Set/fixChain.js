export function fixChain(Set) {
	var prototype = Set.prototype;
	var a = prototype.add;
	var d = prototype.delete;
	prototype.add = function add(v) {
		a.apply(this, arguments);
		return this;
	};
}

export function fixChain(WeakMap) {
	var setMethod = WeakMap.prototype.set;
	WeakMap.prototype.set = function set() {
		setMethod.apply(this, arguments);
		return this;
	};
}
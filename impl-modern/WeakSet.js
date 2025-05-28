export function fixChain(WeakSet) {
	var addMethod = WeakSet.prototype.add;
	WeakSet.prototype.add = function add() {
		addMethod.apply(this, arguments);
		return this;
	};
}
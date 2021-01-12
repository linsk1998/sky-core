
function WeakSet(iterable) {
	this.map = new WeakMap();
	if(iterable) {
		var entries = iterable[Symbol.iterator];
		if(entries) {
			var it = entries.call(iterable);
			while(true) {
				var next = it.next();
				if(next.done) break;
				this.add(next.value);
			}
		}
	}
}
WeakSet.prototype.add = function(key) {
	this.map.set(key, true);
	return this;
};
WeakSet.prototype.has = function(key) {
	return this.map.has(key);
};
WeakSet.prototype.delete = function(key) {
	this.map.delete(key);
	return this;
};


export { WeakSet };
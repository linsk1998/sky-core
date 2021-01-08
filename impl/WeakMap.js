
function WeakMap(iterable) {
	this.symbol = Symbol("WeakMap");
	if(iterable) {
		var entries = iterable[Symbol.iterator];
		if(entries) {
			var it = entries.call(iterable);
			while(true) {
				var next = it.next();
				if(next.done) break;
				this.set(next.value[0], next.value[1]);
			}
		}
	}
}
WeakMap.prototype.set = function(key, value) {
	key[this.symbol] = value;
	return this;
};
WeakMap.prototype.get = function(key) {
	return key[this.symbol];
};
WeakMap.prototype.has = function(key) {
	return this.symbol in key;
};
WeakMap.prototype['delete'] = function(key) {
	delete key[this.symbol];
	return this;
};


export { WeakMap };
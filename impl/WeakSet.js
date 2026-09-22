
function WeakSet() {
	this.map = new WeakMap();
	if(arguments.length) {
		var iterable = arguments[0];
		var entries = iterable[Symbol.iterator];
		if(entries) {
			var it = entries.call(iterable);
			while(true) {
				var next = it.next();
				if(next.done) break;
				try {
					this.add(next.value);
				} catch(e) {
					if(it.return) {
						try {
							it.return();
						} catch(e) { }
					}
					throw e;
				}
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
	return this.map.delete(key);
};


export { WeakSet };
var KEY_WM = "@@WeakMap";
var weakSeq = 0;
function WeakMap(iterable) {
	this.symbol = weakSeq++;
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
	var map = key[KEY_WM];
	if(!map) {
		map = key[KEY_WM] = {};
	}
	map[this.symbol] = value;
	return this;
};
WeakMap.prototype.get = function(key) {
	var map = key[KEY_WM];
	if(map) {
		return map[this.symbol];
	}
};
WeakMap.prototype.has = function(key) {
	var map = key[KEY_WM];
	if(map) {
		return this.symbol in map;
	}
	return false;
};
WeakMap.prototype.delete = function(key) {
	var map = key[KEY_WM];
	if(map) {
		if(this.symbol in map) {
			delete map[this.symbol];
			return false;
		}
	}
	return false;
};


export { WeakMap };
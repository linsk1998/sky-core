import isNaN from "sky-core/pure/Number/isNaN";
export function createMap() {
	function Map() {
		var arr = arguments[0];
		this.size = 0;
		this.head = null;
		this.tail = null;
		if(arr) {
			var entries = arr['@@iterator'];
			if(entries) {
				var it = entries.call(arr);
				while(true) {
					var next = it.next();
					if(next.done) break;
					try {
						this.set(next.value[0], next.value[1]);
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
	Map.prototype.has = has;
	Map.prototype.get = get;
	Map.prototype.set = set;
	Map.prototype.delete = remove;
	Map.prototype.clear = clear;
	Map.prototype.forEach = forEach;
	Map.prototype.entries = entries;
	Map.prototype.keys = keys;
	Map.prototype.values = values;
	Map.prototype['@@iterator'] = entries;
	return Map;
};
export function has(key) {
	if(this.size === 0) {
		return false;
	}
	var item = this.head;
	while(item) {
		if(item.key === key || isNaN(key) && isNaN(item.key)) {
			return true;
		}
		item = item.next;
	}
	return false;
};
export function get(key) {
	if(this.size === 0) {
		return undefined;
	}
	var item = this.head;
	while(item) {
		if(item.key === key || isNaN(key) && isNaN(item.key)) {
			return item.value;
		}
		item = item.next;
	}
	return undefined;
};
export function set(key, value) {
	if(key === 0) {
		//-0 -> 0
		key = 0;
	}
	if(this.size === 0) {
		this.head = this.tail = {
			key: key,
			value: value,
			prev: null,
			next: null,
			exist: true
		};
		this.size = 1;
		return this;
	}
	var item = this.head;
	while(item) {
		if(item.key === key || isNaN(key) && isNaN(item.key)) {
			item.value = value;
			return this;
		}
		item = item.next;
	}
	var tail = this.tail;
	var newTail = {
		key: key,
		value: value,
		prev: tail,
		next: null,
		exist: true
	};
	tail.next = newTail;
	this.tail = newTail;
	this.size++;
	return this;
};
export function remove(key) {
	if(this.size === 0) {
		return false;
	}
	var item = this.head;
	while(item) {
		if(item.key === key || isNaN(key) && isNaN(item.key)) {
			var prev = item.prev;
			var next = item.next;
			if(prev) {
				prev.next = next;
			} else {
				this.head = next;
			}
			if(next) {
				next.prev = prev;
			} else {
				this.tail = prev;
			}
			item.exist = false;
			this.size--;
			return true;
		}
		item = item.next;
	}
	return false;
};
export function clear() {
	this.size = 0;
	this.head = null;
	this.tail = null;
};
export function forEach(callbackfn) {
	var thisArg = arguments[1];
	var item = this.head;
	while(item) {
		callbackfn.call(thisArg, item.value, item.key, this);
		var next = item.next;
		if(item.exist || next && next.exist) {
			item = next;
		} else {
			while(true) {
				item = item.prev;
				if(item) {
					if(item.exist) {
						item = item.next;
						break;
					}
				} else {
					item = this.head;
					break;
				}
			}
		}
	}
};

function createIterable(that, getValue) {
	var done = false;
	var current;
	var it = {
		next: function() {
			var value;
			if(done) {
				return { done: done, value: value };
			}
			if(!current) {
				current = that.head;
			} else {
				var next = current.next;
				if(current.exist || next && next.exist) {
					current = next;
				} else {
					while(true) {
						current = current.prev;
						if(current) {
							if(current.exist) {
								current = current.next;
								break;
							}
						} else {
							current = that.head;
							break;
						}
					}
				}
			}
			if(current) {
				done = false;
				value = getValue(current);
			} else {
				done = true;
			}
			return { done: done, value: value };
		}
	};
	it['@@iterator'] = function() {
		return createIterable(that, getValue);
	};
	return it;
}
function getKeyValue(item) {
	return [item.key, item.value];
}
export function entries() {
	return createIterable(this, getKeyValue);
};
function getKey(item) {
	return item.key;
}
export function keys() {
	return createIterable(this, getKey);
};
function getValue(item) {
	return item.value;
}
export function values() {
	return createIterable(this, getValue);
};

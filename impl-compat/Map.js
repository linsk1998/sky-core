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
	do {
		var value = item.value;
		if(item.key === key || isNaN(key) && isNaN(item.key)) {
			return true;
		}
		item = item.next;
	} while(item);
	return false;
};
export function get(key) {
	if(this.size === 0) {
		return undefined;
	}
	var item = this.head;
	do {
		if(item.key === key || isNaN(key) && isNaN(item.key)) {
			return item.value;
		}
		item = item.next;
	} while(item);
	return undefined;
};
export function set(key, value) {
	if(this.size === 0) {
		this.head = this.tail = {
			key: key,
			value: value,
			prev: null,
			next: null
		};
		this.size = 1;
		return false;
	}
	var item = this.head;
	do {
		if(item.key === key || isNaN(key) && isNaN(item.key)) {
			item.value = value;
			return this;
		}
		item = item.next;
	} while(item);
	var tail = this.tail;
	var newTail = {
		key: key,
		value: value,
		prev: item,
		next: null
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
	do {
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
			this.size--;
			return true;
		}
		item = item.next;
	} while(item);
	return false;
};
export function clear() {
	this.size = 0;
	this.head = null;
	this.tail = null;
};
export function forEach(callbackfn, thisArg) {
	var item = this.head;
	do {
		callbackfn.call(thisArg, item.value, item.key, this);
		item = item.next;
	} while(item);
};
export function entries() {
	var current = this.head;
	return {
		next: function() {
			var done, value;
			var cur = current;
			if(cur) {
				done = false;
				value = [cur.key, cur.value];
				current = cur.next;
			} else {
				done = true;
			}
			return { done: done, value: value };
		}
	};
};
export function keys() {
	var current = this.head;
	return {
		next: function() {
			var done, value;
			var cur = current;
			if(cur) {
				done = false;
				value = cur.key;
				current = cur.next;
			} else {
				done = true;
			}
			return { done: done, value: value };
		}
	};
};
export function values() {
	var current = this.head;
	return {
		next: function() {
			var done, value;
			var cur = current;
			if(cur) {
				done = false;
				value = cur.value;
				current = cur.next;
			} else {
				done = true;
			}
			return { done: done, value: value };
		}
	};
};

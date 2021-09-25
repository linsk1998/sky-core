import { set, has, remove, clear, forEach, entries, values } from "./Map";
export { has, remove, clear, forEach, entries, values } from "./Map";

export function createSet() {
	function Set() {
		var arr = arguments[0];
		this.size = 0;
		this.head = null;
		this.tail = null;
		this.items = new Array();
		if(arr) {
			var entries = arr['@@iterator'];
			if(entries) {
				var it = entries.call(arr);
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
	Set.prototype.has = has;
	Set.prototype.add = add;
	Set.prototype.delete = remove;
	Set.prototype.clear = clear;
	Set.prototype.forEach = forEach;
	Set.prototype.entries = entries;
	Set.prototype.values = values;
	Set.prototype['@@iterator'] = values;
	return Set;
};
export function add(value) {
	set.call(this, value, value);
	return this;
};
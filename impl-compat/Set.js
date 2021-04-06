import { set } from "./Map";

export function createSet() {
	function Set(arr) {
		this.items = new Array();
		if(arr) {
			var entries = arr['@@iterator'];
			if(entries) {
				var it = entries.call(arr);
				while(true) {
					var next = it.next();
					if(next.done) break;
					this.add(next.value);
				}
			}
		}
		this.size = this.items.length;
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
};
export { has, remove, clear, forEach, entries, values } from "./Map";
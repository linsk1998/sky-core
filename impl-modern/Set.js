import "sky-core/polyfill/Array/prototype/entries";
import { Set as GSet } from "../native/Set";
import { toES6Iterator } from "../utils-modern/toES6Iterator";

export function fixSet(){
	function Set(args) {
		var set = new GSet(args);
		Object.setPrototypeOf(set, Object.getPrototypeOf(this));
		if(args && set.size === 0) {
			args = Array.from(args);
			args.forEach(GSet.prototype.add, set);
		}
		return set;
	}
	Object.setPrototypeOf(Set, GSet);
	Set.prototype = Object.create(GSet.prototype);
	var s = new GSet();
	if(s !== s.add(1)) {
		Set.prototype.add = function(value) {
			GSet.prototype.add.call(this, value);
			return this;
		};
	}
	if(typeof s.size === "function") {
		Object.defineProperty(Set.prototype, 'size', {
			get: function() {
				return GSet.prototype.size.call(this);
			},
			enumerable: true
		});
	}
	if(Set.prototype.iterator) {
		if(!Set.prototype[Symbol.iterator]) {
			Set.prototype[Symbol.iterator] = function() {
				return toES6Iterator(this.iterator());
			};
		}
		if(!Set.prototype.forEach) {
			Set.prototype.forEach = function(callbackfn, thisArg) {
				var it = this.iterator();
				while(true) {
					try {
						var next = it.next();
					} catch(e) {
						break;
					}
					callbackfn.call(thisArg, next, next, this);
				}
			};
		}
	}
	if(!Set.prototype[Symbol.iterator]) {
		if(Set.prototype.forEach) {
			Set.prototype[Symbol.iterator] = function() {
				var arr = [];
				this.forEach(pushEach, arr);
				return arr[Symbol.iterator]();
			};
		}
	}
	if(!Set.prototype.values){
		Set.prototype.values=Set.prototype[Symbol.iterator];
	}
	return Set;
};
function pushEach(value) {
	this.push(value);
}
import { arrayToIterator } from "sky-core";
import { Set as GSet } from "../native/Set";
import { toES6Iterator } from "../utils-modern/toES6Iterator";

export function fixSet() {
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
		// ie11
		Set.prototype.add = function(value) {
			GSet.prototype.add.call(this, value);
			return this;
		};
	}
	if(typeof s.size === "function") {
		// firefox 18-
		Object.defineProperty(Set.prototype, 'size', {
			get: function() {
				return GSet.prototype.size.call(this);
			},
			enumerable: true
		});
	}
	if(Set.prototype.iterator) {
		// firefox 17~26 iterator return firefox iterator
		if(!Set.prototype.values) {
			// firefox 17~23
			Set.prototype.values = function() {
				return toES6Iterator(this.iterator());
			};
		}
		if(!Set.prototype.entries) {
			// firefox 17~23
			Set.prototype.entries = function() {
				return toES6Iterator(this.iterator(), getValueX2);
			};
		}
		if(!Set.prototype.forEach) {
			// firefox 17~24
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
	if(Set.prototype.forEach) {
		// ie11
		if(!Set.prototype.values) {
			Set.prototype.values = function() {
				var arr = [];
				this.forEach(pushEach, arr);
				return arrayToIterator(arr);
			};
		}
		if(!Set.prototype.entries) {
			Set.prototype.entries = function() {
				var arr = [];
				this.forEach(pushEach, arr);
				return arrayToIterator(arr, getValueX2);
			};
		}
	}
	return Set;
};

function pushEach(item) {
	this.push(item);
}
function getValueX2(item) {
	return [item, item];
}
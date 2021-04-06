
import { Set as GSet } from "../native/Set";
import { toES6Iterator } from "../utils-modern/toES6Iterator";
export function createSubSet() {
	function Set(args) {
		var set = new GSet(args);
		Object.setPrototypeOf(set, Object.getPrototypeOf(this));
		return set;
	}
	Object.setPrototypeOf(Set, GSet);
	Set.prototype = Object.create(GSet.prototype);
	return Set;

}
export function fixSet() {
	var Set = createSubMap();
	var s = new GSet();
	if(typeof s.size === "function") {
		// firefox 18-
		Object.defineProperty(Set.prototype, 'size', {
			get: function() {
				return GSet.prototype.size.call(this);
			},
			enumerable: true
		});
	}
	// ie11 not support iterator
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
	if(!Set.prototype['@@iterator']) {
		Set.prototype['@@iterator'] = Set.prototype.values;
	}
	return Set;
};

function getValueX2(item) {
	return [item, item];
}
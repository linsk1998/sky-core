import { Set as GSet } from "../../native/Set";
import { toES6Iterator } from "../../utils-modern/toES6Iterator";
import { fix_Set$arg } from "./fix_Set$arg";
import { fixChain } from "./fixChain";
import { fixN0 } from "./fixN0";

export function fix_Set() {
	var Set = fix_Set$arg(GSet);
	var s = new GSet();
	if(s.size !== 0) {
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
		// firefox 17~23
		Set.prototype.values = Set.prototype.keys = function values() {
			return toES6Iterator(this.iterator());
		};
		// firefox 17~23
		Set.prototype.entries = function entries() {
			return toES6Iterator(this.iterator(), getValueX2);
		};
		if(!Set.prototype.forEach) {
			// firefox 17~24
			Set.prototype.forEach = function forEach(callbackfn) {
				var it = this.iterator();
				while(true) {
					try {
						var next = it.next();
					} catch(e) {
						break;
					}
					callbackfn.call(arguments[1], next, next, this);
				}
			};
		}
		if(!Set.prototype.clear) {
			// firefox 13~18
			Set.prototype.clear = function clear() {
				var it = this.iterator();
				while(true) {
					try {
						this.delete(it.next());
					} catch(e) {
						break;
					}
				}
			};
		}
	}
	if(s.add(-0) !== s) {
		if(s.has(0)) {
			fixChain(Set);
		} else {
			fixN0(Set);
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

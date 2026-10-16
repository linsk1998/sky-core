import { Map as GMap } from "../../native/Map";
import { toES6Iterator } from "../../utils-modern/toES6Iterator";
import { fix_Map$arg } from "./fix_Map$arg";
import { fixChain } from "./fixChain";
import { fixN0 } from "./fixN0";

export function fix_Map() {
	var Map = fix_Map$arg(GMap);
	var prototype = Map.prototype;
	var m = new GMap();
	if(m.size !== 0) {
		// firefox 18-
		var size = m.size;
		Object.defineProperty(prototype, 'size', {
			get: function() {
				return size.call(this);
			},
			enumerable: true
		});
	}
	// ie11 not support iterator
	if(prototype.iterator) {
		// firefox 17~26 iterator return firefox iterator
		// firefox 17~19
		Map.prototype.entries = function entries() {
			return toES6Iterator(this.iterator());
		};
		Map.prototype.keys = function keys() {
			return toES6Iterator(this.iterator(), getKey);
		};
		Map.prototype.values = function values() {
			return toES6Iterator(this.iterator(), getValue);
		};
		if(!Map.prototype.forEach) {
			// firefox 17~24
			// myMap.forEach(callback([value][, key][, map])[, thisArg])
			Map.prototype.forEach = function forEach(callbackfn) {
				var it = this.iterator();
				while(true) {
					try {
						var next = it.next();
					} catch(e) {
						break;
					}
					callbackfn.call(arguments[1], next[1], next[0], this);
				}
			};
		}
		if(!Map.prototype.clear) {
			// firefox 13~18
			Map.prototype.clear = function clear() {
				var it = this.iterator();
				while(true) {
					try {
						this.delete(it.next()[0]);
					} catch(e) {
						break;
					}
				}
			};
		}
	}
	if(m.set(-0, 0) !== m) {
		if(m.has(0)) {
			fixChain(Map);
		} else {
			fixN0(Map);
		}
	}
	if(!Map.prototype['@@iterator']) {
		Map.prototype['@@iterator'] = Map.prototype.entries;
	}
	return Map;
}

function getKey(item) {
	return item[0];
}
function getValue(item) {
	return item[1];
}

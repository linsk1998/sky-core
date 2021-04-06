
import { Map as GMap } from "../native/Map";
import { toES6Iterator } from "../utils-modern/toES6Iterator";

export function createSubMap() {
	function Map(args) {
		var map = new GMap(args);
		Object.setPrototypeOf(map, Object.getPrototypeOf(this));
		return map;
	}
	Object.setPrototypeOf(Map, GMap);
	Map.prototype = Object.create(GMap.prototype);
	return Map;
}
export function fixMap() {
	var Map = SubMap();
	var m = new GMap();
	if(typeof m.size === "function") {
		// firefox 18-
		Object.defineProperty(Map.prototype, 'size', {
			get: function() {
				return GMap.prototype.size.call(this);
			},
			enumerable: true
		});
	}
	// ie11 not support iterator
	if(Map.prototype.iterator) {
		// firefox 17~26 iterator return firefox iterator
		if(!Map.prototype.entries) {
			// firefox 17~19
			Map.prototype.entries = function() {
				return toES6Iterator(this.iterator());
			};
		}
		if(!Map.prototype.keys) {
			Map.prototype.keys = function() {
				return toES6Iterator(this.iterator(), getKey);
			};
		}
		if(!Map.prototype.values) {
			Map.prototype.values = function() {
				return toES6Iterator(this.iterator(), getValue);
			};
		}
		if(!Map.prototype.forEach) {
			// firefox 17~24
			// myMap.forEach(callback([value][, key][, map])[, thisArg])
			Map.prototype.forEach = function(callbackfn, thisArg) {
				var it = this.iterator();
				while(true) {
					try {
						var next = it.next();
					} catch(e) {
						break;
					}
					callbackfn.call(thisArg, next[1], next[0], this);
				}
			};
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
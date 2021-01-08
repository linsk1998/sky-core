import "sky-core/polyfill/Array/prototype/entries";
import { Map as GMap } from "../native/Map";
import { toES6Iterator } from "../utils-modern/toES6Iterator";

export function fixMap(){
	function Map(args) {
		var map = new GMap(args);
		Object.setPrototypeOf(map, Object.getPrototypeOf(this));
		if(args && map.size === 0) {
			args = Array.from(args);
			args.forEach(setEach, map);
		}
		return map;
	}
	function setEach(item) {
		GMap.prototype.set.apply(this, item);
	}
	Object.setPrototypeOf(Map, GMap);
	Map.prototype = Object.create(GMap.prototype);
	var m = new GMap();
	if(typeof m.size === "function") {
		Object.defineProperty(Map.prototype, 'size', {
			get: function() {
				return GMap.prototype.size.call(this);
			},
			enumerable: true
		});
	}
	if(m !== m.set(1, 1)) {
		Map.prototype.set = function(key, value) {
			GMap.prototype.set.call(this, key, value);
			return this;
		};
	}
	if(Map.prototype.iterator) {
		if(!Map.prototype[Symbol.iterator]) {
			Map.prototype[Symbol.iterator] = function() {
				return toES6Iterator(this.iterator());
			};
		}
		if(!Map.prototype.forEach) {
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
	if(!Map.prototype[Symbol.iterator]) {
		if(Map.prototype.forEach) {
			Map.prototype[Symbol.iterator] = function() {
				var arr = [];
				this.forEach(pushEach, arr);
				return arr[Symbol.iterator]();
			};
		}
	}
	if(!Map.prototype.entries){
		Map.prototype.entries=Map.prototype[Symbol.iterator];
	}
	return Map;
}
function pushEach(value, key) {
	this.push([key, value]);
}
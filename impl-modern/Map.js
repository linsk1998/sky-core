import "sky-core/polyfill/Array/prototype/entries";
import { Map as GMap } from "../native/Map";
import { toES6Iterator } from "../utils-modern/toES6Iterator";
import { Symbol } from "sky-core/pure/Symbol";
import { setPrototypeOf } from "sky-core/pure/Object/setPrototypeOf";
import { getPrototypeOf } from "sky-core/pure/Object/getPrototypeOf";
import { from } from "sky-core/pure/Array/from";
import { create } from "sky-core/pure/Object/create";
import { defineProperty } from "sky-core/pure/Object/defineProperty";

function Map(args) {
	var map = new GMap(args);
	setPrototypeOf(map, getPrototypeOf(this));
	if(args && map.size === 0) {
		args = from(args);
		args.forEach(setEach, map);
	}
	return map;
}
function setEach(item) {
	GMap.prototype.set.apply(this, item);
}
setPrototypeOf(Set, GSet);
Map.prototype = create(GMap.prototype);
var m = new GMap();
if(typeof m.size === "function") {
	defineProperty(Map.prototype, 'size', {
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
			return arr.entries();
		};
	}
}
function pushEach(value, key) {
	this.push([key, value]);
}
export { Map };
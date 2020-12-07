import "sky-core/polyfill/Array/prototype/entries";
import { Set as GSet } from "../native/Set";
import { toES6Iterator } from "../utils-modern/toES6Iterator";
import { Symbol } from "sky-core/pure/Symbol";
import { setPrototypeOf } from "sky-core/pure/Object/setPrototypeOf";
import { getPrototypeOf } from "sky-core/pure/Object/getPrototypeOf";
import { from } from "sky-core/pure/Array/from";
import { create } from "sky-core/pure/Object/create";
import { defineProperty } from "sky-core/pure/Object/defineProperty";

function Set(args) {
	var set = new GSet(args);
	setPrototypeOf(set, getPrototypeOf(this));
	if(args && set.size === 0) {
		args = from(args);
		args.forEach(GSet.prototype.add, set);
	}
	return set;
}
setPrototypeOf(Set, GSet);
Set.prototype = create(GSet.prototype);
var s = new GSet();
if(s !== s.add(1)) {
	Set.prototype.add = function(value) {
		GSet.prototype.add.call(this, value);
		return this;
	};
}
if(typeof s.size === "function") {
	defineProperty(Set.prototype, 'size', {
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
			return arr.entries();
		};
	}
}
function pushEach(value) {
	this.push(value);
}
export { Set };
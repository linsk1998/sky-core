import { arrayToIterator } from "sky-core";
if(!Array.prototype[Symbol.iterator]) {
	Array.prototype[Symbol.iterator] = function() {
		return arrayToIterator(this);
	};
}
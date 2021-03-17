import { arrayToIterator } from "sky-core";
if(!Array.prototype.entries) {
	Array.prototype.entries = function() {
		return arrayToIterator(this, indexValue);
	};
}
function indexValue(value, index) {
	return [index, value];
}
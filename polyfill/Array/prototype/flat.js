import { flat } from "../../../impl/Array/flat";
if(!Array.prototype.flat) {
	Array.prototype.flat = function() {
		var deep = arguments[0];
		return flat(this, deep);
	};
}
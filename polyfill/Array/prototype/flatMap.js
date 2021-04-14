import { flatMap } from "../../../impl/Array/flatMap";
if(!Array.prototype.flatMap) {
	Array.prototype.flatMap = function(fn) {
		return flatMap(this, fn, arguments[1]);
	};
}
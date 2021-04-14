import { findIndex } from "../../../impl/Array/findIndex";
if(!Array.prototype.findIndex) {
	Array.prototype.findIndex = function(callback) {
		return findIndex(this, callback, arguments[1]);
	};
}
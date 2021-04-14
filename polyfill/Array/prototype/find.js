import { find } from "../../../impl/Array/find";
if(!Array.prototype.find) {
	Array.prototype.find = function(callback) {
		return find(this, callback, arguments[1]);
	};
}
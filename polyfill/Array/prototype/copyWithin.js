import { copyWithin } from "../../../impl/Array/copyWithin";
if(!Array.prototype.copyWithin) {
	Array.prototype.copyWithin = function(target, start/*, end*/) {
		return copyWithin(this, target, start, arguments[2]);
	};
}
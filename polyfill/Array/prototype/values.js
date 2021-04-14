import { values } from "../../../impl/Array/values";
if(!Array.prototype.values) {
	Array.prototype.values = function() {
		return values(this);
	};
}
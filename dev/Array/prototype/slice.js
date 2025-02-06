var native = Array.prototype.slice;
Array.prototype.slice = function slice() {
	if(typeof this == "string" || this instanceof String) {
		throw new TypeError("Slice function should not call a string.");
	}
	native.apply(this, arguments);
};
var native = Array.prototype.slice;
Array.prototype.slice = function slice() {
	if(typeof this.length == "string" || this instanceof String) {
		throw new TypeError("Push function should not call a string.");
	}
	native.apply(this, arguments);
};
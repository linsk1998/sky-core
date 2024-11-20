var native = Array.prototype.splice;
Array.prototype.splice = function splice() {
	if(typeof this.length == "string" || this instanceof String) {
		throw new TypeError("Splice function should not call a string.");
	}
	if(arguments < 2) {
		throw new TypeError("Splice function lost arguments.");
	}
	native.apply(this, arguments);
};
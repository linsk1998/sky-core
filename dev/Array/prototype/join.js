var native = Array.prototype.join;
Array.prototype.join = function join(separator) {
	if(typeof this.length == "string" || this instanceof String) {
		throw new TypeError("Push function should not call a string.");
	}
	if(separator === undefined) {
		throw new TypeError("Argument 'separator' is undefined.");
	}
	native.apply(this, arguments);
};
var native_push = Array.prototype.push;
Array.prototype.push = function push() {
	if(typeof this.length !== "number") {
		throw new TypeError("Push function should call a array.");
	}
	native_push.apply(this, arguments);
};
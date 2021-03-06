export function forEach(callback) {
	var thisArg = arguments[1];
	for(var i = 0; i < this.length; i++) {
		if(i in this) {
			callback.call(thisArg, this[i], i, this);
		}
	}
}
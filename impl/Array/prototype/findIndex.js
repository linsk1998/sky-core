export function findIndex(callback) {
	var thisArg = arguments[1];
	if(this.length > 0) {
		for(var i = 0, j; i < this.length; i++) {
			j = this[i];
			var r = callback.call(thisArg, j, i, this);
			if(r) {
				return i;
			}
		}
	}
	return -1;
}
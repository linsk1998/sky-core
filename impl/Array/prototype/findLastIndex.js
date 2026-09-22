export function findLastIndex(callback) {
	var thisArg = arguments[1];
	var i = this.length;
	if(i > 0) {
		while(i-- > 0) {
			var j = this[i];
			var r = callback.call(thisArg, j, i, this);
			if(r) {
				return i;
			}
		}
	}
	return -1;
}
export function findIndex(array, callback, thisArg) {
	if(array.length > 0) {
		for(var i = 0, j; i < array.length; i++) {
			j = array[i];
			var r = callback.call(thisArg, j, i, array);
			if(r) {
				return i;
			}
		}
	}
	return -1;
}
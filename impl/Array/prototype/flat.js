export function flat(array, deep) {
	if(deep == null) deep = 1;
	var arr = [];
	for(var i = 0; i < array.length; i++) {
		var item = array[i];
		if(Array.isArray(item) && deep > 0) {
			arr = arr.concat(flat(item, deep - 1));
		} else {
			arr.push(item);
		}
	}
	return arr;
}
export function flat() {
	var deep = arguments[0];
	if(deep == null) deep = 1;
	var arr = [];
	for(var i = 0; i < this.length; i++) {
		var item = this[i];
		if(Array.isArray(item) && deep > 0) {
			arr = arr.concat(flat.call(item, deep - 1));
		} else {
			arr.push(item);
		}
	}
	return arr;
}
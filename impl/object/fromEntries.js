
export function fromEntries(obj) {
	var arr = Array.from(obj);
	var len = arr.length;
	var o = {};
	for(var i = 0; i < len; i++) {
		var item = arr[i];
		if(Array.isArray(item)) {
			o[item[0]] = item[1];
		} else {
			throw new TypeError("Iterator value 1 is not an entry object");
		}
	}
	return o;
}

export function union() {
	var set = new Set();
	for(var i = 0; i < arguments.length; i++) {
		var arr = arguments[i];
		if(!Array.isArray(arr)) {
			arr = Array.from(arr);
		}
		var j = arr.length;
		while(j-- > 0) {
			set.add(arr[j]);
		}
	}
	return Array.from(set);
};
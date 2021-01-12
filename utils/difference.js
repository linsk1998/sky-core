
export function difference(arg1) {
	if(arguments.length === 0) {
		return new Array();
	}
	var set = new Set(arg1);
	for(var i = 1; i < arguments.length; i++) {
		var arr = arguments[i];
		if(!Array.isArray(arr)) {
			arr = Array.from(arr);
		}
		var j = arr.length;
		while(j-- > 0) {
			set.delete(arr[j]);
		}
	}
	return Array.from(set);
};

export function intersection(arg1) {
	if(arguments.length === 0) {
		return new Array();
	}
	var set = new Set(arg1);
	for(var i = 1; i < arguments.length; i++) {
		var arr = arguments[i];
		if(!Array.isArray(arr)) {
			arr = Array.from(arr);
		}
		set.forEach(function(item) {
			if(arr.indexOf(item) < 0) this.delete(item);
		}, set);
	}
	return Array.from(set);
};
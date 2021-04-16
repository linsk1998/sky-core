export function fill(target) {
	if(this.length <= 0) {
		return this;
	}
	var len = this.length;
	var start = arguments[1] || 0;
	var end = arguments[2] || len;
	if(start < 0) {
		start += len;
		if(start < 0) {
			start = 0;
		}
	}
	if(end < 0) {
		end += len;
	}
	var i = Math.min(end, len);
	while(i-- > start) {
		this[i] = target;
	}
	return this;
};
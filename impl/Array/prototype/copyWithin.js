export function copyWithin(target, start/*, end*/) {
	var end = arguments[2];
	var len = this.length || 0;

	if(target < 0) {
		target += len;
		if(target < 0) {
			target = 0;
		}
	}

	start = start || 0;
	if(start < 0) {
		start += len;
		if(start < 0) {
			start = 0;
		}
	}
	if(end === undefined) {
		end = len;
	}
	if(end < 0) {
		end += len;
		if(end < 0) {
			end = 0;
		}
	} else if(end - start + target > len) {
		end = len - target + start;
	}
	var i;
	for(i = start; i < end; i++) {
		if(i in this) {
			this[i - start + target] = this[i];
		} else {
			delete this[i];
		}
	}
	return this;
}
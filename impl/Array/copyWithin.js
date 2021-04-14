export function copyWithin(array, target, start, end) {
	if(array == null) {
		throw new TypeError('this is null or not defined');
	}
	var len = array.length || 0;

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
		if(i in array) {
			array[i - start + target] = array[i];
		} else {
			delete array[i];
		}
	}
	return array;
}
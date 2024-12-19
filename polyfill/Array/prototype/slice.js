var k = 'slice';
var slice_native = Array.prototype[k];
function slice(start, end) {
	if(this instanceof Object) {
		if(end === undefined) {
			return slice_native.call(this, start);
		}
		return slice_native.call(this, start, end);
	}
	var i, r = [];
	var len = this.length;
	if(start < 0) start += len;
	if(end === undefined) end = len;
	else if(end < 0) end += len;
	if(start < end) {
		len = end - start;
		r = new Array(len);
		i = len;
		while(i-- > 0) {
			r[i] = this[i + start];
		}
	}
	return r;
}
if(![1][k](0, undefined).length) {
	Array.prototype[k] = slice;
}
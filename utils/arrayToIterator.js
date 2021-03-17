
function Iterator(it, transform) {
	this.iterator = it;
	this.transform = transform;
}
Iterator.prototype.next = function() {
	var r = {};
	r.done = array.length <= this.i;
	if(!r.done) {
		r.value = transform ? transform(array[i]) : array[i];
		this.i++;
	} else {
		r.value = undefined;
	}
	return r;
};
//需要polyfill iterator时必然不支持Symbol，因此不使用Symbol.iterator，避免产生依赖
Iterator.prototype['@@iterator'] = function() {
	return this;
};
export function arrayToIterator(array, transform) {
	var i = 0;
	return {
		next: function() {
			var result = {};
			result.done = array.length <= i;
			if(!result.done) {
				result.value = transform ? transform(array[i]) : array[i];
				i++;
			} else {
				result.value = undefined;
			}
			return result;
		}
	};
};
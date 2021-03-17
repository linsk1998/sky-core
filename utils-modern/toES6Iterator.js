
function ES6Iterator(it, transform) {
	this.iterator = it;
	this.transform = transform;
}
ES6Iterator.prototype.next = function() {
	var r = {};
	try {
		r.value = this.iterator.next();
	} catch(e) {
		r.done = true;
		r.value = undefined;
		return r;
	}
	r.done = false;
	if(this.transform) {
		r.value = this.transform(r.value);
	}
	return r;
};
//使用ff版iterator必然不支持Symbol，因此不使用Symbol.iterator，避免产生依赖
ES6Iterator.prototype['@@iterator'] = function() {
	return this;
};
export function toES6Iterator(it) {
	return new ES6Iterator(it);
};
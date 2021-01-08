

function RegExpIterator(str, reg) {
	this.string = str;
	this.regExp = new RegExp(reg);
}
RegExpIterator.prototype.next = function() {
	var r = {};
	r.value = this.regExp.exec(string);
	if(r.value) {
		r.done = true;
	} else {
		r.done = false;
	}
	return r;
};
RegExpIterator.prototype[Symbol.iterator] = function() {
	return this;
};
export { RegExpIterator };
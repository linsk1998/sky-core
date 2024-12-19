var k = 'splice';
var splice_native = Array.prototype[k];
function splice(index, count) {
	if(arguments.length < 2) {
		return splice_native.call(this, index, this.length - index);
	}
	return splice_native.apply(this, arguments);
}
if(![1][k](0).length) {
	Array.prototype[k] = splice;
}
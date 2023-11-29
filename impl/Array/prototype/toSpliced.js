export function toSpliced(a1, a2) {
	var arr = Array.prototype.slice.call(this);
	arr.splice.apply(arr, arguments);
	return arr;
}
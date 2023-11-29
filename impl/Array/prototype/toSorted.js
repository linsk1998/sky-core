export function toSorted(fn) {
	var arr = Array.prototype.slice.call(this);
	arr.sort.apply(arr, arguments);
	return arr;
}
export function toSorted(fn) {
	var arr = Array.from(this);
	arr.sort.apply(arr, arguments);
	return arr;
}
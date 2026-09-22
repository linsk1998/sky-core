export function toSpliced(a1, a2) {
	var arr = Array.from(this);
	arr.splice.apply(arr, arguments);
	return arr;
}
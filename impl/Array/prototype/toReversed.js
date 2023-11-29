export function toReversed() {
	var arr = Array.prototype.slice.call(this);
	arr.reverse();
	return arr;
}
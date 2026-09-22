import { slice } from "../../../native/Array/prototype/slice";

export function toSorted(fn) {
	var arr = slice.call(this);
	arr.sort.apply(arr, arguments);
	return arr;
}
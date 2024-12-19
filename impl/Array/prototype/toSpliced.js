import { slice } from "../../../native/Array/prototype/slice";

export function toSpliced(a1, a2) {
	var arr = slice.call(this);
	arr.splice.apply(arr, arguments);
	return arr;
}
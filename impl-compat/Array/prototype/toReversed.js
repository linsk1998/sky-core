import { slice } from "../../../native/Array/prototype/slice";

export function toReversed() {
	var arr = slice.call(this);
	arr.reverse();
	return arr;
}
import { slice } from "../../../native/Array/prototype/slice";

export function withAt(index, value) {
	if(this == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	if(index < 0) {
		index += this.length;
	}
	if(index < 0 || index >= this.length) {
		throw new RangeError("Invalid index: " + index);
	}
	var arr = slice.call(this);
	arr[index] = value;
	return arr;
}
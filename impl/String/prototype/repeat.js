export function repeat(count) {
	if(this == null) {
		throw new TypeError("repeat called on null or undefined");
	}
	if(count < 0) {
		throw new RangeError("RangeError repeat count must be non-negative");
	}
	if(count === Number.POSITIVE_INFINITY) {
		throw new RangeError("RangeError repeat count must be less than infinity");
	}
	count = Math.floor(count);
	if(isNaN(count)) return "";
	return new Array(count + 1).join(this);
}
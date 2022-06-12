export function repeat(count) {
	if(count < 0) {
		throw new RangeError("RangeError repeat count must be non-negative");
	}
	if(count == Number.POSITIVE_INFINITY) {
		throw new RangeError("RangeError repeat count must be less than infinity");
	}
	return new Array(parseInt(count + 1)).join(this);
}
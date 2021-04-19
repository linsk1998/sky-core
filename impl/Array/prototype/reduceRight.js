export function reduceRight(callback) {
	var i = this.length, value;
	if(arguments.length >= 2) {
		value = arguments[1];
	} else if(this.length > 0) {
		value = this[--i];
	} else {
		throw new Error("Reduce of empty array with no initial value");
	}
	while(i-- > 0) {
		if(i in this) {
			value = callback(value, this[i], i, this);
		}
	}
	return value;
}
var native_isNaN = this.isNaN;
export function isNaN(value) {
	return typeof value === "number" && native_isNaN(value);
}
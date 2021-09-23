var native_isFinite = this.isFinite;
export function isFinite(value) {
	return typeof value === 'number' && native_isFinite(value);
}
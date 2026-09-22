export function contains(arg) {
	return !!(this.compareDocumentPosition(arg) & 16);
}
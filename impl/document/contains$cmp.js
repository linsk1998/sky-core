export function contains$cmp(arg) {
	return !!(this.compareDocumentPosition(arg) & 16);
}

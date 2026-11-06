export function contains$cmp(arg) {
	if(arg == null) {
		return false;
	}
	return this === arg || !!(this.compareDocumentPosition(arg) & 16);
}

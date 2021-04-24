export function trimStart() {
	return this.replace(/^[\s\uFEFF\xA0]+/g, '');
}
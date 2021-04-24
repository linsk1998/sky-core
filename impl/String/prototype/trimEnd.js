export function trimEnd() {
	return this.replace(/[\s\uFEFF\xA0]+$/g, '');
}
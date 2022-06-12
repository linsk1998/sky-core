export function trimStart() {
	return this.replace(/^[\s\u3000\xA0]+/g, '');
}
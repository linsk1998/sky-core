export function trimStart() {
	return this.replace(/^[\s\u2006\u3000\xA0]+/g, '');
}
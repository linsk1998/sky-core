export function trim() {
	return this.replace(/^[\s\u3000\xA0]+|[\s\u3000\xA0]+$/g, '');
}
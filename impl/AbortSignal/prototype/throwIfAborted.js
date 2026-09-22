export function throwIfAborted() {
	var aborted = this.aborted;
	if(!aborted) return;
	throw this.reason || new DOMException('Aborted', 'AbortError');
}
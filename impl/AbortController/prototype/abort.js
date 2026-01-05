export function abort(reason) {
	if(!reason) {
		reason = new DOMException('signal is aborted without reason', 'AbortError');
	}
	this.signal.reason = reason;
	this.signal.dispatchEvent(new Event('abort'));
}
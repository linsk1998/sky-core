export function fixAbort(prototype) {
	var abort = prototype.abort;
	prototype.abort = function() {
		if(this.signal.aborted) return;
		var reason = arguments[0];
		if(!reason) {
			reason = new DOMException('signal is aborted without reason', 'AbortError');
		}
		this.signal.reason = reason;
		abort.call(this);
	};
}
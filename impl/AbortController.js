import { AbortSignal } from "./AbortSignal";

function AbortController() {
	this.signal = new AbortSignal();
}
AbortController.prototype.abort = function(reason) {
	if(this.signal.aborted) return;
	if(!reason) {
		reason = new DOMException('signal is aborted without reason', 'AbortError');
	}
	this.signal.reason = reason;
	this.signal.aborted = true;
	this.signal.dispatchEvent(new Event('abort'));
	var listeners = this.signal.listeners.abort;
	if(listeners) {
		listeners.length = 0;
	}
};
AbortController.prototype.toString = function() {
	return '[object AbortController]';
};
export { AbortController };
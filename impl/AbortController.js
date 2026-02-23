import { AbortSignal } from "./AbortSignal";

function AbortController() {
	this.signal = new AbortSignal();
}
AbortController.prototype.abort = function(reason) {
	if(!reason) {
		reason = new DOMException('signal is aborted without reason', 'AbortError');
	}
	this.signal.aborted = true;
	this.signal.reason = reason;
	this.signal.dispatchEvent(new Event('abort'));
};
AbortController.prototype.toString = function() {
	return '[object AbortController]';
};
export { AbortController };
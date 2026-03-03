import { inherits } from "sky-core/utils/inherits";
import { EventTarget } from "./EventTarget";

function AbortSignal() {
	EventTarget.call(this);
	this.aborted = false;
	this.onabort = null;
}
inherits(AbortSignal, EventTarget);

AbortSignal.prototype.reason = undefined;
AbortSignal.prototype.toString = function() {
	return '[object AbortSignal]';
};
AbortSignal.prototype.dispatchEvent = function(event) {
	if(event.type === 'abort') {
		this.aborted = true;
		if(typeof this.onabort === 'function') {
			this.onabort.call(this, event);
		}
	}
	EventTarget.prototype.dispatchEvent.call(this, event);
};
AbortSignal.prototype.throwIfAborted = function() {
	var aborted = this.aborted;
	if(!aborted) return;
	throw this.reason || new DOMException('Aborted', 'AbortError');
};
export { AbortSignal };
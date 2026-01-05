import { AbortSignal } from "./AbortSignal";
import { abort } from "./AbortController/prototype/abort";

function AbortController() {
	this.signal = new AbortSignal();
}
AbortController.prototype.abort = abort;
AbortController.prototype.toString = function() {
	return '[object AbortController]';
};
export { AbortController };
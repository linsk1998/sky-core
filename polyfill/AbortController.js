import { AbortController } from "../impl/AbortController";
import { abort } from "../impl/AbortController/prototype/abort";

var native_AbortController = window.AbortController;
if(!native_AbortController) {
	window.AbortController = AbortController;
} else {
	if(!('reason' in AbortSignal.prototype)) {
		native_AbortController.prototype.abort = abort;
	}
}
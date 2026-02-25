import { AbortController } from "../impl/AbortController";
import { fixAbort } from "../impl/AbortController/prototype/abort";

var native_AbortController = window.AbortController;
if(!native_AbortController) {
	window.AbortController = AbortController;
} else {
	if(!('reason' in AbortSignal.prototype)) {
		fixAbort(native_AbortController.prototype);
	}
}
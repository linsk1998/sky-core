import { AbortController as native_AbortController } from "../native/AbortController";
import { AbortController } from "../impl/AbortController";
import { fixAbort } from "../impl/AbortController/prototype/abort";

if(!native_AbortController) {
	window.AbortController = AbortController;
} else {
	if(!('reason' in AbortSignal.prototype)) {
		fixAbort(native_AbortController.prototype);
	}
}
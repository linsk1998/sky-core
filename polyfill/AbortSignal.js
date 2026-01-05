import { AbortSignal } from "../impl/AbortSignal";
import { abort } from "../impl/AbortSignal/abort";
import { any } from "../impl/AbortSignal/any";
import { timeout } from "../impl/AbortSignal/timeout";
import { throwIfAborted } from "../impl/AbortSignal/prototype/throwIfAborted";

var native_AbortSignal = window.AbortSignal;
if(!native_AbortSignal) {
	AbortSignal.prototype.throwIfAborted = throwIfAborted;
	AbortSignal.abort = abort;
	AbortSignal.any = any;
	AbortSignal.timeout = timeout;
	window.AbortSignal = AbortSignal;
} else {
	if(!native_AbortSignal.prototype.throwIfAborted) {
		native_AbortSignal.prototype.throwIfAborted = throwIfAborted;
	}
	if(!native_AbortSignal.abort) {
		native_AbortSignal.abort = abort;
	}
	if(!native_AbortSignal.any) {
		native_AbortSignal.any = any;
	}
	if(!native_AbortSignal.timeout) {
		native_AbortSignal.timeout = timeout;
	}
}
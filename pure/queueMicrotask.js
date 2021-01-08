import { queueMicrotask } from "../native/queueMicrotask";
import { Promise } from "../native/Promise";
import { initQueueMicrotask, queueMicrotask as impl_queueMicrotask } from "../impl/queueMicrotask";
export default (function(globalThis) {
	if(queueMicrotask) {
		return queueMicrotask;
	} else {
		initQueueMicrotask(Promise ? Promise.prototype.then.bind(Promise.resolve(1)) : (globalThis.setImmediate || setTimeout));
		return impl_queueMicrotask;
	}
})(this);
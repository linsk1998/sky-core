import { Promise } from "../native/Promise";
import { setImmediate } from "../native/setImmediate";
import { initQueueMicrotask, queueMicrotask } from "../impl/queueMicrotask";
if(!this.queueMicrotask) {
	initQueueMicrotask(Promise ? Promise.prototype.then.bind(Promise.resolve(1)) : (setImmediate || setTimeout));
	this.queueMicrotask = queueMicrotask;
}
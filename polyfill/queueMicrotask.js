import { Promise } from "../native/Promise";
import { initQueueMicrotask, queueMicrotask } from "../impl/queueMicrotask";
if(!this.queueMicrotask) {
	initQueueMicrotask(Promise ? Promise.prototype.then.bind(Promise.resolve(1)) : setTimeout);
	this.queueMicrotask = queueMicrotask;
}
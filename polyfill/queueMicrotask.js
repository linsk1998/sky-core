import { initQueueMicrotask, queueMicrotask } from "../impl/queueMicrotask";
if(!this.queueMicrotask) {
	initQueueMicrotask(this.Promise ? Promise.prototype.then.bind(Promise.resolve(1)) : (this.setImmediate || setTimeout));
	this.queueMicrotask = queueMicrotask;
}
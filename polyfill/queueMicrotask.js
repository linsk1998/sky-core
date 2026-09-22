import { Promise } from "../native/Promise";
import { queueMicrotask } from "../native/queueMicrotask";
import { initQueueMicrotask } from "../impl/queueMicrotask";
if(!queueMicrotask) {
	window.queueMicrotask = initQueueMicrotask(Promise ? Promise.prototype.then.bind(Promise.resolve(1)) : setTimeout);
}
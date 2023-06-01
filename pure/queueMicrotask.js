import { queueMicrotask } from "../native/queueMicrotask";
import { Promise } from "../native/Promise";
import { initQueueMicrotask } from "../impl/queueMicrotask";
export default queueMicrotask || initQueueMicrotask(Promise ? Promise.prototype.then.bind(Promise.resolve(1)) : setTimeout);
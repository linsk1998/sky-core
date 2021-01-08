import { queueMicrotask } from "../impl/queueMicrotask";
if(!this.queueMicrotask) {
	this.queueMicrotask = queueMicrotask;
}
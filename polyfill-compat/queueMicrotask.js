import { queueMicrotask } from "../native/queueMicrotask";
import { queueMicrotask as impl_queueMicrotask } from "../impl/queueMicrotask";
if(!queueMicrotask) {
	window.queueMicrotask = impl_queueMicrotask;
}
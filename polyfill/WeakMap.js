import { WeakMap } from "../native/WeakMap";
import { WeakMap as impl_WeakMap } from "../impl/WeakMap";
if(!WeakMap) {
	window.WeakMap = impl_WeakMap;
}
import { WeakSet } from "../native/WeakSet.js";
import { WeakSet as impl_WeakSet } from "../impl/WeakSet";
if(!WeakSet) {
	window.WeakSet = impl_WeakSet;
}
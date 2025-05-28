import { WeakSet } from "../native/WeakSet.js";
import { WeakSet as impl_WeakSet } from "../impl/WeakSet";
import { fixChain } from "../impl-modern/WeakSet";

if(WeakSet) {
	var ws = new WeakSet();
	if(ws.add({}) !== ws) {
		fixChain(WeakSet);
	}
} else {
	window.WeakSet = impl_WeakSet;
}
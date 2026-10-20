import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { WeakSet as impl_WeakSet } from "../impl/WeakSet/WeakSet";
import { fixChain } from "../impl/WeakSet/fixChain";
import { fix_WeakSet$symbol } from "../impl/WeakSet/fix_WeakSet$symbol";

if(WeakSet) {
	var ws = new WeakSet();
	if(Symbol) {
		try {
			ws.add(Symbol());
		} catch(e) {
			window.WeakSet = fix_WeakSet$symbol(WeakSet);
		}
	} else {
		if(ws.add({}) !== ws) {
			fixChain(WeakSet);
		}
	}
} else {
	window.WeakSet = impl_WeakSet;
}
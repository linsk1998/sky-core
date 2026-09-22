import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { WeakSet as impl_WeakSet } from "../impl/WeakSet";
import { fixChain } from "../impl-modern/WeakSet";
import { fixSymbol } from "../impl-es2015/WeakSet";

if(WeakSet) {
	var ws = new WeakSet();
	if(Symbol) {
		try {
			ws.add(Symbol());
		} catch(e) {
			window.WeakSet = fixSymbol(WeakSet);
		}
	} else {
		if(ws.add({}) !== ws) {
			fixChain(WeakSet);
		}
	}
} else {
	window.WeakSet = impl_WeakSet;
}
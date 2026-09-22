import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { WeakSet as impl_WeakSet } from "../impl/WeakSet";
import { fixChain } from "../impl-modern/WeakSet";
import { fixSymbol } from "../impl-es2015/WeakSet";

export default (function() {
	if(WeakSet) {
		var ws = new WeakSet();
		if(Symbol) {
			try {
				ws.add(Symbol());
			} catch(e) {
				return fixSymbol(WeakSet);
			}
		} else {
			if(ws.add({}) !== ws) {
				fixChain(WeakSet);
			}
		}
		return WeakSet;
	} else {
		return impl_WeakSet;
	}
})();
import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { WeakSet as impl_WeakSet } from "../impl/WeakSet/WeakSet";
import { fixChain } from "../impl/WeakSet/fixChain";
import { fix_WeakSet$symbol } from "../impl/WeakSet/fix_WeakSet$symbol";

export default (function() {
	if(WeakSet) {
		var ws = new WeakSet();
		if(Symbol) {
			try {
				ws.add(Symbol());
			} catch(e) {
				return fix_WeakSet$symbol(WeakSet);
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
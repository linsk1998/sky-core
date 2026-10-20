import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { fix_WeakSet$symbol } from "../impl/WeakSet/fix_WeakSet$symbol";

export default (function() {
	var ws = new WeakSet();
	try {
		ws.add(Symbol());
		return WeakSet;
	} catch(e) {
		return fix_WeakSet$symbol(WeakSet);
	}
})();
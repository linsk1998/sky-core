import { WeakMap } from "../native/WeakMap";
import { Symbol } from "../native/Symbol";
import { fix_WeakMap$symbol } from "../impl/WeakMap/fix_WeakMap$symbol";

export default (function() {
	var wm = new WeakMap();
	try {
		wm.set(Symbol(), 1);
		return WeakMap;
	} catch(e) {
		return fix_WeakMap$symbol(WeakMap);
	}
})();
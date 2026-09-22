import { WeakMap } from "../native/WeakMap";
import { Symbol } from "../native/Symbol";
import { fixSymbol } from "../impl-es2015/WeakMap";

export default (function() {
	var wm = new WeakMap();
	try {
		wm.set(Symbol(), 1);
		return WeakMap;
	} catch(e) {
		return fixSymbol(WeakMap);
	}
})();
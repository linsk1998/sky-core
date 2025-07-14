import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { fixSymbol } from "../impl-es2015/WeakSet";

export default (function() {
	var ws = new WeakSet();
	try {
		ws.set(Symbol(), 1);
		return WeakSet;
	} catch(e) {
		return fixSymbol(WeakSet);
	}
})();
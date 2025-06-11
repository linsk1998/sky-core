import { WeakMap } from "../native/WeakMap";
import { Symbol } from "../native/Symbol";
import { nonEnumerable } from "../support/nonEnumerable";
import { WeakMap as impl_WeakMap, KEY_WM } from "../impl/WeakMap";
import { fixChain } from "../impl-modern/WeakMap";
import { fixSymbol } from "../impl-es2015/WeakMap";

export default (function() {
	if(WeakMap) {
		var wm = new WeakMap();
		if(Symbol) {
			try {
				wm.set(Symbol(), 1);
			} catch(e) {
				return fixSymbol(WeakMap);
			}
		} else {
			if(wm.set({}, 0) !== wm) {
				fixChain(WeakMap);
			}
		}
		return WeakMap;
	} else {
		if(nonEnumerable) {
			Object.defineProperty(Object.prototype, KEY_WM, {
				value: undefined,
				enumerable: false,
				configurable: true
			});
		}
		return impl_WeakMap;
	}
})();
import { WeakMap } from "../native/WeakMap";
import { Symbol } from "../native/Symbol";
import { nonEnumerable } from "../support/nonEnumerable";
import { WeakMap as impl_WeakMap, KEY_WM } from "../impl/WeakMap/WeakMap";
import { fixChain } from "../impl/WeakMap/fixChain";
import { fix_WeakMap$symbol } from "../impl/WeakMap/fix_WeakMap$symbol";

if(WeakMap) {
	var wm = new WeakMap();
	if(Symbol) {
		try {
			wm.set(Symbol(), 1);
		} catch(e) {
			window.WeakMap = fix_WeakMap$symbol(WeakMap);
		}
	} else {
		if(wm.set({}, 0) !== wm) {
			fixChain(WeakMap);
		}
	}
} else {
	if(nonEnumerable) {
		Object.defineProperty(Object.prototype, KEY_WM, {
			value: undefined,
			enumerable: false,
			configurable: true
		});
	}
	window.WeakMap = impl_WeakMap;
}
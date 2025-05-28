import { WeakMap } from "../native/WeakMap";
// import { freeze } from "../native/Object/freeze";
import { nonEnumerable } from "../support/nonEnumerable";
import { WeakMap as impl_WeakMap, KEY_WM } from "../impl/WeakMap";
import { fixChain } from "../impl-modern/WeakMap";

if(WeakMap) {
	var wm = new WeakMap();
	if(wm.set({}, 0) !== wm) {
		fixChain(WeakMap);
	}
} else {
	if(nonEnumerable) {
		Object.defineProperty(Object.prototype, KEY_WM, {
			value: undefined,
			enumerable: false,
			configurable: true
		});
		// if(freeze) {
		// 	Object.freeze = function(o) {
		// 		if(!o[KEY_WM]) {
		// 			Object.defineProperty(o, KEY_WM, {
		// 				value: {},
		// 				enumerable: false,
		// 				configurable: true
		// 			});
		// 		}
		// 		return freeze.call(Object, o);
		// 	};
		// }
	}
	window.WeakMap = impl_WeakMap;
}
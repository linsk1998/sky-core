import { WeakMap } from "../native/WeakMap";
import { Symbol } from "../native/Symbol";
import { fix_WeakMap$symbol } from "../impl/WeakMap/fix_WeakMap$symbol";

var wm = new WeakMap();
try {
	wm.set(Symbol(), 1);
} catch(e) {
	window.WeakMap = fix_WeakMap$symbol(WeakMap);
}
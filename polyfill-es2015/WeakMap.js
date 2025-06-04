import { WeakMap } from "../native/WeakMap";
import { Symbol } from "../native/Symbol";
import { fixSymbol } from "../impl-es2015/WeakMap";

var wm = new WeakMap();
try {
	wm.set(Symbol(), 1);
} catch(e) {
	window.WeakMap = fixSymbol(WeakMap);
}
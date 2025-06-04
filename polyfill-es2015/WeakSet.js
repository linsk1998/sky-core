import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { fixSymbol } from "../impl-es2015/WeakSet";

var ws = new WeakSet();
try {
	ws.set(Symbol(), 1);
} catch(e) {
	window.WeakSet = fixSymbol(WeakSet);
}
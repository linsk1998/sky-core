import { WeakSet } from "../native/WeakSet";
import { Symbol } from "../native/Symbol";
import { fix_WeakSet$symbol } from "../impl/WeakSet/fix_WeakSet$symbol";

var ws = new WeakSet();
try {
	ws.add(Symbol());
} catch(e) {
	window.WeakSet = fix_WeakSet$symbol(WeakSet);
}
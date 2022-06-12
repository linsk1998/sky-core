import "../Symbol";
import { Symbol as native_Symbol } from "../../native/Symbol";
import { keyFor as compat_keyFor } from "../../impl-compat/Symbol/keyFor";
import { keyFor as modern_keyFor } from "../../impl-modern/Symbol/keyFor";
var Symbol = this.Symbol;
if(!Symbol.keyFor) {
	Symbol.keyFor = native_Symbol ? modern_keyFor : compat_keyFor;
}
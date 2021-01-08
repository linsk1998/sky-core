import "../Symbol";
import { keyFor as compat_for } from "../../impl-compat/Symbol/keyFor";
import { keyFor as modern_for } from "../../impl-modern/Symbol/keyFor";
if(!Symbol.keyFor) {
	Symbol.keyFor = Symbol ? modern_for : compat_for;
}
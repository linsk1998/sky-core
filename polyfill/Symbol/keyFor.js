import { Symbol as native_Symbol } from "../native/Symbol";
import { keyFor as compat_for } from "../../impl-compat/Symbol/keyFor";
import { keyFor as modern_for } from "../../impl-modern/Symbol/keyFor";
if(!Symbol.keyFor) {
	Symbol.keyFor = native_Symbol ? modern_for : compat_for;
}
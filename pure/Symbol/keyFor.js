import { keyFor as modern_keyFor } from "../../impl-modern/Symbol/keyFor";
import { keyFor as compat_keyFor } from "../../impl-compat/Symbol/keyFor";
import { Symbol } from "../../native/Symbol";
export var keyFor = Symbol ? (Symbol.keyFor || modern_keyFor) : compat_keyFor;
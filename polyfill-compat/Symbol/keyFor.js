import { Symbol } from "../../polyfill/Symbol";
import { keyFor } from "../../impl-compat/Symbol/keyFor";

if(!Symbol.keyFor) {
	Symbol.keyFor = keyFor;
}
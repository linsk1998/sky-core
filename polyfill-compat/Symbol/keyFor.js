import "../Symbol";
import { keyFor } from "../../impl-compat/Symbol/keyFor";

var Symbol = this.Symbol;
if(!Symbol.keyFor) {
	Symbol.keyFor = keyFor;
}
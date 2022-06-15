import { Symbol } from "../Symbol";
import { keyFor } from "../../impl-compat/Symbol/keyFor";

if(!Symbol.keyFor) {
	Symbol.keyFor = keyFor;
}
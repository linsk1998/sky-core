import { Symbol } from "../Symbol";
import keyFor from "sky-core/pure/Symbol/keyFor";

if(!Symbol.keyFor) {
	Symbol.keyFor = keyFor;
}
import { Symbol } from "../../polyfill/Symbol";
import { keyFor as es3_keyFor } from "../../impl/Symbol/keyFor$es3";

if(!Symbol.keyFor) {
	Symbol.keyFor = es3_keyFor;
}

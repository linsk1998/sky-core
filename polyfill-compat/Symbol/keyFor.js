
import { keyFor as compat_for } from "../../impl-compat/Symbol/keyFor";
if(!Symbol.keyFor) {
	Symbol.keyFor = compat_for;
}
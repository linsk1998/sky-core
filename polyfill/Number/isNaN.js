import { Number } from "../../native/Number";
import { isNaN } from "../../impl/Number/isNaN";
if(!Number.isNaN) {
	Number.isNaN = isNaN;
}
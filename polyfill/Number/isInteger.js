import { Number } from "../../native/Number";
import { isInteger } from "../../impl/Number/isInteger";
if(!Number.isInteger) {
	Number.isInteger = isInteger;
}
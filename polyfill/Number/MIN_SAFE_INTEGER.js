import { Number } from "../../native/Number";
if(!('MIN_SAFE_INTEGER' in Number)) {
	Number.MIN_SAFE_INTEGER = -0x1FFFFFFFFFFFFF;
}
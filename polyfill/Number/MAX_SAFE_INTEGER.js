import { Number } from "../../native/Number";
if(!('MAX_SAFE_INTEGER' in Number)) {
	Number.MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
}
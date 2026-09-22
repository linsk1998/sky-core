import { Number } from "../../native/Number";
import "../Number/MAX_SAFE_INTEGER";
import "../Number/MIN_SAFE_INTEGER";

if(!Number.isSafeInteger) {
	Number.isSafeInteger = function isSafeInteger(value) {
		return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
	};
}
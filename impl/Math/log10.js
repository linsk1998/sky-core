import { log } from "../../native/Math/log";
import { LOG10E } from "../../native/Math/LOG10E";

// from core-js https://github.com/zloirock/core-js
export function log10(x) {
	return log(x) * LOG10E;
}
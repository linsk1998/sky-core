import { log } from "../../native/Math/log";
import { LN2 } from "../../native/Math/LN2";

// from core-js https://github.com/zloirock/core-js
export function log2(x) {
	return log(x) / LN2;
}
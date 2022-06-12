import { log } from "../../native/Math/log";
import { sqrt } from "../../native/Math/sqrt";

// from core-js https://github.com/zloirock/core-js
export function asinh(x) {
	return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}
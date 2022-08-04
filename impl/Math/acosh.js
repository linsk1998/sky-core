import { log } from "../../native/Math/log";
import { sqrt } from "../../native/Math/sqrt";
import { LN2 } from "../../native/Math/LN2";
import { log1p } from "sky-core/pure/Math/log1p";

// from core-js https://github.com/zloirock/core-js
export function acosh(x) {
	return (x = +x) < 1 ? NaN : x > 94906265.62425156
		? log(x) + LN2
		: log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
}
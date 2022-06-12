import { abs } from "../../native/Math/abs";
import { exp } from "../../native/Math/exp";
import { E } from "../../native/Math/E";
import { expm1 } from "sky-core/pure/Math/expm1";

// from core-js https://github.com/zloirock/core-js
export function sinh(x) {
	return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
}
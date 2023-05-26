import { exp } from "../../native/Math/exp";
import expm1 from "sky-core/pure/Math/expm1";

// from core-js https://github.com/zloirock/core-js
export function tanh(x) {
	var a = expm1(x = +x);
	var b = expm1(-x);
	return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
}
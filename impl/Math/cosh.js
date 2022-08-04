import { abs } from "../../native/Math/abs";
import { E } from "../../native/Math/E";
import { expm1 } from "sky-core/pure/Math/expm1";


// from core-js https://github.com/zloirock/core-js
export function cosh(x) {
	var t = expm1(abs(x) - 1) + 1;
	return (t + 1 / (t * E * E)) * (E / 2);
}
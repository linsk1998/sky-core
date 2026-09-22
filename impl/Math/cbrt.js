import { abs } from "../../native/Math/abs";
import { pow } from "../../native/Math/pow";
import sign from "sky-core/pure/Math/sign";

// from core-js https://github.com/zloirock/core-js
export function cbrt(x) {
	return sign(x = +x) * pow(abs(x), 1 / 3);
}
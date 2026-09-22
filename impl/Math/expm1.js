import { exp } from "../../native/Math/exp";


// from core-js https://github.com/zloirock/core-js
export function expm1(x) {
	return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
}
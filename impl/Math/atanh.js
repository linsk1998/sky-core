import { log } from "../../native/Math/log";

// from core-js https://github.com/zloirock/core-js
export function atanh(x) {
	return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
}
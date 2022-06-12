import { pow } from "../../native/Math/pow";
import { abs } from "../../native/Math/abs";
import { sign } from "sky-core/pure/Math/sign";


var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

function roundTiesToEven(n) {
	return n + 1 / EPSILON - 1 / EPSILON;
};

// from core-js https://github.com/zloirock/core-js
export function fround(x) {
	var $abs = abs(x);
	var $sign = sign(x);
	var a, result;
	if($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	a = (1 + EPSILON32 / EPSILON) * $abs;
	result = a - (a - $abs);
	// eslint-disable-next-line no-self-compare -- NaN check
	if(result > MAX32 || result != result) return $sign * Infinity;
	return $sign * result;
}
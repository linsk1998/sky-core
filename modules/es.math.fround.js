
import "core-js/modules/es.math.sign";

if(!Math.fround){
	var abs = Math.abs;
	var pow = Math.pow;
	var EPSILON = pow(2, -52);
	var EPSILON32 = pow(2, -23);
	var MAX32 = pow(2, 127) * (2 - EPSILON32);
	var MIN32 = pow(2, -126);
	
	var roundTiesToEven = function (n) {
		return n + 1 / EPSILON - 1 / EPSILON;
	};
	// `Math.fround` method implementation
	// https://tc39.github.io/ecma262/#sec-math.fround
	Math.fround=function(x) {
		var $abs = abs(x);
		var $sign = Math.sign(x);
		var a, result;
		if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
		a = (1 + EPSILON32 / EPSILON) * $abs;
		result = a - (a - $abs);
		// eslint-disable-next-line no-self-compare
		if (result > MAX32 || result != result) return $sign * Infinity;
		return $sign * result;
	};
}
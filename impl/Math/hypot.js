import { sqrt } from "../../native/Math/sqrt";
import { abs } from "../../native/Math/abs";

// from core-js https://github.com/zloirock/core-js
export function hypot(x, y) {
	var sum = 0;
	var i = 0;
	var aLen = arguments.length;
	var larg = 0;
	var arg, div;
	while(i < aLen) {
		arg = abs(arguments[i++]);
		if(larg < arg) {
			div = larg / arg;
			sum = sum * div * div + 1;
			larg = arg;
		} else if(arg > 0) {
			div = arg / larg;
			sum += div * div;
		} else sum += arg;
	}
	return larg === Infinity ? Infinity : larg * sqrt(sum);
}
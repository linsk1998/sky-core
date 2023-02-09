import { parseInt } from "../native/parseInt";
import { trimStart } from "../impl/String/prototype/trimStart";

if(parseInt("010") === 8) {
	window.parseInt = function(number, radix) {
		if(!radix && typeof number === 'string') {
			number = trimStart.call(number);
			if(number.charCodeAt(0) === 48 && number.charCodeAt(1) !== 120) {
				return parseInt(number, 10);
			}
		}
		return parseInt(number, radix);
	};
}
import { trimStart } from "../impl/String/prototype/trimStart";

export function fix_parseInt(parseInt) {
	return function(number, radix) {
		if(!radix && typeof number === 'string') {
			number = trimStart.call(number);
			if(number.charCodeAt(0) === 48 && number.charCodeAt(1) !== 120) {
				return parseInt(number, 10);
			}
		}
		return parseInt(number, radix);
	};
};
import { prefixIntrger2 } from "../../../utils/prefixIntrger2";
import { prefixIntrger3 } from "../../../utils/prefixIntrger3";

function prefixIntrger4(number) {
	if(number < 10) return '000' + number;
	if(number < 100) return '00' + number;
	if(number < 1000) return '0' + number;
	return '' + number;
}

function prefixIntrger6(number) {
	var sign = number < 0 ? '-' : '+';
	var abs = number < 0 ? -number : number;
	if(abs < 10) return sign + '00000' + abs;
	if(abs < 100) return sign + '0000' + abs;
	if(abs < 1000) return sign + '000' + abs;
	if(abs < 10000) return sign + '00' + abs;
	if(abs < 100000) return sign + '0' + abs;
	return sign + abs;
}

export function toISOString() {
	var time = this.getTime();
	if(isNaN(time)) {
		throw new RangeError("Invalid time value");
	}
	var year = this.getUTCFullYear();
	var yearStr = year < 0 || year > 9999 ? prefixIntrger6(year) : prefixIntrger4(year);
	return yearStr +
		'-' + prefixIntrger2(this.getUTCMonth() + 1) +
		'-' + prefixIntrger2(this.getUTCDate()) +
		'T' + prefixIntrger2(this.getUTCHours()) +
		':' + prefixIntrger2(this.getUTCMinutes()) +
		':' + prefixIntrger2(this.getUTCSeconds()) +
		'.' + prefixIntrger3(this.getUTCMilliseconds()) + 'Z';
}

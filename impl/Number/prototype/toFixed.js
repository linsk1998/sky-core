import { slice } from "../../../native/String/prototype/slice";
import { repeat } from "../../String/prototype/repeat";
import { toInteger } from "../../../utils/toInteger";

// from core-js

function pow(x, n, acc) {
	return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
}

function log(x) {
	var n = 0;
	var x2 = x;
	while(x2 >= 4096) {
		n += 12;
		x2 /= 4096;
	}
	while(x2 >= 2) {
		n += 1;
		x2 /= 2;
	} return n;
}

function multiply(data, n, c) {
	var index = -1;
	var c2 = c;
	while(++index < 6) {
		c2 += n * data[index];
		data[index] = c2 % 1e7;
		c2 = Math.floor(c2 / 1e7);
	}
}

function divide(data, n) {
	var index = 6;
	var c = 0;
	while(--index >= 0) {
		c += data[index];
		data[index] = Math.floor(c / n);
		c = (c % n) * 1e7;
	}
}

function dataToString(data) {
	var index = 6;
	var s = '';
	while(--index >= 0) {
		if(s !== '' || index === 0 || data[index] !== 0) {
			var t = String(data[index]);
			s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
		}
	} return s;
}

export function toFixed(fractionDigits) {
	var number = this;
	var fractDigits = toInteger(fractionDigits);
	var data = [0, 0, 0, 0, 0, 0];
	var sign = '';
	var result = '0';
	var e, z, j, k;

	if(fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
	// eslint-disable-next-line no-self-compare -- NaN check
	if(isNaN(number)) return 'NaN';
	if(number <= -1e21 || number >= 1e21) return String(number);
	if(number < 0) {
		sign = '-';
		number = -number;
	}
	if(number > 1e-21) {
		e = log(number * pow(2, 69, 1)) - 69;
		z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
		z *= 0x10000000000000;
		e = 52 - e;
		if(e > 0) {
			multiply(data, 0, z);
			j = fractDigits;
			while(j >= 7) {
				multiply(data, 1e7, 0);
				j -= 7;
			}
			multiply(data, pow(10, j, 1), 0);
			j = e - 1;
			while(j >= 23) {
				divide(data, 1 << 23);
				j -= 23;
			}
			divide(data, 1 << j);
			multiply(data, 1, 1);
			divide(data, 2);
			result = dataToString(data);
		} else {
			multiply(data, 0, z);
			multiply(data, 1 << -e, 0);
			result = dataToString(data) + repeat.call('0', fractDigits);
		}
	}
	if(fractDigits > 0) {
		k = result.length;
		result = sign + (k <= fractDigits
			? '0.' + repeat.call('0', fractDigits - k) + result
			: slice.call(result, 0, k - fractDigits) + '.' + slice.call(result, k - fractDigits));
	} else {
		result = sign + result;
	} return result;
}
import { abs } from "../../native/Math/abs";
import { pow } from "../../native/Math/pow";
import { createIteratorHelper } from "../../utils/createIteratorHelper";

// Math.sumPrecise，基于 Shewchuk 精确浮点求和算法（ES2025）。
// 移植自 core-js（MIT）与 tc39/proposal-math-sum 参考实现：
// https://tc39.es/ecma262/#sec-math.sumprecise
// 只接受可迭代对象；元素必须全是数字（含 -0），空输入返回 -0，
// +∞ 与 -∞ 同时出现返回 NaN，极端量级也不会丢失精度。

var InfinityValue = Infinity;
var NaNValue = NaN;
var POW_2_1023 = pow(2, 1023);
var MAX_SAFE_INTEGER = pow(2, 53) - 1;
var MAX_DOUBLE = 1.7976931348623157e+308;
var MAX_ULP = pow(2, 971);

var NOT_A_NUMBER = {};
var MINUS_INFINITY = {};
var PLUS_INFINITY = {};
var MINUS_ZERO = {};
var FINITE = {};

// 前置条件：abs(x) >= abs(y)
function twosum(x, y) {
	var hi = x + y;
	var lo = y - (hi - x);
	return { hi: hi, lo: lo };
}

// 把 x 累加到一组互不重叠的部分和上（原地），返回溢出计数的变化量
function addToPartials(partials, x) {
	// 装箱的数字先转一遍，让引擎在循环里保持未装箱的双精度
	x = +x;
	var overflow = 0;
	var y, sum, hi, lo, tmp;
	var actuallyUsedPartials = 0;
	for(var j = 0; j < partials.length; j++) {
		y = partials[j];
		if(abs(x) < abs(y)) {
			tmp = x;
			x = y;
			y = tmp;
		}
		sum = twosum(x, y);
		hi = sum.hi;
		lo = sum.lo;
		if(abs(hi) === InfinityValue) {
			var sign = hi === InfinityValue ? 1 : -1;
			overflow += sign;
			x = (x - (sign * POW_2_1023)) - (sign * POW_2_1023);
			if(abs(x) < abs(y)) {
				tmp = x;
				x = y;
				y = tmp;
			}
			sum = twosum(x, y);
			hi = sum.hi;
			lo = sum.lo;
		}
		if(lo !== 0) partials[actuallyUsedPartials++] = lo;
		x = hi;
	}
	if(x !== 0) partials[actuallyUsedPartials++] = x;
	partials.length = actuallyUsedPartials;
	return overflow;
}

export function sumPrecise(items) {
	var _iterator = createIteratorHelper(items), _step;
	if(!_iterator) {
		throw new TypeError(typeof items + " " + items + " is not iterable.");
	}
	var partials = [];
	var overflow = 0; // 概念上是这个值乘以 2 ** 1024；最终部分和按此偏置
	var count = 0;
	var state = MINUS_ZERO;

	function add(n) {
		if(++count > MAX_SAFE_INTEGER) throw new RangeError('Maximum allowed index exceeded');
		if(typeof n != 'number') throw new TypeError('Value is not a number');
		if(state !== NOT_A_NUMBER) {
			// NaN 检查
			if(n !== n) state = NOT_A_NUMBER;
			else if(n === InfinityValue) state = state === MINUS_INFINITY ? NOT_A_NUMBER : PLUS_INFINITY;
			else if(n === -InfinityValue) state = state === PLUS_INFINITY ? NOT_A_NUMBER : MINUS_INFINITY;
			else if((n !== 0 || (1 / n) === InfinityValue) && (state === MINUS_ZERO || state === FINITE)) {
				state = FINITE;
				// 边迭代边累加：先缓存数值会占用与个数成正比的内存
				overflow += addToPartials(partials, n);
			}
		}
	}

	try {
		for(_iterator.s(); !(_step = _iterator.n()).done;) {
			add(_step.value);
		}
	} catch(err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}

	switch(state) {
		case NOT_A_NUMBER: return NaNValue;
		case MINUS_INFINITY: return -InfinityValue;
		case PLUS_INFINITY: return InfinityValue;
		case MINUS_ZERO: return -0;
	}

	var x, y, sum, hi, lo;

	// 计算部分和的精确总和，一失去精度就停
	var n = partials.length - 1;
	hi = 0;
	lo = 0;

	if(overflow !== 0) {
		var next = n >= 0 ? partials[n] : 0;
		n--;
		if(abs(overflow) > 1 || (overflow > 0 && next > 0) || (overflow < 0 && next < 0)) {
			return overflow > 0 ? InfinityValue : -InfinityValue;
		}
		// 这里必须真的做算术：先除以 2 避免溢出
		// assert(abs(overflow) === 1)
		sum = twosum(overflow * POW_2_1023, next / 2);
		hi = sum.hi;
		lo = sum.lo;
		lo *= 2;
		if(abs(2 * hi) === InfinityValue) {
			// 舍入到最大值的情况
			if(hi > 0) {
				return (hi === POW_2_1023 && lo === -(MAX_ULP / 2) && n >= 0 && partials[n] < 0) ? MAX_DOUBLE : InfinityValue;
			}
			return (hi === -POW_2_1023 && lo === (MAX_ULP / 2) && n >= 0 && partials[n] > 0) ? -MAX_DOUBLE : -InfinityValue;
		}

		if(lo !== 0) {
			partials[++n] = lo;
			lo = 0;
		}

		hi *= 2;
	}

	while(n >= 0) {
		sum = twosum(hi, partials[n--]);
		hi = sum.hi;
		lo = sum.lo;
		if(lo !== 0) break;
	}

	if(n >= 0 && ((lo < 0 && partials[n] < 0) || (lo > 0 && partials[n] > 0))) {
		y = lo * 2;
		x = hi + y;
		if(y === x - hi) hi = x;
	}

	return hi;
}

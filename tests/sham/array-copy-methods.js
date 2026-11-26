// Array 变更副本四方法（toReversed/toSorted/toSpliced/with）的 impl 直测，
// 断言与 tests/corejs/es/es.array.to-* / with 的活跃断言等价。
// 实现以 slice.call 拷贝（ES3 可用、对可迭代目标按索引取值贴 spec），
// 经实验验证可跨 compat/modern/legacy/es2015 通用，直接测试通用版
import { toReversed } from "../../impl/Array/prototype/toReversed";
import { toSorted } from "../../impl/Array/prototype/toSorted";
import { toSpliced } from "../../impl/Array/prototype/toSpliced";
import { withAt } from "../../impl/Array/prototype/with";
import { STRICT } from "../corejs/helpers/constants.js";

QUnit.test('toReversed', function(assert) {
	var array = [1, 2];
	assert.ok(toReversed.call(array) !== array, 'immutable');
	assert.deepEqual(toReversed.call([1, 2.2, 3.3]), [3.3, 2.2, 1], 'basic');

	var object = {};
	assert.deepEqual(toReversed.call({
		0: undefined,
		1: 2,
		2: 1,
		3: 'X',
		4: -1,
		5: 'a',
		6: true,
		7: object,
		8: NaN,
		10: Infinity,
		length: 11
	}), [
		Infinity,
		undefined,
		NaN,
		object,
		true,
		'a',
		-1,
		'X',
		1,
		2,
		undefined
	], 'non-array target');

	assert.ok(toReversed.call([1]) instanceof Array, 'instanceof Array');

	// 项目不支持 Symbol.species，相关断言注释
	// array = [1];
	// array.constructor = {};
	// array.constructor[typeof Symbol === 'function' && Symbol.species || '@@species'] = function() {
	// 	return { foo: 1 };
	// };
	// assert.ok(toReversed.call(array) instanceof Array, 'species');

	// 可迭代目标按索引取值：Set 无 length 返回空数组（Array.from 拷贝会走迭代器，偏离 spec）
	if(typeof Set === 'function') {
		assert.equal(toReversed.call(new Set([1, 2, 3])).length, 0, 'iterable target');
	}
	// sloppy 打包产物中 .call(null) 的 this 会被强转全局对象而不抛错，仅 strict 环境断言
	if(STRICT) {
		assert.throws(function() { toReversed.call(null); }, TypeError, 'null throws');
		assert.throws(function() { toReversed.call(undefined); }, TypeError, 'undefined throws');
	}
});

QUnit.test('toSorted', function(assert) {
	var array = [1];
	assert.ok(toSorted.call(array) !== array, 'immutable');

	assert.deepEqual(toSorted.call([1, 3, 2]), [1, 2, 3], '#1');
	assert.deepEqual(toSorted.call([1, 3, 2, 11]), [1, 11, 2, 3], '#2');
	assert.deepEqual(toSorted.call([1, -1, 3, NaN, 2, 0, 11, -0]), [-1, 0, -0, 1, 11, 2, 3, NaN], '#3');

	array = Array(5);
	array[0] = 1;
	array[2] = 3;
	array[4] = 2;
	var expected = Array(5);
	expected[0] = 1;
	expected[1] = 2;
	expected[2] = 3;
	assert.deepEqual(toSorted.call(array), expected, 'holes');

	array = 'zyxwvutsrqponMLKJIHGFEDCBA'.split('');
	expected = 'ABCDEFGHIJKLMnopqrstuvwxyz'.split('');
	assert.deepEqual(toSorted.call(array), expected, 'alpha #1');

	array = 'ёяюэьыъщшчцхфутсрПОНМЛКЙИЗЖЕДГВБА'.split('');
	expected = 'АБВГДЕЖЗИЙКЛМНОПрстуфхцчшщъыьэюяё'.split('');
	assert.deepEqual(toSorted.call(array), expected, 'alpha #2');

	array = [undefined, 1];
	assert.notThrows(function() {
		return array = toSorted.call(array, function() { throw 1; });
	}, 'undefined #1');
	assert.deepEqual(array, [1, undefined], 'undefined #2');

	if(typeof Symbol == 'function' && !Symbol.sham) {
		assert.throws(function() { toSorted.call([Symbol(1), Symbol(2)]); }, TypeError, 'w/o cmp throws on symbols');
	}

	assert.ok(toSorted.call([1]) instanceof Array, 'instanceof Array');
	if(STRICT) {
		assert.throws(function() { toSorted.call(null); }, TypeError, 'null throws');
		assert.throws(function() { toSorted.call(undefined); }, TypeError, 'undefined throws');
	}
});

QUnit.test('toSpliced', function(assert) {
	var array = [1, 2, 3, 4, 5];
	assert.ok(toSpliced.call(array, 2) !== array, 'immutable');

	assert.deepEqual(toSpliced.call([1, 2, 3, 4, 5], 2, 2), [1, 2, 5]);
	assert.deepEqual(toSpliced.call([1, 2, 3, 4, 5], 2, -2), [1, 2, 3, 4, 5]);
	assert.deepEqual(toSpliced.call([1, 2, 3, 4, 5], 2, 2, 6, 7), [1, 2, 6, 7, 5]);

	assert.ok(toSpliced.call([]) instanceof Array, 'instanceof Array');
	if(STRICT) {
		assert.throws(function() { toSpliced.call(null); }, TypeError, 'null throws');
		assert.throws(function() { toSpliced.call(undefined); }, TypeError, 'undefined throws');
	}
});

QUnit.test('with', function(assert) {
	var array = [1, 2, 3, 4, 5];
	assert.ok(withAt.call(array, 2, 1) !== array, 'immutable');

	assert.deepEqual(withAt.call([1, 2, 3, 4, 5], 2, 6), [1, 2, 6, 4, 5]);
	assert.deepEqual(withAt.call([1, 2, 3, 4, 5], -2, 6), [1, 2, 3, 6, 5]);
	assert.deepEqual(withAt.call([1, 2, 3, 4, 5], '1', 6), [1, 6, 3, 4, 5]);

	assert.throws(function() { withAt.call([1, 2, 3, 4, 5], 5, 6); }, RangeError, 'RangeError');
	assert.throws(function() { withAt.call([1, 2, 3, 4, 5], -6, 6); }, RangeError, 'RangeError');
	if(STRICT) {
		assert.throws(function() { withAt.call(null, 1, 2); }, TypeError, 'null throws');
		assert.throws(function() { withAt.call(undefined, 1, 2); }, TypeError, 'undefined throws');
	}
});

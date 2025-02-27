import { STRICT } from '../helpers/constants';

QUnit.test('Array#copyWithin', assert => {
	const copyWithin = Array.prototype.copyWithin;
	assert.isFunction(copyWithin);
	assert.arity(copyWithin, 2);
	assert.name(copyWithin, 'copyWithin');
	const array = [1];
	assert.strictEqual(array.copyWithin(0), array);
	assert.nonEnumerable(Array.prototype, 'copyWithin');
	assert.strictEqual(array.copyWithin(0), array);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-2), [1, 2, 3, 1, 2]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, 3), [4, 5, 3, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3), [1, 4, 5, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 2), [1, 3, 4, 5, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(2, 2), [1, 2, 3, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, 3, 4), [4, 2, 3, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3, 4), [1, 4, 3, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 2, 4), [1, 3, 4, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, -2), [4, 5, 3, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(0, -2, -1), [4, 2, 3, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -2), [1, 3, 3, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -1), [1, 3, 4, 4, 5]);
	assert.deepEqual([1, 2, 3, 4, 5].copyWithin(-4, -3), [1, 3, 4, 5, 5]);
	if(STRICT) {
		assert.throws(() => copyWithin.call(null, 0), TypeError);
		assert.throws(() => copyWithin.call(undefined, 0), TypeError);
	}
});

import { STRICT } from '../helpers/constants';

QUnit.test('Array#includes', assert => {
	const includes = Array.prototype.includes;
	assert.isFunction(includes);
	assert.name(includes, 'includes');
	assert.arity(includes, 1);
	assert.looksNative(includes);
	assert.nonEnumerable(Array.prototype, 'includes');
	const object = {};
	const array = [1, 2, 3, -0, object];
	assert.ok(array.includes(1));
	assert.ok(array.includes(-0));
	assert.ok(array.includes(0));
	assert.ok(array.includes(object));
	assert.ok(!array.includes(4));
	assert.ok(!array.includes(-0.5));
	assert.ok(!array.includes({}));
	assert.ok(Array(1).includes(undefined));
	assert.ok([NaN].includes(NaN));
	if(STRICT) {
		assert.throws(() => includes.call(null, 0), TypeError);
		assert.throws(() => includes.call(undefined, 0), TypeError);
	}
});

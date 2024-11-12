import { createIterable } from '../helpers/helpers.js';

QUnit.test('Map.groupBy', assert => {
	const groupBy = Map.groupBy;
	const from = Array.from;

	assert.isFunction(groupBy);
	assert.arity(groupBy, 2);
	assert.name(groupBy, 'groupBy');

	assert.ok(groupBy([], it => it) instanceof Map);

	assert.deepEqual(from(groupBy([], it => it)), []);
	assert.deepEqual(from(groupBy([1, 2], it => it ** 2)), [[1, [1]], [4, [2]]]);
	assert.deepEqual(from(groupBy([1, 2, 1], it => it ** 2)), [[1, [1, 1]], [4, [2]]]);
	assert.deepEqual(from(groupBy(createIterable([1, 2]), it => it ** 2)), [[1, [1]], [4, [2]]]);
	assert.deepEqual(from(groupBy('qwe', it => it)), [['q', ['q']], ['w', ['w']], ['e', ['e']]], 'iterable string');

	const element = {};
	groupBy([element], function(it, i) {
		assert.same(arguments.length, 2);
		assert.same(it, element);
		assert.same(i, 0);
	});
});
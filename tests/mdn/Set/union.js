// 移植自 MDN Set.prototype.union 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union

QUnit.test('Set.prototype.union (MDN)', assert => {
	// Using union()
	const evens = new Set([2, 4, 6, 8]);
	const squares = new Set([1, 4, 9]);
	assert.deepEqual(Array.from(evens.union(squares)), [2, 4, 6, 8, 1, 9], 'Set(6) { 2, 4, 6, 8, 1, 9 }');

	// 返回新集合，不修改参与运算的集合
	assert.deepEqual(Array.from(evens), [2, 4, 6, 8], 'this is unchanged');
	assert.deepEqual(Array.from(squares), [1, 4, 9], 'other is unchanged');
});

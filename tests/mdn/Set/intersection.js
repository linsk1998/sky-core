// 移植自 MDN Set.prototype.intersection 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection

QUnit.test('Set.prototype.intersection (MDN)', assert => {
	// Using intersection()
	const odds = new Set([1, 3, 5, 7, 9]);
	const squares = new Set([1, 4, 9]);
	assert.deepEqual(Array.from(odds.intersection(squares)), [1, 9], 'Set(2) { 1, 9 }');

	// 结果顺序与较小集合一致
	assert.deepEqual(Array.from(squares.intersection(odds)), [1, 9], 'order follows the smaller set');

	// 返回新集合，不修改参与运算的集合
	assert.deepEqual(Array.from(odds), [1, 3, 5, 7, 9], 'this is unchanged');
	assert.deepEqual(Array.from(squares), [1, 4, 9], 'other is unchanged');
});

// 移植自 MDN Set.prototype.difference 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference

QUnit.test('Set.prototype.difference (MDN)', assert => {
	// Using difference()
	const odds = new Set([1, 3, 5, 7, 9]);
	const squares = new Set([1, 4, 9]);
	assert.deepEqual(Array.from(odds.difference(squares)), [3, 5, 7], 'Set(3) { 3, 5, 7 }');

	// 结果顺序与 this 一致
	assert.deepEqual(Array.from(squares.difference(odds)), [4], 'order follows this');

	// 返回新集合，不修改参与运算的集合
	assert.deepEqual(Array.from(odds), [1, 3, 5, 7, 9], 'this is unchanged');
	assert.deepEqual(Array.from(squares), [1, 4, 9], 'other is unchanged');
});

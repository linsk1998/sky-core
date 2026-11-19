// 移植自 MDN Set.prototype.symmetricDifference 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference

QUnit.test('Set.prototype.symmetricDifference (MDN)', assert => {
	// Using symmetricDifference()
	const evens = new Set([2, 4, 6, 8]);
	const squares = new Set([1, 4, 9]);
	assert.deepEqual(Array.from(evens.symmetricDifference(squares)), [2, 6, 8, 1, 9], 'Set(5) { 2, 6, 8, 1, 9 }');

	// 结果顺序：先保留 this 中未命中的元素，再追加 other 中独有的元素
	assert.deepEqual(Array.from(squares.symmetricDifference(evens)), [1, 9, 2, 6, 8], 'order follows this then other');

	// 返回新集合，不修改参与运算的集合
	assert.deepEqual(Array.from(evens), [2, 4, 6, 8], 'this is unchanged');
	assert.deepEqual(Array.from(squares), [1, 4, 9], 'other is unchanged');
});

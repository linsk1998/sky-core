// 移植自 MDN Set.prototype.isSubsetOf 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf

QUnit.test('Set.prototype.isSubsetOf (MDN)', assert => {
	// Using isSubsetOf()
	const fours = new Set([4, 8, 12, 16]);
	const evens = new Set([2, 4, 6, 8, 10, 12, 14, 16, 18]);
	assert.ok(fours.isSubsetOf(evens), 'true');

	const sixes = new Set([6, 12, 18]);
	assert.ok(sixes.isSubsetOf(evens), 'true');

	const odds = new Set([1, 3, 5, 7, 9]);
	assert.ok(!odds.isSubsetOf(evens), 'false');

	// 集合是其自身的子集
	assert.ok(fours.isSubsetOf(fours), 'a set is a subset of itself');
});

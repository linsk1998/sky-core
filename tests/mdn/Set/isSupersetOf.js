// 移植自 MDN Set.prototype.isSupersetOf 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSupersetOf

QUnit.test('Set.prototype.isSupersetOf (MDN)', assert => {
	// Using isSupersetOf()
	const evens = new Set([2, 4, 6, 8, 10, 12, 14, 16, 18]);
	const fours = new Set([4, 8, 12, 16]);
	assert.ok(evens.isSupersetOf(fours), 'true');

	const sixes = new Set([6, 12, 18]);
	assert.ok(evens.isSupersetOf(sixes), 'true');

	const odds = new Set([1, 3, 5, 7, 9]);
	assert.ok(!evens.isSupersetOf(odds), 'false');

	// 集合是其自身的超集
	assert.ok(fours.isSupersetOf(fours), 'a set is a superset of itself');
});

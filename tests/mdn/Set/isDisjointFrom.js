// 移植自 MDN Set.prototype.isDisjointFrom 示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom

QUnit.test('Set.prototype.isDisjointFrom (MDN)', assert => {
	// Using isDisjointFrom()
	const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
	const squares = new Set([1, 4, 9, 16]);
	assert.ok(primes.isDisjointFrom(squares), 'true');

	const composites = new Set([4, 6, 8, 9, 10, 12, 14, 15, 16, 18]);
	assert.ok(primes.isDisjointFrom(composites), 'true');

	const odds = new Set([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
	assert.ok(!primes.isDisjointFrom(odds), 'false');
});

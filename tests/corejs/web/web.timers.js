QUnit.asyncTest('setTimeout works with additional args', assert => {
	expect(1);
	const timeout = setTimeout(function(a, b) {
		clearTimeout(guard);
		assert.strictEqual(a + b, 'ab', 'setTimeout works with additional args');
		start();
	}, 10, 'a', 'b');
	const guard = setTimeout(function() {
		assert.ok(false, 'setTimeout works with additional args');
		start();
	}, 1000);
});

QUnit.asyncTest('clearTimeout prevents callback', assert => {
	expect(1);
	const timeout = setTimeout(function() {
		assert.ok(false, 'clearTimeout prevents callback');
		start();
	}, 30);
	clearTimeout(timeout);
	setTimeout(function() {
		assert.ok(true, 'clearTimeout prevents callback');
		start();
	}, 60);
});

QUnit.asyncTest('setInterval works with additional args', assert => {
	expect(1);
	let i = 0;
	const interval = setInterval(function(a, b) {
		if(a + b !== 'ab') {
			clearInterval(interval);
			assert.ok(false, `setInterval works with additional args: ${a}, ${b}`);
			start();
			return;
		}
		if(++i === 3) {
			clearInterval(interval);
			assert.ok(true, 'setInterval works with additional args');
			start();
		}
	}, 5, 'a', 'b');
	setTimeout(function() {
		if(i < 3) {
			clearInterval(interval);
			assert.ok(false, `setInterval works with additional args, times: ${i}`);
			start();
		}
	}, 1000);
});

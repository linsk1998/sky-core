QUnit.test('AbortController', function(assert) {
	var reason = new Error('Hello');
	var o = [];
	var ac = new AbortController();
	assert.ok(ac instanceof AbortController);
	assert.ok(ac.signal instanceof AbortSignal);
	assert.equal(ac.signal.aborted, false);

	ac.signal.addEventListener('abort', function() {
		assert.equal(ac.signal.aborted, true);
		assert.equal(ac.signal.reason, reason);
		o.push(2);
	});
	o.push(1);
	ac.abort(reason);
	assert.equal(ac.signal.aborted, true);
	o.push(3);
	assert.deepEqual(o, [1, 2, 3]);
	assert.equal(ac.signal.reason, reason);
});
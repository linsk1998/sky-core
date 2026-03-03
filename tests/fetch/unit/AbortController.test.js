QUnit.test('AbortController', function(assert) {
	var reason = new Error('Hello');
	var o = [];
	var ac = new AbortController();
	assert.ok(ac instanceof AbortController, "instanceof AbortController");
	assert.ok(ac.signal instanceof AbortSignal, ".signal");
	assert.equal(ac.signal.aborted, false);

	ac.signal.addEventListener('abort', function() {
		assert.equal(ac.signal.aborted, true, ".aborted change before event");
		assert.equal(ac.signal.reason, reason, ".reason change before event");
		o.push(2);
	});
	o.push(1);
	ac.abort(reason);
	assert.equal(ac.signal.aborted, true);
	o.push(3);
	assert.deepEqual(o, [1, 2, 3], "event not in task");
	assert.equal(ac.signal.reason, reason);
});

QUnit.test('AbortController#abort', function(assert) {
	var o = [];
	var ac = new AbortController();
	ac.signal.onabort = function() {
		o.push(2);
	};
	o.push(1);
	ac.abort(1);
	o.push(3);
	ac.abort(2);
	o.push(4);
	assert.notEqual(ac.signal.onabort, null);
	assert.deepEqual(o, [1, 2, 3, 4], "多次abort调用");
	assert.equal(ac.signal.reason, 1);
});
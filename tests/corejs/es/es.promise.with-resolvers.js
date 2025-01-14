QUnit.test('Promise.withResolvers', assert => {
	const withResolvers = Promise.withResolvers;
	assert.isFunction(withResolvers);
	assert.arity(withResolvers, 0);
	assert.name(withResolvers, 'withResolvers');

	const d1 = Promise.withResolvers();
	assert.same(Object.getPrototypeOf(d1), Object.prototype, 'proto is Object.prototype');
	assert.ok((d1.promise instanceof Promise) === true, 'promise is promise');
	assert.isFunction(d1.resolve, 'resolve is function');
	assert.isFunction(d1.reject, 'reject is function');

	// const promise = {};
	// const resolve = () => { /* empty */ };
	// let reject = () => { /* empty */ };

	// function P(exec) {
	// 	exec(resolve, reject);
	// 	return promise;
	// }

	// const d2 = withResolvers.call(P);
	// assert.same(d2.promise, promise, 'promise is promise #2');
	// assert.same(d2.resolve, resolve, 'resolve is resolve #2');
	// assert.same(d2.reject, reject, 'reject is reject #2');

	// reject = {};

	// assert.throws(() => withResolvers.call(P), TypeError, 'broken resolver');
	// assert.throws(() => withResolvers.call({}), TypeError, 'broken constructor #1');
	// assert.throws(() => withResolvers.call(null), TypeError, 'broken constructor #2');
});

QUnit.asyncTest('Promise.withResolvers, resolve', assert => {
	expect(1);
	const d = Promise.withResolvers();
	d.resolve(42);
	return d.promise.then(it => {
		assert.same(it, 42, 'resolved as expected');
		start();
	}, () => {
		assert.avoid();
	});
});

QUnit.asyncTest('Promise.withResolvers, reject', assert => {
	expect(1);
	const d = Promise.withResolvers();
	d.reject(42);
	return d.promise.then(() => {
		assert.avoid();
	}, error => {
		assert.same(error, 42, 'rejected as expected');
		start();
	});
});
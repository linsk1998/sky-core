QUnit.test('Promise.allSettled', assert => {
  assert.isFunction(Promise.allSettled);
  assert.arity(Promise.allSettled, 1);
  assert.looksNative(Promise.allSettled);
  // assert.nonEnumerable(Promise, 'allSettled');
  assert.ok(Promise.allSettled([1, 2, 3]) instanceof Promise, 'returns a promise');
});

QUnit.asyncTest('Promise.allSettled, resolved', assert => {
  expect(1);
  Promise.allSettled([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3),
  ]).then(it => {
    assert.deepEqual(it, [
      { value: 1, status: 'fulfilled' },
      { reason: 2, status: 'rejected' },
      { value: 3, status: 'fulfilled' },
    ], 'resolved with a correct value');
    start();
  });
});

QUnit.asyncTest('Promise.allSettled, rejected', assert => {
  expect(1);
  Promise.allSettled().catch(() => {
    assert.ok(true, 'rejected as expected');
    start();
  });
});

QUnit.test('Promise.any', assert => {
  assert.isFunction(Promise.any);
  assert.arity(Promise.any, 1);
  assert.looksNative(Promise.any);
  // assert.nonEnumerable(Promise, 'any');
  assert.ok(Promise.any([1, 2, 3]) instanceof Promise, 'returns a promise');
});

QUnit.asyncTest('Promise.any, resolved', assert => {
  expect(1);
  Promise.any([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3),
  ]).then(it => {
    assert.same(it, 1, 'resolved with a correct value');
    start();
  });
});

QUnit.asyncTest('Promise.any, rejected #1', assert => {
  expect(2);
  Promise.any([
    Promise.reject(1),
    Promise.reject(2),
    Promise.reject(3),
  ]).catch(error => {
    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
    assert.deepEqual(error.errors, [1, 2, 3], 'rejected with a correct value');
    start();
  });
});

QUnit.asyncTest('Promise.any, rejected #2', assert => {
  expect(1);
  Promise.any().catch(() => {
    assert.ok(true, 'rejected as expected');
    start();
  });
});

QUnit.asyncTest('Promise.any, rejected #3', assert => {
  expect(2);
  Promise.any([]).catch(error => {
    assert.ok(error instanceof AggregateError, 'instanceof AggregateError');
    assert.deepEqual(error.errors, [], 'rejected with a correct value');
    start();
  });
});

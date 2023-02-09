QUnit.test('Math.cbrt', assert => {
  assert.isFunction(Math.cbrt);
  assert.name(Math.cbrt, 'cbrt');
  assert.arity(Math.cbrt, 1);
  assert.looksNative(Math.cbrt);
  assert.nonEnumerable(Math, 'cbrt');
  assert.same(Math.cbrt(NaN), NaN);
  assert.same(Math.cbrt(0), 0);
  assert.same(Math.cbrt(-0), -0);
  assert.strictEqual(Math.cbrt(Infinity), Infinity);
  assert.strictEqual(Math.cbrt(-Infinity), -Infinity);
  assert.strictEqual(Math.cbrt(-8), -2);
  assert.strictEqual(Math.cbrt(8), 2);
  assert.epsilon(Math.cbrt(-1000), -10);
  assert.epsilon(Math.cbrt(1000), 10);
});

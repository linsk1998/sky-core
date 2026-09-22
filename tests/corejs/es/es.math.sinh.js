QUnit.test('Math.sinh', assert => {
  assert.isFunction(Math.sinh);
  assert.name(Math.sinh, 'sinh');
  assert.arity(Math.sinh, 1);
  assert.looksNative(Math.sinh);
  // assert.nonEnumerable(Math, 'sinh');
  assert.same(Math.sinh(NaN), NaN);
  assert.same(Math.sinh(0), 0);
  assert.same(Math.sinh(-0), -0);
  assert.strictEqual(Math.sinh(Infinity), Infinity);
  assert.strictEqual(Math.sinh(-Infinity), -Infinity);
  assert.epsilon(Math.sinh(-5), -74.20321057778875);
  assert.epsilon(Math.sinh(2), 3.6268604078470186);
  assert.strictEqual(Math.sinh(-2e-17), -2e-17);
});

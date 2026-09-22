QUnit.test('Math.expm1', assert => {
  assert.isFunction(Math.expm1);
  assert.name(Math.expm1, 'expm1');
  assert.arity(Math.expm1, 1);
  assert.looksNative(Math.expm1);
  // assert.nonEnumerable(Math, 'expm1');
  assert.same(Math.expm1(NaN), NaN);
  assert.same(Math.expm1(0), 0);
  assert.same(Math.expm1(-0), -0);
  assert.strictEqual(Math.expm1(Infinity), Infinity);
  assert.strictEqual(Math.expm1(-Infinity), -1);
  assert.epsilon(Math.expm1(10), 22025.465794806718);
  assert.epsilon(Math.expm1(-10), -0.9999546000702375);
});

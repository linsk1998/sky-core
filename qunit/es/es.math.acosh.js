QUnit.test('Math.acosh', assert => {
  assert.isFunction(Math.acosh);
  assert.name(Math.acosh, 'acosh');
  assert.arity(Math.acosh, 1);
  assert.looksNative(Math.acosh);
  // assert.nonEnumerable(Math, 'acosh');
  assert.same(Math.acosh(NaN), NaN);
  assert.same(Math.acosh(0.5), NaN);
  assert.same(Math.acosh(-1), NaN);
  assert.same(Math.acosh(-1e300), NaN);
  assert.same(Math.acosh(1), 0);
  assert.strictEqual(Math.acosh(Infinity), Infinity);
  assert.epsilon(Math.acosh(1234), 7.811163220849231);
  assert.epsilon(Math.acosh(8.88), 2.8737631531629235);
  assert.epsilon(Math.acosh(1e+160), 369.10676205960726);
  assert.epsilon(Math.acosh(Number.MAX_VALUE), 710.475860073944);
  assert.epsilon(Math.acosh(1 + Number.EPSILON), 2.1073424255447017e-8);
});

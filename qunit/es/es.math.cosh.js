QUnit.test('Math.cosh', assert => {
  assert.isFunction(Math.cosh);
  assert.name(Math.cosh, 'cosh');
  assert.arity(Math.cosh, 1);
  assert.looksNative(Math.cosh);
  assert.nonEnumerable(Math, 'cosh');
  assert.same(Math.cosh(NaN), NaN);
  assert.strictEqual(Math.cosh(0), 1);
  assert.strictEqual(Math.cosh(-0), 1);
  assert.strictEqual(Math.cosh(Infinity), Infinity);
  assert.strictEqual(Math.cosh(-Infinity), Infinity);
  assert.epsilon(Math.cosh(12), 81377.395712574, 1e-9);
  assert.epsilon(Math.cosh(22), 1792456423.065795780980053377, 1e-5);
  assert.epsilon(Math.cosh(-10), 11013.23292010332313972137);
  assert.epsilon(Math.cosh(-23), 4872401723.1244513000, 1e-5);
  assert.epsilon(Math.cosh(710), 1.1169973830808557e+308, 1e+295);
});

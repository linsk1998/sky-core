QUnit.test('Math.asinh', assert => {
  assert.isFunction(Math.asinh);
  assert.name(Math.asinh, 'asinh');
  assert.arity(Math.asinh, 1);
  assert.looksNative(Math.asinh);
  // assert.nonEnumerable(Math, 'asinh');
  assert.same(Math.asinh(NaN), NaN);
  assert.same(Math.asinh(0), 0);
  assert.same(Math.asinh(-0), -0);
  assert.strictEqual(Math.asinh(Infinity), Infinity);
  assert.strictEqual(Math.asinh(-Infinity), -Infinity);
  assert.epsilon(Math.asinh(1234), 7.811163549201245);
  assert.epsilon(Math.asinh(9.99), 2.997227420191335);
  assert.epsilon(Math.asinh(1e150), 346.0809111296668);
  assert.epsilon(Math.asinh(1e7), 16.811242831518268);
  assert.epsilon(Math.asinh(-1e7), -16.811242831518268);
});

import { NATIVE } from '../helpers/constants';

QUnit.test('Math.tanh', assert => {
  assert.isFunction(Math.tanh);
  assert.name(Math.tanh, 'tanh');
  assert.arity(Math.tanh, 1);
  assert.looksNative(Math.tanh);
  assert.nonEnumerable(Math, 'tanh');
  assert.same(Math.tanh(NaN), NaN);
  assert.same(Math.tanh(0), 0);
  assert.same(Math.tanh(-0), -0);
  assert.strictEqual(Math.tanh(Infinity), 1);
  assert.strictEqual(Math.tanh(90), 1);
  assert.epsilon(Math.tanh(10), 0.9999999958776927);
  if(NATIVE) assert.strictEqual(Math.tanh(710), 1);
});

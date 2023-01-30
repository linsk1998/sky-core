import { includes } from '../helpers/helpers';

QUnit.test('Object.keys', assert => {
  assert.isFunction(Object.keys);
  assert.arity(Object.keys, 1);
  assert.name(Object.keys, 'keys');
  assert.looksNative(Object.keys);
  assert.nonEnumerable(Object, 'keys');
  function F1() {
    this.w = 1;
  }
  function F2() {
    this.toString = 1;
  }
  F1.prototype.q = F2.prototype.q = 1;
  assert.deepEqual(Object.keys([1, 2, 3]), ['0', '1', '2']);
  assert.deepEqual(Object.keys(new F1()), ['w']);
  assert.deepEqual(Object.keys(new F2()), ['toString']);
  assert.ok(!includes(Object.keys(Array.prototype), 'push'));
  const primitives = [42, 'foo', false];
  for(const value of primitives) {
    assert.notThrows(() => Object.keys(value), `accept ${typeof value} 不支持`);
  }
  assert.throws(() => Object.keys(null), TypeError, 'throws on null');
  assert.throws(() => Object.keys(undefined), TypeError, 'throws on undefined');
});


import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Object.getOwnPropertyDescriptors', assert => {
  assert.isFunction(Object.getOwnPropertyDescriptors);
  assert.arity(Object.getOwnPropertyDescriptors, 1);
  assert.name(Object.getOwnPropertyDescriptors, 'getOwnPropertyDescriptors');
  const object = Object.create({ q: 1 }, { e: { value: 3 } });
  object.w = 2;
  const symbol = Symbol('4');
  object[symbol] = 4;
  const descriptors = Object.getOwnPropertyDescriptors(object);
  assert.strictEqual(descriptors.q, undefined);
  assert.deepEqual(descriptors.w, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 2,
  });
  if(DESCRIPTORS) {
    assert.deepEqual(descriptors.e, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: 3,
    });
  } else {
    assert.deepEqual(descriptors.e, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3,
    });
  }
  assert.strictEqual(descriptors[symbol].value, 4);
});

QUnit.test('Object.getOwnPropertyDescriptors.sham flag', assert => {
  assert.same(Object.getOwnPropertyDescriptors.sham, DESCRIPTORS ? undefined : true);
});

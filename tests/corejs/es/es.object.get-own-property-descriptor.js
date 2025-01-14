import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Object.getOwnPropertyDescriptor', assert => {
  assert.isFunction(Object.getOwnPropertyDescriptor);
  assert.arity(Object.getOwnPropertyDescriptor, 2);
  assert.name(Object.getOwnPropertyDescriptor, 'getOwnPropertyDescriptor');
  assert.deepEqual(Object.getOwnPropertyDescriptor({ q: 42 }, 'q'), {
    writable: true,
    enumerable: true,
    configurable: true,
    value: 42,
  });
  assert.ok(Object.getOwnPropertyDescriptor({}, 'toString') === undefined);
  // const primitives = [42, 'foo', false];
  // for(const value of primitives) {
  //   assert.notThrows(() => Object.getOwnPropertyDescriptor(value) || true);
  // }
  assert.throws(() => Object.getOwnPropertyDescriptor(null), TypeError, 'throws on null');
  assert.throws(() => Object.getOwnPropertyDescriptor(undefined), TypeError, 'throws on undefined');
});

QUnit.test('Object.getOwnPropertyDescriptor.sham flag', assert => {
  assert.same(Object.getOwnPropertyDescriptor.sham, DESCRIPTORS ? undefined : true);
});

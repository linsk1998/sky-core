import { PROTO } from '../helpers/constants';

if(PROTO) QUnit.test('Object.setPrototypeOf', assert => {
  assert.isFunction(Object.setPrototypeOf);
  assert.arity(Object.setPrototypeOf, 2);
  // assert.name(Object.setPrototypeOf, 'setPrototypeOf');
  assert.looksNative(Object.setPrototypeOf);
  assert.nonEnumerable(Object, 'setPrototypeOf');
  // assert.ok('apply' in Object.setPrototypeOf({}, Function.prototype), 'Parent properties in target');
  assert.strictEqual(Object.setPrototypeOf({ a: 2 }, {
    b() {
      return this.a ** 2;
    },
  }).b(), 4, 'Child and parent properties in target');
  const object = {};
  assert.strictEqual(Object.setPrototypeOf(object, { a: 1 }), object, 'setPrototypeOf return target');
  // assert.ok(!('toString' in Object.setPrototypeOf({}, null)), 'Can set null as prototype');
});

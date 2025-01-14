import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Object.defineProperty', assert => {
  assert.isFunction(Object.defineProperty);
  assert.arity(Object.defineProperty, 3);
  assert.name(Object.defineProperty, 'defineProperty');
  const source = {};
  const result = Object.defineProperty(source, 'q', {
    value: 42,
  });
  assert.same(result, source);
  assert.same(result.q, 42);
  assert.throws(() => Object.defineProperty(42, 1, {}));
  assert.throws(() => Object.defineProperty({}, Object.create(null), {}));
  assert.throws(() => Object.defineProperty({}, 1, 1));
});

QUnit.test('Object.defineProperty.sham flag', assert => {
  assert.same(Object.defineProperty.sham, DESCRIPTORS ? undefined : true);
});

import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Object.defineProperties', assert => {
  assert.isFunction(Object.defineProperties);
  assert.arity(Object.defineProperties, 2);
  assert.name(Object.defineProperties, 'defineProperties');
  const source = {};
  const result = Object.defineProperties(source, { q: { value: 42 }, w: { value: 33 } });
  assert.same(result, source);
  assert.same(result.q, 42);
  assert.same(result.w, 33);
});

// QUnit.test('Object.defineProperties.sham flag', assert => {
//   assert.same(Object.defineProperties.sham, DESCRIPTORS ? undefined : true);
// });

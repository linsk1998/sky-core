import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Symbol.asyncIterator', assert => {
  assert.ok(!!Symbol.asyncIterator, 'Symbol.asyncIterator available');
});

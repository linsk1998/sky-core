import { DESCRIPTORS } from '../helpers/constants';

QUnit.test('Symbol.asyncIterator', assert => {
  assert.ok('asyncIterator' in Symbol, 'Symbol.asyncIterator available');
  if(DESCRIPTORS) {
    const descriptor = Object.getOwnPropertyDescriptor(Symbol, 'asyncIterator');
    assert.ok(!descriptor.enumerble, 'non-enumerable');
    assert.ok(!descriptor.writable, 'non-writable');
    assert.ok(!descriptor.configurable, 'non-configurable');
  }
});

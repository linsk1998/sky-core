import { GLOBAL } from '../helpers/constants';
import { includes } from '../helpers/helpers';

QUnit.test('Object.getOwnPropertyNames', assert => {
  assert.isFunction(Object.getOwnPropertyNames);
  assert.arity(Object.getOwnPropertyNames, 1);
  assert.name(Object.getOwnPropertyNames, 'getOwnPropertyNames');
  function F1() {
    this.w = 1;
  }
  function F2() {
    this.toString = 1;
  }
  F1.prototype.q = F2.prototype.q = 1;
  const names = Object.getOwnPropertyNames([1, 2, 3]);
  assert.strictEqual(names.length, 4);
  assert.ok(includes(names, '0'));
  assert.ok(includes(names, '1'));
  assert.ok(includes(names, '2'));
  assert.ok(includes(names, 'length'));
  assert.deepEqual(Object.getOwnPropertyNames(new F1()), ['w']);
  assert.deepEqual(Object.getOwnPropertyNames(new F2()), ['toString']);
  // assert.ok(includes(Object.getOwnPropertyNames(Array.prototype), 'toString'));
  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'toString'));
  // assert.ok(includes(Object.getOwnPropertyNames(Object.prototype), 'constructor'));
  // const primitives = [42, 'foo', false];
  // for(const value of primitives) {
  //   assert.notThrows(() => Object.getOwnPropertyNames(value), `accept ${typeof value}`);
  // }
  assert.throws(() => {
    Object.getOwnPropertyNames(null);
  }, TypeError, 'throws on null');
  assert.throws(() => {
    Object.getOwnPropertyNames(undefined);
  }, TypeError, 'throws on undefined');
  // if(GLOBAL.document) {
  //   assert.notThrows(() => {
  //     const iframe = document.createElement('iframe');
  //     iframe.src = 'http://example.com';
  //     document.documentElement.appendChild(iframe);
  //     const window = iframe.contentWindow;
  //     document.documentElement.removeChild(iframe);
  //     return Object.getOwnPropertyNames(window);
  //   }, 'IE11 bug with iframe and window');
  // }
});


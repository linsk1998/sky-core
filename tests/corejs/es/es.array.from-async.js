// 移植自 core-js tests/unit-global/es.array.from-async.js（MIT）
import { createIterable } from '../helpers/helpers.js';

QUnit.test('Array.fromAsync basic', assert => {
  assert.isFunction(Array.fromAsync);
  assert.arity(Array.fromAsync, 1);
  assert.name(Array.fromAsync, 'fromAsync');
});

QUnit.asyncTest('iterable basic', assert => {
  Array.fromAsync([1, 2, 3]).then(arr => {
    assert.arrayEqual(arr, [1, 2, 3]);
    start();
  }).catch(err => { assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('iterable with mapFn', assert => {
  Array.fromAsync([1, 2, 3], x => x * 2).then(arr => {
    assert.arrayEqual(arr, [2, 4, 6]);
    start();
  }).catch(err => { assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('iterable with async mapFn', assert => {
  Array.fromAsync([1, 2, 3], x => Promise.resolve(x * 2)).then(arr => {
    assert.arrayEqual(arr, [2, 4, 6]);
    start();
  }).catch(err => { assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('array with promise values', assert => {
  Array.fromAsync([1, Promise.resolve(2), 3]).then(arr => {
    assert.arrayEqual(arr, [1, 2, 3]);
    start();
  }).catch(err => { assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('string', assert => {
  Array.fromAsync('123').then(arr => {
    assert.arrayEqual(arr, ['1', '2', '3']);
    start();
  }).catch(err => { assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('subclassable', assert => {
  function C() {}
  Array.fromAsync.call(C, [1]).then(it => {
    assert.ok(it instanceof C);
    start();
  }).catch(err => { assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('non-iterable array-like', assert => {
  Array.fromAsync({ length: 1, 0: 1 }).then(arr => {
    assert.arrayEqual(arr, [1]);
    start();
  }).catch(err => { assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('constructor receives length', assert => {
  var log = [];
  function C(length) { log.push('c', length); }
  Array.fromAsync.call(C, { length: 2, 0: Promise.resolve(1), 1: 2 }).then(result => {
    assert.ok(result instanceof C);
    assert.equal(log.length, 2);
    assert.equal(log[1], 2);
    start();
  }).catch(err => { console.error('FAIL constructor:', err); assert.ok(false, 'rejected: ' + err); start(); });
});

QUnit.asyncTest('null rejects', assert => {
  Array.fromAsync(null).then(() => {
    assert.ok(false, 'should reject');
    start();
  }, err => {
    assert.ok(err instanceof TypeError);
    start();
  }).catch(err => { assert.ok(false, 'unexpected catch'); start(); });
});

QUnit.asyncTest('undefined rejects', assert => {
  Array.fromAsync(undefined).then(() => {
    assert.ok(false, 'should reject');
    start();
  }, err => {
    assert.ok(err instanceof TypeError);
    start();
  }).catch(err => { assert.ok(false, 'unexpected catch'); start(); });
});

QUnit.asyncTest('null mapFn rejects', assert => {
  Array.fromAsync([1], null).then(() => {
    assert.ok(false, 'should reject');
    start();
  }, err => {
    assert.ok(err instanceof TypeError);
    start();
  }).catch(err => { assert.ok(false, 'unexpected catch'); start(); });
});

QUnit.asyncTest('non-function mapFn rejects', assert => {
  Array.fromAsync([1], {}).then(() => {
    assert.ok(false, 'should reject');
    start();
  }, err => {
    assert.ok(err instanceof TypeError);
    start();
  }).catch(err => { assert.ok(false, 'unexpected catch'); start(); });
});

QUnit.asyncTest('mapFn error', assert => {
  Array.fromAsync(createIterable([1]), () => { throw 42; }).then(() => {
    assert.ok(false, 'should reject');
    start();
  }, err => {
    assert.equal(err, 42);
    start();
  }).catch(err => { assert.ok(false, 'unexpected catch'); start(); });
});

QUnit.asyncTest('sync iterable return on early termination', assert => {
  var closed = false;
  var closable = createIterable([1, 2, 3], {
    return() {
      closed = true;
      return { value: undefined, done: true };
    },
  });
  Array.fromAsync(closable, item => {
    if(item === 2) throw 42;
    return item;
  }).then(() => {
    assert.ok(false, 'should reject');
    start();
  }, err => {
    assert.equal(err, 42);
    assert.ok(closed, 'return() called');
    start();
  }).catch(err => { console.error('FAIL cleanup:', err); assert.ok(false, 'unexpected catch'); start(); });
});

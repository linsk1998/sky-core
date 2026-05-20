import { timeLimitedPromise } from '../helpers/helpers';

QUnit.asyncTest('setTimeout / clearTimeout', function() {
  expect(1);
  timeLimitedPromise(1000, function(resolve) {
    setTimeout(function(a, b) {
      resolve(a + b);
    }, 10, 'a', 'b');
  }).then(function(it) {
    QUnit.strictEqual(it, 'ab', 'setTimeout works with additional args');
  }).catch(function() {
    QUnit.ok(false, 'setTimeout works with additional args');
  }).then(function() {
    start();
  });
});
QUnit.asyncTest('setTimeout / clearTimeout', function() {
  expect(1);
  timeLimitedPromise(50, function(resolve) {
    clearTimeout(setTimeout(resolve, 10));
  }).then(function() {
    QUnit.ok(false, 'clearImmediate works with wraped setTimeout');
  }).catch(function() {
    QUnit.ok(true, 'clearImmediate works with wraped setTimeout');
  }).then(function() {
    start();
  });
});

QUnit.asyncTest('setInterval / clearInterval', assert => {
  expect(1);

  timeLimitedPromise(1000, (resolve, reject) => {
    let i = 0;
    const interval = setInterval((a, b) => {
      if(a + b !== 'ab' || i > 2) reject({ a, b, i });
      if(i++ === 2) {
        clearInterval(interval);
        setTimeout(resolve, 30);
      }
    }, 5, 'a', 'b');
  }).then(() => {
    assert.ok(true, 'setInterval & clearInterval works with additional args');
  }).catch(error => {
    if(!error) error = {};
    assert.ok(false, `setInterval & clearInterval works with additional args: ${error.a}, ${error.b}, times: ${error.i}`);
  }).then(() => {
    start();
  });
});
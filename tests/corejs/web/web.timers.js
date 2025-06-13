import { timeLimitedPromise } from '../helpers/helpers';

QUnit.asyncTest('setTimeout / clearTimeout', assert => {
  expect(1);
  timeLimitedPromise(1000, new Promise(resolve => {
    setTimeout((a, b) => { resolve(a + b); }, 30, 'a', 'b');
  })).then(it => {
    assert.strictEqual(it, 'ab', 'setTimeout works with additional args');
    start();
  }).catch(() => {
    assert.ok(false, 'setTimeout works with additional args');
    start();
  });

  timeLimitedPromise(1000, new Promise(resolve => {
    clearTimeout(setTimeout(resolve, 30));
  })).then(() => {
    assert.ok(false, 'clearImmediate works with wraped setTimeout');
    start();
  }).catch(() => {
    assert.ok(true, 'clearImmediate works with wraped setTimeout');
    start();
  });
});

QUnit.asyncTest('setInterval / clearInterval', assert => {
  expect(1);

  timeLimitedPromise(1000, new Promise((resolve, reject) => {
    let i = 0;
    const interval = setInterval((a, b) => {
      if(a + b !== 'ab' || i > 2) reject({ a, b, i });
      if(i++ === 2) {
        clearInterval(interval);
        setTimeout(resolve, 30);
      }
    }, 5, 'a', 'b');
  })).then(() => {
    assert.ok(true, 'setInterval & clearInterval works with additional args');
  }).catch(error => {
    if(!error) error = {};
    assert.ok(false, `setInterval & clearInterval works with additional args: ${error.a}, ${error.b}, times: ${error.i}`);
  }).then(() => {
    start();
  });
});

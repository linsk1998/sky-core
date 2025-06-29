import { DESCRIPTORS } from '../helpers/constants';

const { hasOwnProperty } = Object.prototype;

QUnit.test('URL constructor', assert => {
  assert.isFunction(URL);
  assert.arity(URL, 1);
  // assert.name(URL, 'URL');
  assert.looksNative(URL);

  assert.same(new URL('http://www.domain.com/a/b').href, 'http://www.domain.com/a/b');
  assert.same(new URL('/c/d', 'http://www.domain.com/a/b').href, 'http://www.domain.com/c/d');
  assert.same(new URL('b/c', 'http://www.domain.com/a/b').href, 'http://www.domain.com/a/b/c');
  assert.same(new URL('b/c', new URL('http://www.domain.com/a/b')).href, 'http://www.domain.com/a/b/c');
  assert.same(new URL({ toString: () => 'https://example.org/' }).href, 'https://example.org/');

  assert.same(new URL('nonspecial://example.com/').href, 'nonspecial://example.com/');

  // assert.same(new URL('https://測試').href, 'https://xn--g6w251d/', 'unicode parsing');
  // assert.same(new URL('https://xxпривет.тест').href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
  // assert.same(new URL('https://xxПРИВЕТ.тест').href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
  assert.same(new URL('http://example.com/', 'https://example.org/').href, 'http://example.com/');
  assert.same(new URL('https://example.com/', 'https://example.org/').href, 'https://example.com/');
  assert.same(new URL('nonspecial://Example.com/', 'https://example.org/').href, 'nonspecial://Example.com/');
  // assert.same(new URL('http:Example.com/', 'https://example.org/').href, 'http://example.com/');
  // assert.same(new URL('https:Example.com/', 'https://example.org/').href, 'https://example.org/Example.com/');
  // assert.same(new URL('nonspecial:Example.com/', 'https://example.org/').href, 'nonspecial:Example.com/');

  // assert.same(new URL('http://0300.168.0xF0').href, 'http://192.168.0.240/');
  // assert.same(new URL('http://[20:0:0:1:0:0:0:ff]').href, 'http://[20:0:0:1::ff]/');
  // assert.same(new URL('http://257.168.0xF0').href, 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // TypeError in Chrome and Safari
  // assert.same(new URL('http://0300.168.0xG0').href, 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');

  assert.same(new URL('file:///var/log/system.log').href, 'file:///var/log/system.log', 'file scheme');
  // assert.same(new URL('file://nnsc.nsf.net/bar/baz').href, 'file://nnsc.nsf.net/bar/baz', 'file scheme'); // 'file:///bar/baz' in FF
  // assert.same(new URL('file://localhost/bar/baz').href, 'file:///bar/baz', 'file scheme'); // 'file://localhost/bar/baz' in Chrome

  assert.throws(() => new URL(), 'TypeError: Failed to construct \'URL\': 1 argument required, but only 0 present.');
  // assert.throws(() => new URL(''), 'TypeError: Failed to construct \'URL\': Invalid URL');
  // assert.throws(() => new URL('', 'about:blank'), 'TypeError: Failed to construct \'URL\': Invalid URL');
  assert.throws(() => new URL('abc'), 'TypeError: Failed to construct \'URL\': Invalid URL');
  assert.throws(() => new URL('//abc'), 'TypeError: Failed to construct \'URL\': Invalid URL');
  assert.throws(() => new URL('http:///www.domain.com/', 'abc'), 'TypeError: Failed to construct \'URL\': Invalid base URL');
  assert.throws(() => new URL('http:///www.domain.com/', null), 'TypeError: Failed to construct \'URL\': Invalid base URL');
  assert.throws(() => new URL('//abc', null), 'TypeError: Failed to construct \'URL\': Invalid base URL');
  // assert.throws(() => new URL('http://[20:0:0:1:0:0:0:ff'), 'incorrect IPv6');
  // assert.throws(() => new URL('http://[20:0:0:1:0:0:0:fg]'), 'incorrect IPv6');
  // assert.throws(() => new URL('http://a%b'), 'forbidden host code point'); // no error in FF
  // assert.throws(() => new URL('1http://zloirock.ru'), 'incorrect scheme');
});

QUnit.test('URL#href', assert => {
  let url = new URL('http://zloirock.ru/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'href'));
  //   // const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'href');
  //   // assert.same(descriptor.enumerable, true);
  //   // // assert.same(descriptor.configurable, true);
  //   // assert.same(typeof descriptor.get, 'function');
  //   // assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.href, 'http://zloirock.ru/');

  if(DESCRIPTORS) {
    url.searchParams.append('foo', 'bar');
    assert.same(url.href, 'http://zloirock.ru/?foo=bar');

    // url = new URL('http://zloirock.ru/foo');
    // url.href = 'https://測試';
    // assert.same(url.href, 'https://xn--g6w251d/', 'unicode parsing');
    // assert.same(url.href, 'https://xn--g6w251d/', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.href = 'https://xxпривет.тест';
    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.href = 'https://xxПРИВЕТ.тест';
    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');
    // assert.same(url.href, 'https://xn--xx-flcmn5bht.xn--e1aybc/', 'unicode parsing');

    // url = new URL('http://zloirock.ru/');
    // url.href = 'http://0300.168.0xF0';
    // assert.same(url.href, 'http://192.168.0.240/');
    // assert.same(url.href, 'http://192.168.0.240/');

    // url = new URL('http://zloirock.ru/');
    // url.href = 'http://[20:0:0:1:0:0:0:ff]';
    // assert.same(url.href, 'http://[20:0:0:1::ff]/');
    // assert.same(url.href, 'http://[20:0:0:1::ff]/');

    // url = new URL('http://zloirock.ru/');
    // url.href = 'http://257.168.0xF0'; // TypeError and Safari
    // assert.same(url.href, 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // `F` instead of `f` in Chrome
    // assert.same(url.href, 'http://257.168.0xf0/', 'incorrect IPv4 parsed as host'); // `F` instead of `f` in Chrome

    // url = new URL('http://zloirock.ru/');
    // url.href = 'http://0300.168.0xG0';
    // assert.same(url.href, 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');
    // assert.same(url.href, 'http://0300.168.0xg0/', 'incorrect IPv4 parsed as host');

    url = new URL('http://192.168.0.240/');
    url.href = 'file:///var/log/system.log';
    assert.same(url.href, 'file:///var/log/system.log', 'file -> ip');
    assert.same(url.href, 'file:///var/log/system.log', 'file -> ip');

    // url = new URL('file:///var/log/system.log');
    // url.href = 'http://0300.168.0xF0';
    // assert.same(url.href, 'http://192.168.0.240/', 'file -> http');
    // assert.same(url.href, 'http://192.168.0.240/', 'file -> http');

    // assert.throws(() => new URL('http://zloirock.ru/').href = undefined, 'incorrect URL'); // no error in Chrome
    // assert.throws(() => new URL('http://zloirock.ru/').href = '', 'incorrect URL'); // no error in Chrome
    // assert.throws(() => new URL('http://zloirock.ru/').href = 'abc', 'incorrect URL'); // no error in Chrome
    // assert.throws(() => new URL('http://zloirock.ru/').href = '//abc', 'incorrect URL'); // no error in Chrome
    // assert.throws(() => new URL('http://zloirock.ru/').href = 'http://[20:0:0:1:0:0:0:ff', 'incorrect IPv6'); // no error in Chrome
    // assert.throws(() => new URL('http://zloirock.ru/').href = 'http://[20:0:0:1:0:0:0:fg]', 'incorrect IPv6'); // no error in Chrome
    // assert.throws(() => new URL('http://zloirock.ru/').href = 'http://a%b', 'forbidden host code point'); // no error in Chrome and FF
    // assert.throws(() => new URL('http://zloirock.ru/').href = '1http://zloirock.ru', 'incorrect scheme'); // no error in Chrome
  }
});

QUnit.test('URL#origin', assert => {
  const url = new URL('http://es6.zloirock.ru/tests.html');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'origin'));
  //   // const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'origin');
  //   // assert.same(descriptor.enumerable, true);
  //   // // assert.same(descriptor.configurable, true);
  //   // assert.same(typeof descriptor.get, 'function');
  // }

  assert.same(url.origin, 'http://es6.zloirock.ru');

  // assert.same(new URL('https://測試/tests').origin, 'https://xn--g6w251d');
});

QUnit.test('URL#protocol', assert => {
  let url = new URL('http://zloirock.ru/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'protocol'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'protocol');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.protocol, 'http:');

  if(DESCRIPTORS) {
    // url = new URL('http://zloirock.ru/');
    // url.protocol = 'https';
    // assert.same(url.protocol, 'https:');
    // assert.same(url.href, 'https://zloirock.ru/');

    // https://nodejs.org/api/url.html#url_special_schemes
    // url = new URL('http://zloirock.ru/');
    // url.protocol = 'fish';
    // assert.same(url.protocol, 'http:');
    // assert.same(url.href, 'http://zloirock.ru/');
    // assert.same(url.href, 'http://zloirock.ru/');

    // url = new URL('http://zloirock.ru/');
    // url.protocol = '1http';
    // assert.same(url.protocol, 'http:');
    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect scheme');
    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect scheme');
  }
});

QUnit.test('URL#username', assert => {
  let url = new URL('http://zloirock.ru/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'username'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'username');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.username, '');

  url = new URL('http://username@zloirock.ru/');
  assert.same(url.username, 'username');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru/');
    url.username = 'username';
    assert.same(url.username, 'username');
    assert.same(url.href, 'http://username@zloirock.ru/');
  }
});

QUnit.test('URL#password', assert => {
  let url = new URL('http://zloirock.ru/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'password'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'password');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.password, '');

  url = new URL('http://username:password@zloirock.ru/');
  assert.same(url.password, 'password');

  // url = new URL('http://:password@zloirock.ru/'); // TypeError in FF
  // assert.same(url.password, 'password');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru/');
    url.username = 'username';
    url.password = 'password';
    assert.same(url.password, 'password');
    assert.same(url.href, 'http://username:password@zloirock.ru/');

    // url = new URL('http://zloirock.ru/');
    // url.password = 'password';
    // assert.same(url.password, 'password'); // '' in FF
    // assert.same(url.href, 'http://:password@zloirock.ru/'); // 'http://zloirock.ru/' in FF
  }
});

QUnit.test('URL#host', assert => {
  let url = new URL('http://zloirock.ru:81/path');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'host'));
  //   // const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'host');
  //   // assert.same(descriptor.enumerable, true);
  //   // // assert.same(descriptor.configurable, true);
  //   // assert.same(typeof descriptor.get, 'function');
  //   // assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.host, 'zloirock.ru:81');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru:81/path');
    url.host = 'example.com:82';
    assert.same(url.host, 'example.com:82');
    assert.same(url.href, 'http://example.com:82/path');

    // url = new URL('http://zloirock.ru:81/path');
    // url.host = 'other?domain.com';
    // assert.same(url.href, 'http://other:81/path'); // 'http://other/?domain.com/path' in Safari

    url = new URL('https://www.mydomain.com:8080/path/');
    url.host = 'www.otherdomain.com:80';
    assert.same(url.href, 'https://www.otherdomain.com:80/path/', 'set default port for another protocol');

    // url = new URL('https://www.mydomain.com:8080/path/');
    // url.host = 'www.otherdomain.com:443';
    // assert.same(url.href, 'https://www.otherdomain.com/path/', 'set default port');

    // url = new URL('http://zloirock.ru/foo');
    // url.host = '測試';
    // assert.same(url.host, 'xn--g6w251d', 'unicode parsing');
    // assert.same(url.href, 'http://xn--g6w251d/foo', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.host = 'xxпривет.тест';
    // assert.same(url.host, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.host = 'xxПРИВЕТ.тест';
    // assert.same(url.host, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.host = '0300.168.0xF0';
    // assert.same(url.host, '192.168.0.240');
    // assert.same(url.href, 'http://192.168.0.240/foo');

    // url = new URL('http://zloirock.ru/foo');
    // url.host = '[20:0:0:1:0:0:0:ff]';
    // assert.same(url.host, '[20:0:0:1::ff]'); // ':0' in Chrome, 'zloirock.ru' in Safari
    // assert.same(url.href, 'http://[20:0:0:1::ff]/foo'); // 'http://[20:0/foo' in Chrome, 'http://zloirock.ru/foo' in Safari

    // url = new URL('file:///var/log/system.log');
    // url.host = 'nnsc.nsf.net'; // does not work in FF
    // assert.same(url.hostname, 'nnsc.nsf.net', 'file');
    // assert.same(url.href, 'file://nnsc.nsf.net/var/log/system.log', 'file');

    // url = new URL('http://zloirock.ru/');
    // url.host = '[20:0:0:1:0:0:0:ff';
    // assert.same(url.host, 'zloirock.ru', 'incorrect IPv6'); // ':0' in Chrome
    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0/' in Chrome

    // url = new URL('http://zloirock.ru/');
    // url.host = '[20:0:0:1:0:0:0:fg]';
    // assert.same(url.host, 'zloirock.ru', 'incorrect IPv6'); // ':0' in Chrome
    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0/' in Chrome

    // url = new URL('http://zloirock.ru/');
    // url.host = 'a%b';
    // assert.same(url.host, 'zloirock.ru', 'forbidden host code point'); // '' in Chrome, 'a%b' in FF
    // assert.same(url.href, 'http://zloirock.ru/', 'forbidden host code point'); // 'http://a%25b/' in Chrome, 'http://a%b/' in FF
  }
});

QUnit.test('URL#hostname', assert => {
  let url = new URL('http://zloirock.ru:81/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'hostname'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'hostname');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.hostname, 'zloirock.ru');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru:81/');
    url.hostname = 'example.com';
    assert.same(url.hostname, 'example.com');
    assert.same(url.href, 'http://example.com:81/');

    // url = new URL('http://zloirock.ru:81/');
    // url.hostname = 'example.com:82';
    // assert.same(url.hostname, 'example.com'); // '' in Chrome
    // assert.same(url.href, 'http://example.com:81/'); // 'ttp://example.com:82:81/' in Chrome

    // url = new URL('http://zloirock.ru/foo');
    // url.hostname = '測試';
    // assert.same(url.hostname, 'xn--g6w251d', 'unicode parsing');
    // assert.same(url.href, 'http://xn--g6w251d/foo', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.hostname = 'xxпривет.тест';
    // assert.same(url.hostname, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.hostname = 'xxПРИВЕТ.тест';
    // assert.same(url.hostname, 'xn--xx-flcmn5bht.xn--e1aybc', 'unicode parsing');
    // assert.same(url.href, 'http://xn--xx-flcmn5bht.xn--e1aybc/foo', 'unicode parsing');

    // url = new URL('http://zloirock.ru/foo');
    // url.hostname = '0300.168.0xF0';
    // assert.same(url.hostname, '192.168.0.240');
    // assert.same(url.href, 'http://192.168.0.240/foo');

    // url = new URL('http://zloirock.ru/foo');
    // url.hostname = '[20:0:0:1:0:0:0:ff]';
    // assert.same(url.hostname, '[20:0:0:1::ff]'); // 'zloirock.ru' in Safari
    // assert.same(url.href, 'http://[20:0:0:1::ff]/foo'); // 'http://zloirock.ru/foo' in Safari

    // url = new URL('file:///var/log/system.log');
    // url.hostname = 'nnsc.nsf.net'; // does not work in FF
    // assert.same(url.hostname, 'nnsc.nsf.net', 'file');
    // assert.same(url.href, 'file://nnsc.nsf.net/var/log/system.log', 'file');

    // url = new URL('http://zloirock.ru/');
    // url.hostname = '[20:0:0:1:0:0:0:ff';
    // assert.same(url.hostname, 'zloirock.ru', 'incorrect IPv6'); // '' in Chrome
    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0:0:1:0:0:0:ff' in Chrome

    // url = new URL('http://zloirock.ru/');
    // url.hostname = '[20:0:0:1:0:0:0:fg]';
    // assert.same(url.hostname, 'zloirock.ru', 'incorrect IPv6'); // '' in Chrome
    // assert.same(url.href, 'http://zloirock.ru/', 'incorrect IPv6'); // 'http://[20:0:0:1:0:0:0:ff/' in Chrome

    // url = new URL('http://zloirock.ru/');
    // url.hostname = 'a%b';
    // assert.same(url.hostname, 'zloirock.ru', 'forbidden host code point'); // '' in Chrome, 'a%b' in FF
    // assert.same(url.href, 'http://zloirock.ru/', 'forbidden host code point'); // 'http://a%25b/' in Chrome, 'http://a%b/' in FF
  }
});

QUnit.test('URL#port', assert => {
  let url = new URL('http://zloirock.ru:1337/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'port'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'port');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.port, '1337');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru/');
    url.port = '';
    assert.same(url.port, '');
    assert.same(url.href, 'http://zloirock.ru/');
    url.port = '1337';
    assert.same(url.port, '1337');
    assert.same(url.href, 'http://zloirock.ru:1337/');
    // url.port = 'abcd';
    // assert.same(url.port, '1337'); // '0' in Chrome
    // assert.same(url.href, 'http://zloirock.ru:1337/'); // 'http://zloirock.ru:0/' in Chrome
    // url.port = '5678abcd';
    // assert.same(url.port, '5678'); // '1337' in FF
    // assert.same(url.href, 'http://zloirock.ru:5678/'); // 'http://zloirock.ru:1337/"' in FF
    url.port = '1234';
    assert.same(url.port, '1234');
    assert.same(url.href, 'http://zloirock.ru:1234/');
    // url.port = 1e10;
    // assert.same(url.port, '1234'); // '0' in Chrome
    // assert.same(url.href, 'http://zloirock.ru:1234/'); // 'http://zloirock.ru:0/' in Chrome
  }
});

QUnit.test('URL#pathname', assert => {
  let url = new URL('http://zloirock.ru/foo/bar');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'pathname'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'pathname');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.pathname, '/foo/bar');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru/');
    url.pathname = '/bar/baz';
    assert.same(url.pathname, '/bar/baz');
    assert.same(url.href, 'http://zloirock.ru/bar/baz');
  }
});

QUnit.test('URL#search', assert => {
  let url = new URL('http://zloirock.ru/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'search'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'search');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.search, '');

  url = new URL('http://zloirock.ru/?foo=bar');
  assert.same(url.search, '?foo=bar');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru/?');
    // assert.same(url.search, '');
    assert.same(url.href, 'http://zloirock.ru/?');
    url.search = '?foo=bar';
    assert.same(url.search, '?foo=bar');
    assert.same(url.href, 'http://zloirock.ru/?foo=bar');
    url.search = '?bar=baz';
    assert.same(url.search, '?bar=baz');
    assert.same(url.href, 'http://zloirock.ru/?bar=baz');
    url.search = '';
    assert.same(url.search, '');
    assert.same(url.href, 'http://zloirock.ru/');
  }
});

QUnit.test('URL#searchParams', assert => {
  let url = new URL('http://zloirock.ru/?foo=bar&bar=baz');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'searchParams'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'searchParams');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  // }

  assert.ok(url.searchParams instanceof URLSearchParams);
  assert.same(url.searchParams.get('foo'), 'bar');
  assert.same(url.searchParams.get('bar'), 'baz');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru/');
    url.searchParams.append('foo', 'bar');
    assert.same(url.href, 'http://zloirock.ru/?foo=bar');

    url = new URL('http://zloirock.ru/');
    url.search = 'foo=bar';
    assert.same(url.searchParams.get('foo'), 'bar');

    url = new URL('http://zloirock.ru/?foo=bar&bar=baz');
    url.search = '';
    assert.same(url.searchParams.has('foo'), false);
  }
});

QUnit.test('URL#hash', assert => {
  let url = new URL('http://zloirock.ru/');

  // if(DESCRIPTORS) {
  //   assert.ok(!hasOwnProperty.call(url, 'hash'));
  //   const descriptor = Object.getOwnPropertyDescriptor(URL.prototype, 'hash');
  //   assert.same(descriptor.enumerable, true);
  //   // assert.same(descriptor.configurable, true);
  //   assert.same(typeof descriptor.get, 'function');
  //   assert.same(typeof descriptor.set, 'function');
  // }

  assert.same(url.hash, '');

  url = new URL('http://zloirock.ru/#foo');
  assert.same(url.hash, '#foo');

  url = new URL('http://zloirock.ru/#');
  // assert.same(url.hash, '');
  assert.same(url.href, 'http://zloirock.ru/#');

  if(DESCRIPTORS) {
    url = new URL('http://zloirock.ru/#');
    url.hash = '#foo';
    assert.same(url.hash, '#foo');
    assert.same(url.href, 'http://zloirock.ru/#foo');
    url.hash = '';
    assert.same(url.hash, '');
    assert.same(url.href, 'http://zloirock.ru/');
    // url.hash = '#';
    // assert.same(url.hash, '');
    // assert.same(url.href, 'http://zloirock.ru/'); // 'http://zloirock.ru/#' in FF
    url.hash = '#foo';
    assert.same(url.hash, '#foo');
    assert.same(url.href, 'http://zloirock.ru/#foo');
    url.hash = '#foo#bar';
    assert.same(url.hash, '#foo#bar');
    assert.same(url.href, 'http://zloirock.ru/#foo#bar');

    // url = new URL('http://zloirock.ru/');
    // url.hash = 'абa';
    // assert.same(url.hash, '#%D0%B0%D0%B1a');

    // url = new URL('http://zloirock.ru/');
    // url.hash = '\udc01\ud802a';
    // assert.same(url.hash, '#%EF%BF%BD%EF%BF%BDa', 'unmatched surrogates');
  }
});

QUnit.test('URL#toJSON', assert => {
  const { toJSON } = URL.prototype;
  assert.isFunction(toJSON);
  assert.arity(toJSON, 0);
  // assert.name(toJSON, 'toJSON');
  assert.enumerable(URL.prototype, 'toJSON');
  assert.looksNative(toJSON);

  const url = new URL('http://zloirock.ru/');
  assert.same(url.toJSON(), 'http://zloirock.ru/');

  if(DESCRIPTORS) {
    url.searchParams.append('foo', 'bar');
    assert.same(url.toJSON(), 'http://zloirock.ru/?foo=bar');
  }
});

// QUnit.test('URL#toString', assert => {
//   const { toString } = URL.prototype;
//   assert.isFunction(toString);
//   assert.arity(toString, 0);
//   // assert.name(toString, 'toString');
//   // assert.enumerable(URL.prototype, 'toString');
//   assert.looksNative(toString);

//   const url = new URL('http://zloirock.ru/');
//   assert.same(url.toString(), 'http://zloirock.ru/');

//   if(DESCRIPTORS) {
//     url.searchParams.append('foo', 'bar');
//     assert.same(url.toString(), 'http://zloirock.ru/?foo=bar');
//   }
// });

// QUnit.test('URL#@@toStringTag', assert => {
//   const url = new URL('http://zloirock.ru/');
//   assert.same(({}).toString.call(url), '[object URL]');
// });

QUnit.test('URL.sham', assert => {
  assert.same(URL.sham, DESCRIPTORS ? undefined : true);
});

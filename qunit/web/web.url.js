QUnit.test('URL constructor', assert => {
  assert.isFunction(URL);
  assert.arity(URL, 1);
  assert.name(URL, 'URL');
  assert.looksNative(URL);

  assert.same(new URL('http://www.domain.com/a/b').toString(), 'http://www.domain.com/a/b');
  assert.same(new URL('/c/d', 'http://www.domain.com/a/b').toString(), 'http://www.domain.com/c/d');
  assert.same(new URL('b/c', 'http://www.domain.com/a/b').toString(), 'http://www.domain.com/a/b/c');
  assert.same(new URL('b/c', new URL('http://www.domain.com/a/b')).toString(), 'http://www.domain.com/a/b/c');
  assert.same(new URL({ toString: () => 'https://example.org/' }).toString(), 'https://example.org/');

  assert.same(new URL('nonspecial://example.com/').toString(), 'nonspecial://example.com/');

  assert.throws(() => new URL(), 'TypeError: Failed to construct \'URL\': 1 argument required, but only 0 present.');
  assert.throws(() => new URL(''), 'TypeError: Failed to construct \'URL\': Invalid URL');
  assert.throws(() => new URL('', 'about:blank'), 'TypeError: Failed to construct \'URL\': Invalid URL');
});
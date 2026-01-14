QUnit.test('web#AbortController', function(assert) {
	var e = new AbortController("test", "AbortError");
	assert.equal(e.name, "AbortError");

	assert.ok(e instanceof DOMException);
	assert.ok(e instanceof Error);
});
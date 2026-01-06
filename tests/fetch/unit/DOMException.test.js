QUnit.test('web#DOMException', function(assert) {
	var e = new DOMException("test", "AbortError");
	assert.same(e.name, "AbortError");

	assert.ok(e instanceof DOMException);
	assert.ok(e instanceof Error);
});
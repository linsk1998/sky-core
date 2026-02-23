QUnit.test('DOMException', function(assert) {
	var e = new DOMException("test", "AbortError");
	assert.equal(e.name, "AbortError");

	assert.ok(e instanceof DOMException);
	assert.ok(e instanceof Error);
});
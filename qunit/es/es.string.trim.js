import { STRICT } from '../helpers/constants';

QUnit.test('String#trim', assert => {
	const trim = String.prototype.trim;
	assert.isFunction(trim);
	assert.arity(trim, 0);
	assert.name(trim, 'trim');
	assert.strictEqual(' \n  q w e \n  '.trim(), 'q w e', 'removes whitespaces at left & right side of string');
	assert.strictEqual("\u0009".trim(), '', '\\u0009');
	assert.strictEqual("\u000A".trim(), '', '\\u000A');
	assert.strictEqual("\u000B".trim(), '', '\\u000B');
	assert.strictEqual("\u000C".trim(), '', '\\u000C');
	assert.strictEqual("\u000D".trim(), '', '\\u000D');
	assert.strictEqual("\u0020".trim(), '', '\\u0020');
	// assert.strictEqual("\u0085".trim(), '\u0085', "\\u0085 shouldn't remove");
	assert.strictEqual("\u00A0".trim(), '', '\\u00A0');
	// assert.strictEqual("\u1680".trim(), '', '\\u1680');
	// assert.strictEqual("\u2000".trim(), '', '\\u2000');
	// assert.strictEqual("\u2001".trim(), '', '\\u2001');
	// assert.strictEqual("\u2002".trim(), '', '\\u2002');
	// assert.strictEqual("\u2003".trim(), '', '\\u2003');
	// assert.strictEqual("\u2004".trim(), '', '\\u2004');
	// assert.strictEqual("\u2005".trim(), '', '\\u2005');
	// assert.strictEqual("\u2006".trim(), '', '\\u2006');
	// assert.strictEqual("\u2007".trim(), '', '\\u2007');
	// assert.strictEqual("\u2008".trim(), '', '\\u2008');
	// assert.strictEqual("\u2009".trim(), '', '\\u2009');
	// assert.strictEqual("\u200A".trim(), '', '\\u200A');
	// assert.strictEqual("\u200B".trim(), '\u200B', "\\u200B shouldn't remove");
	// assert.strictEqual("\u2028".trim(), '', '\\u2028');
	// assert.strictEqual("\u2029".trim(), '', '\\u2029');
	// assert.strictEqual("\u202F".trim(), '', '\\u202F');
	// assert.strictEqual("\u205F".trim(), '', '\\u205F');
	assert.strictEqual("\u3000".trim(), '', '\\u3000');
	// assert.strictEqual("\uFEFF".trim(), '', '\\uFEFF');
	if(STRICT) {
		assert.throws(() => trim.call(null, 0), TypeError);
		assert.throws(() => trim.call(undefined, 0), TypeError);
	}
});

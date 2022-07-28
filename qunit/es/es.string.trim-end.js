import { STRICT, WHITESPACES } from '../helpers/constants';

// deprecated
// QUnit.test('String#trimRight', assert => {
// 	const { trimEnd, trimRight } = String.prototype;
// 	assert.same(trimEnd, trimRight, 'same #trimRight');
// });

QUnit.test('String#trimEnd', assert => {
	const trimEnd = String.prototype.trimEnd;
	assert.isFunction(trimEnd);
	assert.arity(trimEnd, 0);
	assert.name(trimEnd, 'trimEnd');
	assert.strictEqual(' \n  q w e \n  '.trimEnd(), ' \n  q w e', 'removes whitespaces at left & right side of string');
	assert.strictEqual("\u0009".trimEnd(), '', '\\u0009');
	assert.strictEqual("\u000A".trimEnd(), '', '\\u000A');
	assert.strictEqual("\u000B".trimEnd(), '', '\\u000B');
	assert.strictEqual("\u000C".trimEnd(), '', '\\u000C');
	assert.strictEqual("\u000D".trimEnd(), '', '\\u000D');
	assert.strictEqual("\u0020".trimEnd(), '', '\\u0020');
	// assert.strictEqual("\u0085".trimEnd(), '\u0085', "\\u0085 shouldn't remove");
	assert.strictEqual("\u00A0".trimEnd(), '', '\\u00A0');
	// assert.strictEqual("\u1680".trimEnd(), '', '\\u1680');
	// assert.strictEqual("\u2000".trimEnd(), '', '\\u2000');
	// assert.strictEqual("\u2001".trimEnd(), '', '\\u2001');
	// assert.strictEqual("\u2002".trimEnd(), '', '\\u2002');
	// assert.strictEqual("\u2003".trimEnd(), '', '\\u2003');
	// assert.strictEqual("\u2004".trimEnd(), '', '\\u2004');
	// assert.strictEqual("\u2005".trimEnd(), '', '\\u2005');
	// assert.strictEqual("\u2006".trimEnd(), '', '\\u2006');
	// assert.strictEqual("\u2007".trimEnd(), '', '\\u2007');
	// assert.strictEqual("\u2008".trimEnd(), '', '\\u2008');
	// assert.strictEqual("\u2009".trimEnd(), '', '\\u2009');
	// assert.strictEqual("\u200A".trimEnd(), '', '\\u200A');
	// assert.strictEqual("\u200B".trimEnd(), '\u200B', "\\u200B shouldn't remove");
	// assert.strictEqual("\u2028".trimEnd(), '', '\\u2028');
	// assert.strictEqual("\u2029".trimEnd(), '', '\\u2029');
	// assert.strictEqual("\u202F".trimEnd(), '', '\\u202F');
	// assert.strictEqual("\u205F".trimEnd(), '', '\\u205F');
	assert.strictEqual("\u3000".trimEnd(), '', '\\u3000');
	// assert.strictEqual("\uFEFF".trimEnd(), '', '\\uFEFF');
	if(STRICT) {
		assert.throws(() => trimEnd.call(null, 0), TypeError);
		assert.throws(() => trimEnd.call(undefined, 0), TypeError);
	}
});

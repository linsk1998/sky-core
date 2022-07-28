import { STRICT } from '../helpers/constants';

// deprecated
// QUnit.test('String#trimLeft', assert => {
// 	const { trimStart, trimLeft } = String.prototype;
// 	assert.same(trimStart, trimLeft, 'same #trimLeft');
// });

QUnit.test('String#trimStart', assert => {
	const trimStart = String.prototype.trimStart;
	assert.isFunction(trimStart);
	assert.arity(trimStart, 0);
	assert.name(trimStart, 'trimStart');
	assert.strictEqual(' \n  q w e \n  '.trimStart(), 'q w e \n  ', 'removes whitespaces at left & right side of string');
	assert.strictEqual("\u0009".trimStart(), '', '\\u0009');
	assert.strictEqual("\u000A".trimStart(), '', '\\u000A');
	assert.strictEqual("\u000B".trimStart(), '', '\\u000B');
	assert.strictEqual("\u000C".trimStart(), '', '\\u000C');
	assert.strictEqual("\u000D".trimStart(), '', '\\u000D');
	assert.strictEqual("\u0020".trimStart(), '', '\\u0020');
	// assert.strictEqual("\u0085".trimStart(), '\u0085', "\\u0085 shouldn't remove");
	assert.strictEqual("\u00A0".trimStart(), '', '\\u00A0');
	// assert.strictEqual("\u1680".trimStart(), '', '\\u1680');
	// assert.strictEqual("\u2000".trimStart(), '', '\\u2000');
	// assert.strictEqual("\u2001".trimStart(), '', '\\u2001');
	// assert.strictEqual("\u2002".trimStart(), '', '\\u2002');
	// assert.strictEqual("\u2003".trimStart(), '', '\\u2003');
	// assert.strictEqual("\u2004".trimStart(), '', '\\u2004');
	// assert.strictEqual("\u2005".trimStart(), '', '\\u2005');
	// assert.strictEqual("\u2006".trimStart(), '', '\\u2006');
	// assert.strictEqual("\u2007".trimStart(), '', '\\u2007');
	// assert.strictEqual("\u2008".trimStart(), '', '\\u2008');
	// assert.strictEqual("\u2009".trimStart(), '', '\\u2009');
	// assert.strictEqual("\u200A".trimStart(), '', '\\u200A');
	// assert.strictEqual("\u200B".trimStart(), '\u200B', "\\u200B shouldn't remove");
	// assert.strictEqual("\u2028".trimStart(), '', '\\u2028');
	// assert.strictEqual("\u2029".trimStart(), '', '\\u2029');
	// assert.strictEqual("\u202F".trimStart(), '', '\\u202F');
	// assert.strictEqual("\u205F".trimStart(), '', '\\u205F');
	assert.strictEqual("\u3000".trimStart(), '', '\\u3000');
	// assert.strictEqual("\uFEFF".trimStart(), '', '\\uFEFF');
	if(STRICT) {
		assert.throws(() => trimStart.call(null, 0), TypeError);
		assert.throws(() => trimStart.call(undefined, 0), TypeError);
	}
});

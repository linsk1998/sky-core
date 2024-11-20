import { STRICT } from '../helpers/constants';
import Symbol from "sky-core/pure/Symbol";

QUnit.test('String#isWellFormed', assert => {
	const isWellFormed = String.prototype.isWellFormed;
	assert.isFunction(isWellFormed);
	assert.arity(isWellFormed, 0);
	assert.name(isWellFormed, 'isWellFormed');
	assert.looksNative(isWellFormed);
	assert.nonEnumerable(String.prototype, 'isWellFormed');

	assert.ok(isWellFormed.call('a'), 'a');
	assert.ok(isWellFormed.call('abc'), 'abc');
	assert.ok(isWellFormed.call('💩'), '💩');
	assert.ok(isWellFormed.call('💩b'), '💩b');
	assert.ok(isWellFormed.call('a💩'), '💩');
	assert.ok(isWellFormed.call('a💩b'), 'a💩b');
	assert.ok(isWellFormed.call('💩a💩'), '💩a💩');
	assert.ok(!isWellFormed.call('\uD83D'), '\uD83D');
	assert.ok(!isWellFormed.call('\uDCA9'), '\uDCA9');
	assert.ok(!isWellFormed.call('\uDCA9\uD83D'), '\uDCA9\uD83D');
	assert.ok(!isWellFormed.call('a\uD83D'), 'a\uD83D');
	assert.ok(!isWellFormed.call('\uDCA9a'), '\uDCA9a');
	assert.ok(!isWellFormed.call('a\uD83Da'), 'a\uD83Da');
	assert.ok(!isWellFormed.call('a\uDCA9a'), 'a\uDCA9a');

	assert.ok(isWellFormed.call({
		toString() {
			return 'abc';
		},
	}), 'conversion #1');

	assert.ok(!isWellFormed.call({
		toString() {
			return '\uD83D';
		},
	}), 'conversion #2');

	if(STRICT) {
		assert.throws(() => isWellFormed.call(null), TypeError, 'coercible #1');
		assert.throws(() => isWellFormed.call(undefined), TypeError, 'coercible #2');
	}

	assert.throws(() => isWellFormed.call(Symbol('isWellFormed test')), 'throws on symbol context');
});
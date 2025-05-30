import { STRICT } from '../helpers/constants.js';

QUnit.test('String#at', assert => {
	const at = String.prototype.at;
	assert.isFunction(at);
	assert.arity(at, 1);
	assert.name(at, 'at');
	assert.looksNative(at);
	assert.nonEnumerable(String.prototype, 'at');
	assert.same('1', '123'.at(0));
	assert.same('2', '123'.at(1));
	assert.same('3', '123'.at(2));
	assert.same(undefined, '123'.at(3));
	assert.same('3', '123'.at(-1));
	assert.same('2', '123'.at(-2));
	assert.same('1', '123'.at(-3));
	assert.same(undefined, '123'.at(-4));
	assert.same('1', '123'.at(0.4));
	assert.same('1', '123'.at(0.5));
	assert.same('1', '123'.at(0.6));
	assert.same('1', '1'.at(NaN));
	assert.same('1', '1'.at());
	assert.same('1', '123'.at(-0));
	// TODO: disabled by default because of the conflict with old proposal
	// assert.same('\uD842', '𠮷'.at());
	// assert.same('1', at.call({ toString() { return '123'; } }, 0));

	// assert.throws(() => at.call(Symbol('at-alternative test'), 0), 'throws on symbol context');

	if(STRICT) {
		assert.throws(() => at.call(null, 0), TypeError);
		assert.throws(() => at.call(undefined, 0), TypeError);
	}
});
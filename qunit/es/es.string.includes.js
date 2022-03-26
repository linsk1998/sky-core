import { STRICT } from '../helpers/constants';

QUnit.test('String#includes', assert => {
	const { includes } = String.prototype;
	assert.isFunction(includes);
	assert.arity(includes, 1);
	assert.name(includes, 'includes');
	assert.ok(!'abc'.includes());
	assert.ok('aundefinedb'.includes());
	assert.ok('abcd'.includes('b', 1));
	assert.ok(!'abcd'.includes('b', 2));
	if(STRICT) {
		assert.throws(() => includes.call(null, '.'), TypeError);
		assert.throws(() => includes.call(undefined, '.'), TypeError);
	}
	const regexp = /./;
	assert.throws(() => '/./'.includes(regexp), TypeError);
	const object = {};
	assert.notThrows(() => '[object Object]'.includes(object));
});

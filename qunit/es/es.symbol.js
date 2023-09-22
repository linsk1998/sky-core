import { DESCRIPTORS, GLOBAL, NATIVE } from '../helpers/constants';

const { ownKeys } = GLOBAL.Reflect || {};

QUnit.test('Symbol', assert => {
	assert.isFunction(Symbol);
	if(NATIVE) assert.strictEqual(Symbol.length, 0, 'arity is 0');
	assert.name(Symbol, 'Symbol');
	const symbol1 = Symbol('symbol');
	const symbol2 = Symbol('symbol');
	assert.ok(symbol1 !== symbol2, 'Symbol("symbol") !== Symbol("symbol")');
	const object = {};
	object[symbol1] = 42;
	assert.ok(object[symbol1] === 42, 'Symbol() work as key');
	assert.ok(object[symbol2] !== 42, 'Various symbols from one description are various keys');
	if(DESCRIPTORS) {
		let count = 0;
		// eslint-disable-next-line no-unused-vars -- required for testing
		for(const key in object) count++;
		assert.ok(count === 0, 'object[Symbol()] is not enumerable');
	}
});

QUnit.test('Well-known Symbols', assert => {
	assert.ok(Symbol.hasInstance, `Symbol.hasInstance available`);
	assert.ok(Symbol.iterator, `Symbol.iterator available`);
	assert.ok(Symbol.asyncIterator, `Symbol.asyncIterator available`);
});

QUnit.test('Global symbol registry', assert => {
	assert.isFunction(Symbol.for, 'Symbol.for is function');
	assert.strictEqual(Symbol.for.length, 1, 'Symbol.for arity is 1');
	if(NATIVE) assert.strictEqual(Symbol.for.name, 'for', 'Symbol.for.name is "for"');
	assert.isFunction(Symbol.keyFor, 'Symbol.keyFor is function');
	assert.strictEqual(Symbol.keyFor.length, 1, 'Symbol.keyFor arity is 1');
	assert.name(Symbol.keyFor, 'keyFor');
	const symbol = Symbol.for('foo');
	assert.strictEqual(Symbol.for('foo'), symbol);
	assert.strictEqual(Symbol.keyFor(symbol), 'foo');
	assert.throws(() => Symbol.keyFor('foo'), 'throws on non-symbol');
});

QUnit.test('Object.getOwnPropertySymbols', assert => {
	assert.isFunction(Object.getOwnPropertySymbols);
	assert.strictEqual(Object.getOwnPropertySymbols.length, 1, 'arity is 1');
	assert.name(Object.getOwnPropertySymbols, 'getOwnPropertySymbols');
	const prototype = { q: 1, w: 2, e: 3 };
	prototype[Symbol()] = 42;
	prototype[Symbol()] = 43;
	assert.deepEqual(Object.getOwnPropertyNames(prototype).sort(), ['e', 'q', 'w']);
	assert.strictEqual(Object.getOwnPropertySymbols(prototype).length, 2);
	const object = Object.create(prototype);
	object.a = 1;
	object.s = 2;
	object.d = 3;
	object[Symbol()] = 44;
	assert.deepEqual(Object.getOwnPropertyNames(object).sort(), ['a', 'd', 's']);
	assert.strictEqual(Object.getOwnPropertySymbols(object).length, 1);
	// assert.strictEqual(Object.getOwnPropertySymbols(Object.prototype).length, 0);
	const primitives = [42, 'foo', false];
	for(const value of primitives) {
		assert.notThrows(() => Object.getOwnPropertySymbols(value), `accept ${typeof value}`);
	}
});

if(JSON) {
	QUnit.test('Symbols & JSON.stringify', assert => {
		assert.strictEqual(JSON.stringify([
			1,
			Symbol('foo'),
			false,
			Symbol('bar'),
			{},
		]), '[1,null,false,null,{}]', 'array value');
		assert.strictEqual(JSON.stringify({
			symbol: Symbol('symbol'),
		}), '{}', 'object value');
		if(DESCRIPTORS) {
			const object = { bar: 2 };
			object[Symbol('symbol')] = 1;
			assert.strictEqual(JSON.stringify(object), '{"bar":2}', 'object key');
		}
		// assert.strictEqual(JSON.stringify(Symbol('symbol')), undefined, 'symbol value');
		if(typeof Symbol() === 'symbol') {
			assert.strictEqual(JSON.stringify(Object(Symbol('symbol'))), '{}', 'boxed symbol');
		}
		// assert.strictEqual(JSON.stringify(undefined, () => 42), '42', 'replacer works with top-level undefined');
	});
}

if(DESCRIPTORS) {
	QUnit.test('Symbols & descriptors', assert => {
		const d = Symbol('d');
		const e = Symbol('e');
		const f = Symbol('f');
		const i = Symbol('i');
		const j = Symbol('j');
		const prototype = { g: 'g' };
		prototype[i] = 'i';
		Object.defineProperty(prototype, 'h', {
			value: 'h',
		});
		Object.defineProperty(prototype, 'j', {
			value: 'j',
		});
		const object = Object.create(prototype);
		object.a = 'a';
		object[d] = 'd';
		Object.defineProperty(object, 'b', {
			value: 'b',
		});
		Object.defineProperty(object, 'c', {
			value: 'c',
			enumerable: true,
		});
		Object.defineProperty(object, e, {
			configurable: true,
			writable: true,
			value: 'e',
		});
		const descriptor = {
			value: 'f',
			enumerable: true,
		};
		Object.defineProperty(object, f, descriptor);
		assert.strictEqual(descriptor.enumerable, true, 'defineProperty not changes descriptor object');
		assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'a'), {
			configurable: true,
			writable: true,
			enumerable: true,
			value: 'a',
		}, 'getOwnPropertyDescriptor a');
		assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'b'), {
			configurable: false,
			writable: false,
			enumerable: false,
			value: 'b',
		}, 'getOwnPropertyDescriptor b');
		assert.deepEqual(Object.getOwnPropertyDescriptor(object, 'c'), {
			configurable: false,
			writable: false,
			enumerable: true,
			value: 'c',
		}, 'getOwnPropertyDescriptor c');
		// assert.deepEqual(Object.getOwnPropertyDescriptor(object, d), {
		// 	configurable: true,
		// 	writable: true,
		// 	enumerable: true,
		// 	value: 'd',
		// }, 'getOwnPropertyDescriptor d');
		assert.deepEqual(Object.getOwnPropertyDescriptor(object, e), {
			configurable: true,
			writable: true,
			enumerable: false,
			value: 'e',
		}, 'getOwnPropertyDescriptor e');
		assert.deepEqual(Object.getOwnPropertyDescriptor(object, f), {
			configurable: false,
			writable: false,
			enumerable: true,
			value: 'f',
		}, 'getOwnPropertyDescriptor f');
		assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'g'), undefined, 'getOwnPropertyDescriptor g');
		assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'h'), undefined, 'getOwnPropertyDescriptor h');
		assert.strictEqual(Object.getOwnPropertyDescriptor(object, i), undefined, 'getOwnPropertyDescriptor i');
		assert.strictEqual(Object.getOwnPropertyDescriptor(object, j), undefined, 'getOwnPropertyDescriptor j');
		assert.strictEqual(Object.getOwnPropertyDescriptor(object, 'k'), undefined, 'getOwnPropertyDescriptor k');
		assert.strictEqual(Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable, false, 'getOwnPropertyDescriptor on Object.prototype');
		// assert.strictEqual(Object.getOwnPropertyDescriptor(Object.prototype, d), undefined, 'getOwnPropertyDescriptor on Object.prototype missed symbol');
		assert.strictEqual(Object.keys(object).length, 2, 'Object.keys');
		assert.strictEqual(Object.getOwnPropertyNames(object).length, 3, 'Object.getOwnPropertyNames');
		assert.strictEqual(Object.getOwnPropertySymbols(object).length, 3, 'Object.getOwnPropertySymbols');
		// assert.strictEqual(ownKeys(object).length, 6, 'Reflect.ownKeys');
		delete object[e];
		object[e] = 'e';
		// assert.deepEqual(Object.getOwnPropertyDescriptor(object, e), {
		// 	configurable: true,
		// 	writable: true,
		// 	enumerable: true,
		// 	value: 'e',
		// }, 'redefined non-enum key');
	});

	QUnit.test('Symbols & Object.defineProperties', assert => {
		const c = Symbol('c');
		const d = Symbol('d');
		const descriptors = {
			a: {
				configurable: true,
				writable: true,
				enumerable: true,
				value: 'a',
			},
		};
		descriptors[c] = {
			configurable: true,
			writable: true,
			enumerable: false,
			value: 'c',
		};
		Object.defineProperty(descriptors, 'b', {
			configurable: true,
			writable: true,
			enumerable: true,
			value: {
				configurable: true,
				writable: true,
				enumerable: true,
				value: 'b',
			},
		});
		Object.defineProperty(descriptors, d, {
			configurable: true,
			writable: true,
			enumerable: false,
			value: {
				configurable: true,
				writable: true,
				enumerable: false,
				value: 'd',
			},
		});
		const object = Object.defineProperties({}, descriptors);
		assert.strictEqual(object.a, 'a', 'a');
		// assert.strictEqual(object.b, undefined, 'b');
		// assert.strictEqual(object[c], 'c', 'c');
		assert.strictEqual(object[d], undefined, 'd');
	});

	QUnit.test('Symbols & Object.create', assert => {
		const c = Symbol('c');
		const d = Symbol('d');
		const descriptors = {
			a: {
				configurable: true,
				writable: true,
				enumerable: true,
				value: 'a',
			},
		};
		descriptors[c] = {
			configurable: true,
			writable: true,
			enumerable: false,
			value: 'c',
		};
		Object.defineProperty(descriptors, 'b', {
			configurable: true,
			writable: true,
			enumerable: true,
			value: {
				configurable: true,
				writable: true,
				enumerable: true,
				value: 'b',
			},
		});
		Object.defineProperty(descriptors, d, {
			configurable: true,
			writable: true,
			enumerable: false,
			value: {
				configurable: true,
				writable: true,
				enumerable: false,
				value: 'd',
			},
		});
		const object = Object.create(null, descriptors);
		assert.strictEqual(object.a, 'a', 'a');
		// assert.strictEqual(object.b, undefined, 'b');
		// assert.strictEqual(object[c], 'c', 'c');
		assert.strictEqual(object[d], undefined, 'd');
	});

	// const constructors = ['Map', 'Set', 'Promise'];
	// for(const name of constructors) {
	// 	QUnit.test(`${name}@@species`, assert => {
	// 		assert.strictEqual(GLOBAL[name][Symbol.species], GLOBAL[name], `${name}@@species === ${name}`);
	// 		const Subclass = create(GLOBAL[name]);
	// 		assert.strictEqual(Subclass[Symbol.species], Subclass, `${name} subclass`);
	// 	});
	// }

	// QUnit.test('Array@@species', assert => {
	// 	assert.strictEqual(Array[Symbol.species], Array, 'Array@@species === Array');
	// 	const Subclass = create(Array);
	// 	assert.strictEqual(Subclass[Symbol.species], Subclass, 'Array subclass');
	// });

	QUnit.test('Symbol.sham flag', assert => {
		assert.same(Symbol.sham, typeof Symbol() === 'symbol' ? undefined : true);
	});
}

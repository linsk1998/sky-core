
QUnit.test('Proxy', function(assert) {
	const p = new Proxy({
		a: undefined,
		b: undefined,
		c: undefined
	}, {
		get: function(obj, prop) {
			return prop != 'c' ? obj[prop] : 37;
		},
	});
	p.a = 1;
	p.b = undefined;

	assert.equal(p.a, 1);
	assert.equal(p.b, undefined);
	assert.equal('c' in p, true);
	assert.equal(p.c, 37);

	let target = {
		a: undefined
	};
	let p2 = new Proxy(target, {});

	p2.a = 37; // 操作转发到目标

	console.log(target.a);
	assert.equal(target.a, 37); // 操作已经被正确地转发

	let person = new Proxy({
		age: undefined
	}, {
		set: function(obj, prop, value) {
			if(prop === "age") {
				if(!Number.isInteger(value)) {
					throw new TypeError("The age is not an integer");
				}
				if(value > 200) {
					throw new RangeError("The age seems invalid");
				}
			}

			// The default behavior to store the value
			obj[prop] = value;

			// 表示成功
			return true;
		},
	});
	person.age = 100;
	assert.equal(person.age, 100);
	assert.throws(function() {
		person.age = "young";
	}, TypeError);
	assert.throws(function() {
		person.age = 300;
	}, RangeError);

	function extend(sup, base) {
		var descriptor = Object.getOwnPropertyDescriptor(
			base.prototype,
			"constructor"
		);
		base.prototype = Object.create(sup.prototype);
		var handler = {
			construct: function(target, args) {
				var obj = Object.create(base.prototype);
				this.apply(target, obj, args);
				return obj;
			},
			apply: function(target, that, args) {
				sup.apply(that, args);
				base.apply(that, args);
			}
		};
		var proxy = new Proxy(base, handler);
		descriptor.value = proxy;
		Object.defineProperty(base.prototype, "constructor", descriptor);
		return proxy;
	}

	let Person = function(name) {
		this.name = name;
	};

	let Boy = extend(Person, function(name, age) {
		this.age = age;
	});

	Boy.prototype.sex = "M";

	let Peter = new Boy("Peter", 13);
	assert.equal(Peter.sex, "M");
	assert.equal(Peter.name, "Peter");
	assert.equal(Peter.age, 13);

	let view = new Proxy(
		{
			selected: null,
		},
		{
			set: function(obj, prop, newval) {
				let oldval = obj[prop];

				if(prop === "selected") {
					if(oldval) {
						oldval.setAttribute("aria-selected", "false");
					}
					if(newval) {
						newval.setAttribute("aria-selected", "true");
					}
				}

				// 默认行为是存储被传入 setter 函数的属性值
				obj[prop] = newval;

				// 表示操作成功
				return true;
			},
		},
	);

	let i1 = (view.selected = document.getElementById("item-1"));
	assert.equal(i1.getAttribute("aria-selected"), "true");

	let i2 = (view.selected = document.getElementById("item-2"));
	assert.equal(i1.getAttribute("aria-selected"), "false");
	assert.equal(i2.getAttribute("aria-selected"), "true");

	let products = new Proxy(
		{
			latestBrowser: undefined,
			browsers: ["Internet Explorer", "Netscape"]
		},
		{
			get: function(obj, prop) {
				// 附加一个属性
				if(prop === "latestBrowser") {
					return obj.browsers[obj.browsers.length - 1];
				}

				// 默认行为是返回属性值
				return obj[prop];
			},
			set: function(obj, prop, value) {
				// 附加属性
				if(prop === "latestBrowser") {
					obj.browsers.push(value);
					return;
				}

				// 如果不是数组，则进行转换
				if(typeof value === "string") {
					value = [value];
				}

				// 默认行为是保存属性值
				obj[prop] = value;

				// 表示成功
				return true;
			},
		},
	);
	assert.deepEqual(products.browsers, ['Internet Explorer', 'Netscape']);
	products.browsers = "Firefox"; // 如果不小心传入了一个字符串
	assert.deepEqual(products.browsers, ['Firefox']); // <- 也没问题，得到的依旧是一个数组

	products.latestBrowser = "Chrome";
	assert.deepEqual(products.browsers, ['Firefox', 'Chrome']);
	assert.equal(products.latestBrowser, 'Chrome');
});

QUnit.test('Proxy#construct', function(assert) {
	function Cat() {

	}
	let PCat = new Proxy(Cat, {});
	assert.ok(Cat.prototype === PCat.prototype);

	function monster1(disposition) {
		this.disposition = disposition;
	}

	const handler1 = {
		construct(target, args) {
			console.log(`Creating a ${target.name}`);
			// Expected output: "Creating a monster1"
			return new target(...args);
		},
	};

	const proxy1 = new Proxy(monster1, handler1);

	assert.equal(new proxy1('fierce').disposition, "fierce");

	let p = new Proxy(function() { }, {
		construct: function(target, argumentsList, newTarget) {
			assert.equal(argumentsList.join(", "), "1");
			return { value: argumentsList[0] * 10 };
		},
	});

	assert.equal(new p(1).value, 10, "下面代码演示如何拦截 new 操作。");

	let p2 = new Proxy(function() { }, {
		construct: function(target, argumentsList, newTarget) {
			return 1;
		},
	});

	assert.throws(function() {
		new p2();
	}, TypeError, "下面的代码违反了约定。");

	let p3 = new Proxy(
		{},
		{
			construct: function(target, argumentsList, newTarget) {
				return {};
			},
		},
	);

	assert.throws(function() {
		new p3();
	}, TypeError, "下面的代码未能正确的初始化 Proxy。");
});


QUnit.test('Proxy#apply', function(assert) {
	function sum(a, b) {
		return a + b;
	}

	const handler = {
		apply: function(target, thisArg, argumentsList) {
			console.log(`Calculate sum: ${argumentsList}`);
			// Expected output: "Calculate sum: 1,2"

			return target(argumentsList[0], argumentsList[1]) * 10;
		},
	};

	const proxy1 = new Proxy(sum, handler);

	assert.equal(sum(1, 2), 3);
	assert.equal(proxy1(1, 2), 30);

	var p = new Proxy(function() { }, {
		apply: function(target, thisArg, argumentsList) {
			assert.equal(argumentsList.join(", "), "1, 2, 3");
			return argumentsList[0] + argumentsList[1] + argumentsList[2];
		},
	});

	assert.equal(p(1, 2, 3), 6);
});

QUnit.test('Proxy#get', function(assert) {
	const monster1 = {
		secret: 'easily scared',
		eyeCount: 4,
	};

	const handler1 = {
		get: function(target, prop, receiver) {
			if(prop === 'secret') {
				return `${target.secret.substring(0, 4)} ... shhhh!`;
			}
			return Reflect.get(...arguments);
		},
	};

	const proxy1 = new Proxy(monster1, handler1);

	assert.equal(proxy1.eyeCount, 4);
	// Expected output: 4

	assert.equal(proxy1.secret, "easi ... shhhh!");


	var p = new Proxy(
		{
			a: undefined
		},
		{
			get: function(target, prop, receiver) {
				assert.equal(prop, "a");
				return 10;
			},
		},
	);

	assert.equal(p.a, 10);
});

QUnit.test('Proxy#set', function(assert) {
	const monster1 = { eyeCount: 4 };

	const handler1 = {
		set(obj, prop, value) {
			if(prop === 'eyeCount' && value % 2 !== 0) {
				console.log('Monsters must have an even number of eyes');
			} else {
				return Reflect.set(...arguments);
			}
		},
	};

	const proxy1 = new Proxy(monster1, handler1);

	proxy1.eyeCount = 1;
	// Expected output: "Monsters must have an even number of eyes"

	assert.equal(proxy1.eyeCount, 4);

	proxy1.eyeCount = 2;
	assert.equal(proxy1.eyeCount, 2);

	const p = new Proxy(
		{
			a: undefined
		},
		{
			set(target, prop, value, receiver) {
				target[prop] = value;
				console.log(`property set: ${prop} = ${value}`);
				return true;
			},
		},
	);

	assert.ok("a" in p);

	p.a = 10; // "property set: a = 10"
	assert.ok("a" in p);
	assert.equal(p.a, 10);
});

QUnit.test('Proxy#revocable', function(assert) {
	var revocable = Proxy.revocable(
		{
			foo: undefined
		},
		{
			get(target, name) {
				return "[[" + name + "]]";
			},
		},
	);
	var proxy = revocable.proxy;
	assert.equal(proxy.foo, "[[foo]]");

	revocable.revoke();

	assert.throws(function() {
		proxy.foo;
	}, TypeError);
	assert.throws(function() {
		proxy.foo = 1;
	}, TypeError);
	assert.equal(typeof proxy, "object"); //因为 typeof 不属于可代理操作
});
QUnit.test('Proxy#array', function(assert) {
	var getTime = 0;
	var setTime = 0;
	var arr = new Proxy([1, 2, 3], {
		get: function(target, prop, receiver) {
			if(prop === 'length') {
				getTime++;
			}
			return Reflect.get(...arguments);
		},
		set: function(target, prop, value, receiver) {
			if(prop === 'length') {
				setTime++;
			}
			return Reflect.set(...arguments);
		},
	});
	assert.ok(arr instanceof Array, "instanceof");
	assert.equal(arr.at(NaN), 1);
	assert.equal(arr.at(0), 1);
	assert.equal(arr.at(1), 2);
	assert.equal(arr.at(2), 3);
	assert.equal(getTime, 4);
	assert.equal(arr.length, 3);
	assert.equal(getTime, 5);
	arr.splice(1, 1);
	assert.equal(arr.length, 2);
	assert.equal(getTime, 7);
	assert.equal(setTime, 1);
	arr.length = 1;
	assert.equal(setTime, 2);
	assert.equal(arr.length, 1);
	assert.equal(arr.at(0), 1);
});
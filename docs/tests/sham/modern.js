(function () {

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  var Object$1 = window.Object;

  var defineProperty$1 = Object$1.defineProperty;

  function isNotNullObject(obj) {
  	return typeof obj === "object" ? obj !== null : typeof obj === "function";
  };

  function defineProperty(obj, prop, descriptor) {
  	if(!isNotNullObject(obj)) {
  		throw new TypeError("Object.defineProperty called on non-object");
  	}
  	prop = String(prop);
  	if('value' in descriptor) {
  		delete obj[prop];
  		obj[prop] = descriptor.value;
  	} else {
  		if(descriptor.get) obj.__defineGetter__(prop, descriptor.get);
  		if(descriptor.set) obj.__defineSetter__(prop, descriptor.set);
  	}
  	return obj;
  };

  if(!defineProperty$1) {
  	if(Object$1.prototype.__defineSetter__) {
  		Object$1.defineProperty = defineProperty;
  	}
  }

  function definePrototype(target, property, value) {
  	var prototype = target.prototype;
  	if(!(property in prototype)) {
  		Object.defineProperty(prototype, property, {
  			configurable: true,
  			writable: true,
  			enumerable: false,
  			value: value
  		});
  	}
  }

  var slice = Array.prototype.slice;

  function bind(context) {
  	var self = this, args = slice.call(arguments, 1);
  	var Bind = function() {
  		if(this instanceof Bind) {
  			self.apply(this, args.concat(slice.call(arguments)));
  			return;
  		}
  		return self.apply(context, args.concat(slice.call(arguments)));
  	};
  	return Bind;
  }

  definePrototype(Function, 'bind', bind);

  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
      return !!t;
    })();
  }

  var hasOwnProperty = Object$1.prototype.hasOwnProperty;

  function hasOwn(obj, key) {
  	return hasOwnProperty.call(obj, key);
  };

  if(!Object$1.hasOwn) {
  	Object$1.hasOwn = hasOwn;
  }

  function ff_setPrototypeOf(obj, proto) {
  	obj.__proto__ = proto;
  	return obj;
  }

  function ie_setPrototypeOf(o, proto) {
  	o.__proto__ = proto;
  	for(var key in proto) {
  		if(Object.hasOwn(proto, key)) {
  			o[key] = proto[key];
  		}
  	}
  	return o;
  }

  var setPrototypeOf = Object$1.setPrototypeOf;

  if(!setPrototypeOf) {
  	if(Object$1.__proto__) {
  		Object$1.setPrototypeOf = ff_setPrototypeOf;
  	} else {
  		Object$1.setPrototypeOf = ie_setPrototypeOf;
  	}
  }

  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }

  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }

  function isFunction(obj) {
  	return typeof obj === 'function';
  };

  var Proxy$2 = window.Proxy;

  var Reflect$1 = window.Reflect;

  function create(proto, properties) {
  	var o = {};
  	Object.setPrototypeOf(o, proto);
  	if(properties) {
  		Object.defineProperties(o, properties);
  	}
  	return o;
  };

  if(!Object$1.create) {
  	if('__proto__' in Object$1.prototype) {
  		Object$1.create = create;
  	}
  }

  function apply(target, thisArgument, argumentsList) {
  	return Function.apply.call(target, thisArgument, argumentsList);
  };

  function construct(target, argumentsList, NewTarget) {
  	var o = Object.create(target.prototype);
  	if(!NewTarget) { NewTarget = o; }
  	var o2 = apply(target, NewTarget, argumentsList);
  	if(o2 !== void 0) {
  		return o2;
  	}
  	return o;
  };
  construct.sham = true;

  var $inject_Reflect_construct = Reflect$1 ? Reflect$1.construct : construct;

  function anObject(it) {
  	if(!isNotNullObject(it)) {
  		throw TypeError(String(it) + ' is not a object');
  	} return it;
  }

  function getOwnPropertyDescriptor(obj, key) {
  	if(Object.hasOwn(obj, key)) {
  		anObject(obj);
  		var r = new Object();
  		r.enumerable = true;
  		r.configurable = true;
  		var set = obj.__lookupSetter__(key);
  		var get = obj.__lookupGetter__(key);
  		if(set || get) {
  			r.writable = !!set;
  			r.set = set;
  			r.get = get;
  		} else {
  			r.writable = true;
  			r.value = obj[key];
  		}
  		return r;
  	}
  };

  if(!Object$1.getOwnPropertyDescriptor) {
  	if(Object$1.prototype.__defineSetter__) {
  		Object$1.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
  	}
  }

  function get(target, propertyKey, receiver) {
  	if(receiver === void 0) { receiver = target; }
  	var o = target, attributes;
  	do {
  		attributes = Object.getOwnPropertyDescriptor(o, propertyKey);
  		if(attributes) {
  			if(attributes.get) {
  				return attributes.get.call(receiver);
  			}
  			return attributes.value;
  		}
  		o = Object.getPrototypeOf(o);
  	} while(o && o !== Object.prototype);
  	return target[propertyKey];
  };

  var $inject_Reflect_get = Reflect$1 ? Reflect$1.get : get;

  function set(target, propertyKey, value, receiver) {
  	if(receiver === void 0) {
  		try {
  			target[propertyKey] = value;
  			return true;
  		} catch(e) {
  			return false;
  		}
  	}
  	var o = target, desc;
  	do {
  		desc = Object.getOwnPropertyDescriptor(o, propertyKey);
  		if(desc) {
  			if(desc.set) {
  				try {
  					descriptor.set.call(receiver, value);
  					return true;
  				} catch(e) {
  					return false;
  				}
  			} else if('value' in desc) {
  				target[propertyKey] = value;
  				return true;
  			}
  		}
  		o = Object.getPrototypeOf(o);
  	} while(o && o !== Object.prototype);
  	target[propertyKey] = value;
  	return true;
  };

  var $inject_Reflect_set = Reflect$1 ? Reflect$1.set : set;

  var Array$1 = window.Array;

  var toString = Object$1.prototype.toString;

  function isArray(obj) {
  	return toString.call(obj) === '[object Array]';
  }

  if(!Array$1.isArray) {
  	Array$1.isArray = isArray;
  }

  function Proxy$1(target, handler) {
  	if(this instanceof Proxy$1) {
  		if(!target || !handler) throw new TypeError("Cannot create proxy with a non-object as target or handler");
  		if(isFunction(target)) {
  			return proxyFunction(this, target, handler);
  		} else if(Array.isArray(target)) {
  			return proxyArray(this, target, handler);
  		} else {
  			return proxyObject(this, target, handler);
  		}
  	} else {
  		throw TypeError("Constructor Proxy requires 'new'");
  	}
  };

  function proxyFunction(me, target, handler) {
  	function ProxyFunction() {
  		if(this instanceof ProxyFunction) {
  			if(handler.construct) {
  				return anObject(
  					handler.construct(target, slice.call(arguments), this)
  				);
  			} else {
  				return $inject_Reflect_construct(target, arguments, this);
  			}
  		} else {
  			if(handler.apply) {
  				return handler.apply(target, this, slice.call(arguments));
  			} else {
  				return Reflect.apply(target, this, arguments);
  			}
  		}
  	};
  	ProxyFunction.prototype = target.prototype;
  	return ProxyFunction;
  }
  function proxyObject(me, target, handler) {
  	me = Object.create(target);
  	for(var key in target) {
  		proxyProperty(key, me, target, handler);
  	}
  	return me;
  }
  function proxyProperty(key, me, target, handler) {
  	Object.defineProperty(me, key, {
  		enumerable: true,
  		configurable: false,
  		get: function() {
  			if(handler.get) {
  				return handler.get(target, key, this);
  			} else {
  				return $inject_Reflect_get(target, key, this);
  			}
  		},
  		set: function(value) {
  			var r = handler.set ?
  				handler.set(target, key, value, this) :
  				$inject_Reflect_set(target, key, value, this);
  			if(r === false) {
  				throw new TypeError("'set' on proxy: trap returned falsish for property '" + key + "'");
  			}
  		}
  	});
  }
  function proxyPropertyMethod(key, me, target, handler) {
  	Object.defineProperty(me, key, {
  		enumerable: false,
  		configurable: false,
  		writable: false,
  		value: function() {
  			if(handler.get) {
  				var method = handler.get(target, key, this);
  				if(method === target[key]) {
  					return method.apply(target, arguments);
  				}
  				return method.apply(this, arguments);
  			} else {
  				return target[key].apply(target, arguments);
  			}
  		}
  	});
  }
  function proxyArray(me, target, handler) {
  	if(defineProperty$1) {
  		me = Object.create(Array.prototype);
  		proxyProperty('length', me, target, handler);
  	} else {
  		me = {};
  		proxyProperty('length', me, target, handler);
  		me.__proto__ = target;
  	}
  	me.constructor = target.constructor;
  	// var keys = Object.getOwnPropertyNames(Array.prototype);
  	var keys = [
  		'entries', 'every', 'forEach', 'keys', 'values',
  		'at', 'find', 'findIndex', 'findLast', 'findLastIndex', 'includes', 'indexOf', 'lastIndexOf', 'some',
  		'join', 'map', 'reduce', 'reduceRight', 'toLocaleString', 'toString', 'valueOf',
  		'concat', 'copyWithin', 'filter', 'flat', 'flatMap', 'slice', 'toReversed', 'toSorted', 'toSpliced', 'with',
  		'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift',
  		// 'length'
  	];
  	var i = keys.length;
  	while(i--) {
  		proxyPropertyMethod(keys[i], me, target, handler);
  	}
  	// proxyPropertyMethod('toString', me, target, handler);
  	// proxyPropertyMethod('toLocaleString', me, target, handler);
  	// proxyPropertyMethod('valueOf', me, target, handler);
  	return me;
  }

  // 火狐低版本内置了一个Proxy对象，可以通过typeof来区分
  var Proxy = isFunction(Proxy$2) ? Proxy$2 : Proxy$1;

  function revokedHandle() {
  	throw new TypeError('Proxy has been revoked');
  }

  function revocable(target, handler) {
  	var trapHandler = {};
  	var proxy = new Proxy(target, handler);
  	var revoke = function() {
  		trapHandler.has =
  			trapHandler.get =
  			trapHandler.set =
  			trapHandler.apply =
  			trapHandler.construct =
  			trapHandler.getPrototypeOf =
  			trapHandler.setPrototypeOf =
  			trapHandler.isExtensible =
  			trapHandler.preventExtensions =
  			trapHandler.ownKeys =
  			trapHandler.defineProperty =
  			trapHandler.deleteProperty =
  			trapHandler.getOwnPropertyDescriptor =
  			revokedHandle;
  	};
  	proxy = new Proxy(proxy, trapHandler);
  	return { proxy: proxy, revoke: revoke };
  };

  var $inject_Proxy_revocable = Proxy$2 && Proxy$2.revocable || revocable;

  var Number$1 = window.Number;

  function isInteger(value) {
  	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
  }

  if(!Number$1.isInteger) {
  	Number$1.isInteger = isInteger;
  }

  QUnit.test('Proxy', function (assert) {
    var p = new Proxy({
      a: undefined,
      b: undefined,
      c: undefined
    }, {
      get: function (obj, prop) {
        return prop != 'c' ? obj[prop] : 37;
      }
    });
    p.a = 1;
    p.b = undefined;
    assert.equal(p.a, 1);
    assert.equal(p.b, undefined);
    assert.equal('c' in p, true);
    assert.equal(p.c, 37);
    var target = {
      a: undefined
    };
    var p2 = new Proxy(target, {});
    p2.a = 37; // 操作转发到目标

    assert.equal(target.a, 37); // 操作已经被正确地转发

    var person = new Proxy({
      age: undefined
    }, {
      set: function (obj, prop, value) {
        if (prop === "age") {
          if (!Number.isInteger(value)) {
            throw new TypeError("The age is not an integer");
          }
          if (value > 200) {
            throw new RangeError("The age seems invalid");
          }
        }

        // The default behavior to store the value
        obj[prop] = value;

        // 表示成功
        return true;
      }
    });
    person.age = 100;
    assert.equal(person.age, 100);
    assert.throws(function () {
      person.age = "young";
    });
    assert.throws(function () {
      person.age = 300;
    });
    function extend(sup, base) {
      var descriptor = Object.getOwnPropertyDescriptor(base.prototype, "constructor");
      base.prototype = Object.create(sup.prototype);
      var handler = {
        construct: function (target, args) {
          var obj = Object.create(base.prototype);
          this.apply(target, obj, args);
          return obj;
        },
        apply: function (target, that, args) {
          sup.apply(that, args);
          base.apply(that, args);
        }
      };
      var proxy = new Proxy(base, handler);
      descriptor.value = proxy;
      Object.defineProperty(base.prototype, "constructor", descriptor);
      return proxy;
    }
    var Person = function (name) {
      this.name = name;
    };
    var Boy = extend(Person, function (name, age) {
      this.age = age;
    });
    Boy.prototype.sex = "M";
    var Peter = new Boy("Peter", 13);
    assert.equal(Peter.sex, "M");
    assert.equal(Peter.name, "Peter");
    assert.equal(Peter.age, 13);
    var view = new Proxy({
      selected: null
    }, {
      set: function (obj, prop, newval) {
        var oldval = obj[prop];
        if (prop === "selected") {
          if (oldval) {
            oldval.setAttribute("aria-selected", "false");
          }
          if (newval) {
            newval.setAttribute("aria-selected", "true");
          }
        }

        // 默认行为是存储被传入 setter 函数的属性值
        obj[prop] = newval;

        // 表示操作成功
        return true;
      }
    });
    var i1 = view.selected = document.getElementById("item-1");
    assert.equal(i1.getAttribute("aria-selected"), "true");
    var i2 = view.selected = document.getElementById("item-2");
    assert.equal(i1.getAttribute("aria-selected"), "false");
    assert.equal(i2.getAttribute("aria-selected"), "true");
    var products = new Proxy({
      latestBrowser: undefined,
      browsers: ["Internet Explorer", "Netscape"]
    }, {
      get: function (obj, prop) {
        // 附加一个属性
        if (prop === "latestBrowser") {
          return obj.browsers[obj.browsers.length - 1];
        }

        // 默认行为是返回属性值
        return obj[prop];
      },
      set: function (obj, prop, value) {
        // 附加属性
        if (prop === "latestBrowser") {
          obj.browsers.push(value);
          return;
        }

        // 如果不是数组，则进行转换
        if (typeof value === "string") {
          value = [value];
        }

        // 默认行为是保存属性值
        obj[prop] = value;

        // 表示成功
        return true;
      }
    });
    assert.deepEqual(products.browsers, ['Internet Explorer', 'Netscape']);
    products.browsers = "Firefox"; // 如果不小心传入了一个字符串
    assert.deepEqual(products.browsers, ['Firefox']); // <- 也没问题，得到的依旧是一个数组

    products.latestBrowser = "Chrome";
    assert.deepEqual(products.browsers, ['Firefox', 'Chrome']);
    assert.equal(products.latestBrowser, 'Chrome');
  });
  QUnit.test('Proxy#construct', function (assert) {
    function Cat() {}
    var PCat = new Proxy(Cat, {});
    assert.ok(Cat.prototype === PCat.prototype);
    function monster1(disposition) {
      this.disposition = disposition;
    }
    var handler1 = {
      construct: function (target, args) {
        return _construct(target, args);
      }
    };
    var proxy1 = new Proxy(monster1, handler1);
    assert.equal(new proxy1('fierce').disposition, "fierce");
    var p = new Proxy(function () {}, {
      construct: function (target, argumentsList, newTarget) {
        assert.equal(argumentsList.join(", "), "1");
        return {
          value: argumentsList[0] * 10
        };
      }
    });
    assert.equal(new p(1).value, 10, "下面代码演示如何拦截 new 操作。");
    var p2 = new Proxy(function () {}, {
      construct: function (target, argumentsList, newTarget) {
        return 1;
      }
    });
    assert.throws(function () {
      new p2();
    }, TypeError, "下面的代码违反了约定。");
    var p3 = new Proxy({}, {
      construct: function (target, argumentsList, newTarget) {
        return {};
      }
    });
    assert.throws(function () {
      new p3();
    }, TypeError, "下面的代码未能正确的初始化 Proxy。");
  });
  QUnit.test('Proxy#apply', function (assert) {
    function sum(a, b) {
      return a + b;
    }
    var handler = {
      apply: function (target, thisArg, argumentsList) {
        assert.deepEqual(argumentsList, [1, 2]);
        return target(argumentsList[0], argumentsList[1]) * 10;
      }
    };
    var proxy1 = new Proxy(sum, handler);
    assert.equal(sum(1, 2), 3);
    assert.equal(proxy1(1, 2), 30);
    var p = new Proxy(function () {}, {
      apply: function (target, thisArg, argumentsList) {
        assert.equal(argumentsList.join(", "), "1, 2, 3");
        return argumentsList[0] + argumentsList[1] + argumentsList[2];
      }
    });
    assert.equal(p(1, 2, 3), 6);
  });
  QUnit.test('Proxy#get', function (assert) {
    var monster1 = {
      secret: 'easily scared',
      eyeCount: 4
    };
    var handler1 = {
      get: function (target, prop, receiver) {
        if (prop === 'secret') {
          return target.secret.substring(0, 4) + " ... shhhh!";
        }
        return $inject_Reflect_get.apply(void 0, arguments);
      }
    };
    var proxy1 = new Proxy(monster1, handler1);
    assert.equal(proxy1.eyeCount, 4);
    // Expected output: 4

    assert.equal(proxy1.secret, "easi ... shhhh!");
    var p = new Proxy({
      a: undefined
    }, {
      get: function (target, prop, receiver) {
        assert.equal(prop, "a");
        return 10;
      }
    });
    assert.equal(p.a, 10);
  });
  QUnit.test('Proxy#set', function (assert) {
    var monster1 = {
      eyeCount: 4
    };
    var handler1 = {
      set: function (obj, prop, value) {
        if (prop === 'eyeCount' && value % 2 !== 0) {
          assert.deepEqual(value, 1);
        } else {
          return $inject_Reflect_set.apply(void 0, arguments);
        }
      }
    };
    var proxy1 = new Proxy(monster1, handler1);
    proxy1.eyeCount = 1;
    assert.equal(proxy1.eyeCount, 4);
    proxy1.eyeCount = 2;
    assert.equal(proxy1.eyeCount, 2);
    var p = new Proxy({
      a: undefined
    }, {
      set: function (target, prop, value, receiver) {
        target[prop] = value;
        return true;
      }
    });
    assert.ok("a" in p);
    p.a = 10; // "property set: a = 10"
    assert.ok("a" in p);
    assert.equal(p.a, 10);
  });
  QUnit.test('Proxy#revocable', function (assert) {
    var revocable = $inject_Proxy_revocable({
      foo: undefined
    }, {
      get: function (target, name) {
        return "[[" + name + "]]";
      }
    });
    var proxy = revocable.proxy;
    assert.equal(proxy.foo, "[[foo]]");
    revocable.revoke();
    assert.throws(function () {
      proxy.foo;
    }, TypeError);
    assert.throws(function () {
      proxy.foo = 1;
    }, TypeError);
    assert.equal(_typeof(proxy), "object"); //因为 typeof 不属于可代理操作
  });

  function _instanceof(n, e) {
    return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](n) : n instanceof e;
  }

  var Math$1 = window.Math;

  var floor = Math.floor;

  var ceil = Math.ceil;

  // from core-js https://github.com/zloirock/core-js
  function trunc(it) {
  	return (it > 0 ? floor : ceil)(it);
  }

  if(!Math$1.trunc) {
  	Math$1.trunc = trunc;
  }

  function at(n) {
  	var len = this.length;
  	if(isNaN(n)) {
  		return this[0];
  	}
  	n = Math.trunc(n);
  	if(n >= 0) {
  		return this[n];
  	}
  	return this[len + n];
  }

  definePrototype(Array, 'at', at);

  QUnit.test('Proxy#array', function (assert) {
    var getTime = 0;
    var setTime = 0;
    var target = [1, 2, 3];
    var arr = new Proxy(target, {
      get: function (target, prop, receiver) {
        if (prop === 'length') {
          getTime++;
        }
        return $inject_Reflect_get.apply(void 0, arguments);
      },
      set: function (target, prop, value, receiver) {
        if (prop === 'length') {
          setTime++;
        }
        return $inject_Reflect_set.apply(void 0, arguments);
      }
    });
    assert.ok(_instanceof(arr, Array), "instanceof");
    // assert.ok(Array.isArray(arr), "isArray");
    assert.equal(arr.join(","), "1,2,3", "join");
    assert.equal(arr.join(), "1,2,3", "join");
    assert.equal(arr.toString(), "1,2,3", "toString");
    assert.equal(arr.at(NaN), 1, "at");
    assert.equal(arr.at(0), 1);
    assert.equal(arr.at(1), 2);
    assert.equal(arr.at(2), 3);
    getTime = 0;
    assert.equal(arr.length, 3, "length");
    assert.equal(getTime, 1, "get length");
    arr.splice(1, 1);
    assert.equal(arr.length, 2, "splice");
    setTime = 0;
    arr.length = 1;
    assert.equal(setTime, 1, "set length");
    assert.equal(arr.length, 1);
    assert.equal(arr.at(0), 1);
    assert.deepEqual(target, [1]);
    arr.push(2);
    assert.deepEqual(arr.at(1), 2, "push");
    assert.deepEqual(arr.length, 2, "push");
    arr.unshift(3);
    assert.deepEqual(arr.at(0), 3, "unshift");
    assert.deepEqual(arr.at(2), 2, "unshift");
    assert.deepEqual(arr.length, 3, "unshift");
    arr.reverse();
    assert.deepEqual(arr.at(0), 2, "reverse");
    assert.deepEqual(arr.at(1), 1, "reverse");
    assert.deepEqual(arr.at(2), 3, "reverse");
    assert.deepEqual(arr.length, 3, "reverse");
    arr.sort();
    assert.deepEqual(arr.at(0), 1, "sort");
    assert.deepEqual(arr.at(1), 2, "sort");
    assert.deepEqual(arr.at(2), 3, "sort");
    assert.deepEqual(arr.length, 3, "sort");
  });

})();

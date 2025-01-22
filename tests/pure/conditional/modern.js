(function () {

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }

  var Proxy$3 = window.Proxy;

  var Reflect$1 = window.Reflect;

  function apply(target, thisArgument, argumentsList){
  	return Function.prototype.apply.call(target, thisArgument, argumentsList);
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

  var $inject_Reflect_construct = Reflect$1 ? Reflect$1.construct : construct;

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

  function isNotNullObject(obj) {
  	return typeof obj === 'object' ? obj !== null : typeof obj === 'function';
  };

  function anObject(it) {
  	if(!isNotNullObject(it)) {
  		throw TypeError(String(it) + ' is not a object');
  	} return it;
  }

  var slice = Array.prototype.slice;

  function Proxy$2(target, handler) {
  	if(this instanceof Proxy$2) {
  		if(!target || !handler) throw new TypeError("Cannot create proxy with a non-object as target or handler");
  		if(typeof target === "function") {
  			return proxyFunction(this, target, handler);
  		} else {
  			proxyObject(this, target, handler);
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
  	for(var key in target) {
  		proxyProperty(key, me, target, handler);
  	}
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

  var Proxy$1 = Proxy$3 || Proxy$2;

  function isInteger(value) {
  	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
  }

  var $inject_Number_isInteger = Number.isInteger || isInteger;

  function revokedHandle() {
  	throw new TypeError('Proxy has been revoked');
  }

  function revocable(target, handler) {
  	var trapHandler = {};
  	var proxy = new Proxy$1(target, handler);
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
  	proxy = new Proxy$1(proxy, trapHandler);
  	return { proxy: proxy, revoke: revoke };
  };

  var $inject_Proxy_revocable = Proxy$3 && Proxy$3.revocable || revocable;

  QUnit.test('Proxy', function (assert) {
    var p = new Proxy$1({
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
    var p2 = new Proxy$1(target, {});
    p2.a = 37; // 操作转发到目标

    console.log(target.a);
    assert.equal(target.a, 37); // 操作已经被正确地转发

    var person = new Proxy$1({
      age: undefined
    }, {
      set: function (obj, prop, value) {
        if (prop === "age") {
          if (!$inject_Number_isInteger(value)) {
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
    }, TypeError);
    assert.throws(function () {
      person.age = 300;
    }, RangeError);
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
      var proxy = new Proxy$1(base, handler);
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
    var view = new Proxy$1({
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
    var products = new Proxy$1({
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
    var PCat = new Proxy$1(Cat, {});
    assert.ok(Cat.prototype === PCat.prototype);
    function monster1(disposition) {
      this.disposition = disposition;
    }
    var handler1 = {
      construct: function (target, args) {
        console.log("Creating a " + target.name);
        // Expected output: "Creating a monster1"
        return _construct(target, args);
      }
    };
    var proxy1 = new Proxy$1(monster1, handler1);
    assert.equal(new proxy1('fierce').disposition, "fierce");
    var p = new Proxy$1(function () {}, {
      construct: function (target, argumentsList, newTarget) {
        assert.equal(argumentsList.join(", "), "1");
        return {
          value: argumentsList[0] * 10
        };
      }
    });
    assert.equal(new p(1).value, 10, "下面代码演示如何拦截 new 操作。");
    var p2 = new Proxy$1(function () {}, {
      construct: function (target, argumentsList, newTarget) {
        return 1;
      }
    });
    assert.throws(function () {
      new p2();
    }, TypeError, "下面的代码违反了约定。");
    var p3 = new Proxy$1({}, {
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
        console.log("Calculate sum: " + argumentsList);
        // Expected output: "Calculate sum: 1,2"

        return target(argumentsList[0], argumentsList[1]) * 10;
      }
    };
    var proxy1 = new Proxy$1(sum, handler);
    assert.equal(sum(1, 2), 3);
    assert.equal(proxy1(1, 2), 30);
    var p = new Proxy$1(function () {}, {
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
    var proxy1 = new Proxy$1(monster1, handler1);
    assert.equal(proxy1.eyeCount, 4);
    // Expected output: 4

    assert.equal(proxy1.secret, "easi ... shhhh!");
    var p = new Proxy$1({
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
          console.log('Monsters must have an even number of eyes');
        } else {
          return $inject_Reflect_set.apply(void 0, arguments);
        }
      }
    };
    var proxy1 = new Proxy$1(monster1, handler1);
    proxy1.eyeCount = 1;
    // Expected output: "Monsters must have an even number of eyes"

    assert.equal(proxy1.eyeCount, 4);
    proxy1.eyeCount = 2;
    assert.equal(proxy1.eyeCount, 2);
    var p = new Proxy$1({
      a: undefined
    }, {
      set: function (target, prop, value, receiver) {
        target[prop] = value;
        console.log("property set: " + prop + " = " + value);
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

})();

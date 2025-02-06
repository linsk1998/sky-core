(function () {

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function definePrototype(target, property, value) {
  	var prototype = target.prototype;
  	if(!(property in prototype)) prototype[property] = value;
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

  function isFunction(obj) {
  	return typeof obj === 'function';
  };

  var Proxy$4 = window.Proxy;

  var Array$1 = window.Array;

  function isArray(obj){
  	return Object.prototype.toString.call(obj)==='[object Array]';
  }

  if(!Array$1.isArray) {
  	Array$1.isArray = isArray;
  }

  var Object$1 = window.Object;

  var dontEnums=[
  	"toString",
  	"toLocaleString",
  	"valueOf",
  	"hasOwnProperty",
  	"isPrototypeOf",
  	"propertyIsEnumerable"
  ];

  // from core-js
  var GT = '>';
  var LT = '<';
  var SCRIPT = 'script';

  function scriptTag(content) {
  	return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  function NullProtoObjectViaActiveX(activeXDocument) {
  	activeXDocument.write(scriptTag(''));
  	activeXDocument.close();
  	var temp = activeXDocument.parentWindow.Object;
  	activeXDocument = null; // avoid memory leak
  	return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  function NullProtoObjectViaIFrame() {
  	// Thrash, waste and sodomy: IE GC bug
  	var iframe = documentCreateElement('iframe');
  	var JS = 'java' + SCRIPT + ':';
  	var iframeDocument;
  	iframe.style.display = 'none';
  	html.appendChild(iframe);
  	// https://github.com/zloirock/core-js/issues/475
  	iframe.src = String(JS);
  	iframeDocument = iframe.contentWindow.document;
  	iframeDocument.open();
  	iframeDocument.write(scriptTag('document.F=Object'));
  	iframeDocument.close();
  	return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function() {
  	try {
  		/* global ActiveXObject -- old IE */
  		activeXDocument = document.domain && new ActiveXObject('htmlfile');
  	} catch(error) { /* ignore */ }
  	NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  	var i = dontEnums.length;
  	while(i--) delete NullProtoObject.prototype[dontEnums[i]];
  	return NullProtoObject();
  };

  function F() { /* empty */ };
  function create(proto, properties) {
  	var o;
  	if(proto !== null) {
  		F.prototype = proto;
  		var o = new F();
  		F.prototype = null;
  	} else {
  		o = NullProtoObject();
  	}
  	o.__proto__ = proto;
  	if(properties) {
  		Object.defineProperties(o, properties);
  	}
  	return o;
  };
  create.sham = true;

  if(!Object$1.create) {
  	Object$1.create = create;
  }

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
  construct.sham = true;

  function get(target,propertyKey,receiver){
  	if(receiver===void 0){ receiver=target;}
  	var desc=target["@@desc:"+propertyKey];
  	if(desc){
  		if(desc.get){
  			return desc.get.call(receiver);
  		}
  		return desc.value;
  	}
  	return target[propertyKey];
  };

  function set(target,propertyKey,value,receiver){
  	if(receiver===void 0){ receiver=target;}
  	var desc=target["@@desc:"+propertyKey];
  	if(desc){
  		if(desc.set){
  			try{
  				desc.set.call(receiver,value);
  				return true;
  			}catch(e){
  				return false;
  			}
  		}
  		desc.value=value;
  		return true;
  	}
  	target[propertyKey]=value;
  	return true;
  };

  var defineProperty$1 = Object$1.defineProperty;

  function ie8_defineProperty(obj, prop, descriptor) {
  	if(obj instanceof Object || obj instanceof NullProtoObject) {
  		compat_defineProperty.apply(Object, arguments);
  	} else if(window == obj || obj instanceof Element || obj instanceof HTMLDocument) {
  		delete descriptor.enumerable;
  		defineProperty$1.apply(Object, arguments);
  	} else {
  		compat_defineProperty.apply(Object, arguments);
  	}
  	return obj;
  };
  ie8_defineProperty.sham = true;
  function defineProperty(obj, prop, description) {
  	if(defineProperty$1) {
  		if(obj instanceof Object || obj instanceof NullProtoObject) {
  			compat_defineProperty.apply(Object, arguments);
  		} else {
  			delete description.enumerable;
  			defineProperty$1.apply(Object, arguments);
  		}
  	} else {
  		compat_defineProperty.apply(Object, arguments);
  	}
  	return obj;
  };

  function compat_defineProperty(obj, prop, description) {
  	if(typeof obj !== "object" && typeof obj !== "function") {
  		throw new TypeError("Object.defineProperty called on non-object");
  	}
  	prop = String(prop);
  	var descriptor = {
  		configurable: true,
  		enumerable: true,
  		writable: true,
  	};
  	if('value' in description) {
  		obj[prop] = description.value;
  		descriptor.value = description.value;
  	} else {
  		descriptor.get = description.get;
  		descriptor.set = description.set;
  	}
  	obj['@@desc:' + prop] = descriptor;
  	return obj;
  };
  compat_defineProperty.sham = true;

  if(Object$1.defineProperty) {
  	Object$1.defineProperty = ie8_defineProperty;
  } else {
  	Object$1.defineProperty = compat_defineProperty;
  }

  function isNotNullObject(obj) {
  	return typeof obj === 'object' ? obj !== null : typeof obj === 'function';
  };

  function anObject(it) {
  	if(!isNotNullObject(it)) {
  		throw TypeError(String(it) + ' is not a object');
  	} return it;
  }

  function Proxy$3(target, handler) {
  	if(this instanceof Proxy$3) {
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
  				return construct(target, arguments, this);
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
  				return get(target, key, this);
  			}
  		},
  		set: function(value) {
  			var r = handler.set ?
  				handler.set(target, key, value, this) :
  				set(target, key, value, this);
  			if(r === false) {
  				throw new TypeError("'set' on proxy: trap returned falsish for property '" + key + "'");
  			}
  		}
  	});
  }
  function proxyArray(me, target, handler) {
  	me = Object.create(target);
  	var keys = Object.getOwnPropertyNames(Array.prototype);
  	// [
  	// 	'entries', 'every', 'forEach', 'keys', 'values',
  	// 	'at', 'find', 'findIndex', 'findLast', 'findLastIndex', 'includes', 'indexOf', 'lastIndexOf', 'some',
  	// 	'join', 'map', 'reduce', 'reduceRight', 'toLocaleString', 'toString',
  	// 	'concat', 'copyWithin', 'filter', 'flat', 'flatMap', 'slice', 'toReversed', 'toSorted', 'toSpliced', 'with',
  	// 	'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift',
  	// 	'length', 'constructor'
  	// ];
  	var i = keys.length;
  	while(i--) {
  		proxyProperty(keys[i], me, target, handler);
  	}
  	return me;
  }

  var hasOwnProperty = Object$1.prototype.hasOwnProperty;

  function hasOwn(obj, key) {
  	if(obj == null) {
  		throw new TypeError("Cannot convert undefined or null to object");
  	}
  	if(typeof obj !== "object") {
  		return false;
  	}
  	if(!(key in obj)) {
  		return false;
  	}
  	if(obj instanceof NullProtoObject) {
  		return false;
  	}
  	var value = obj[key];
  	if(!(obj instanceof Object)) {
  		var constructor = obj.constructor;
  		if(constructor) {
  			var proto = constructor.prototype;
  			if(obj !== proto) {
  				return proto[key] !== value;
  			}
  		}
  	}
  	return hasOwnProperty.call(obj, key);
  };

  if(!Object$1.hasOwn) {
  	Object$1.hasOwn = hasOwn;
  }

  function getPrototypeOf(obj) {
  	if(obj == null) {
  		throw new TypeError("Cannot convert undefined or null to object");
  	}
  	if(typeof obj !== "object" && typeof obj !== "function") {
  		obj = Object(obj);
  	}
  	if('__proto__' in obj) {
  		return obj.__proto__;
  	}
  	if(!('constructor' in obj)) {
  		return null;
  	}
  	if(Object.hasOwn(obj, 'constructor')) {
  		if('__proto__' in obj.constructor) {
  			return obj.constructor.__proto__.prototype;
  		} else if(obj === Object.prototype) {
  			return null;
  		} else {
  			return Object.prototype;
  		}
  	}
  	return obj.constructor.prototype;
  };
  getPrototypeOf.sham = true;

  function Proxy$2(target, handler) {
  	if(this instanceof Proxy$2) {
  		if(!target || !handler) throw new TypeError("Cannot create proxy with a non-object as target or handler");
  		if(isFunction(target)) {
  			return proxyFunction(this, target, handler);
  		} else if(Array.isArray(target)) {
  			return proxyArrayVB(this, target, handler);
  		} else {
  			return proxyObjectVB(this, target, handler);
  		}
  	} else {
  		throw TypeError("Constructor Proxy requires 'new'");
  	}
  };

  var VBProxyFactoryCache = Object.create(null);

  function proxyObjectVB(me, target, handler) {
  	var keys = [];
  	var key, pre;
  	for(key in target) {
  		pre = key.substring(0, 2);
  		if(pre === '@@') continue;
  		if(pre === '__') continue;
  		if(key === 'constructor') continue;
  		keys.push(key);
  	}
  	keys.sort();
  	key = keys.join('\n');
  	var factory = VBProxyFactoryCache[key];
  	if(!factory) {
  		factory = createVBProxyFactory(keys);
  		VBProxyFactoryCache[key] = factory;
  	}
  	me = window[factory]();
  	me.__proto__ = getPrototypeOf(target);
  	me.constructor = target.constructor;
  	me['@@Target'] = target;
  	me['@@Handler'] = handler;
  	return me;
  }

  var seq = 0;

  window.VBProxyVal = undefined;
  window.VBProxySetter = function(target, key, value, receiver, handler) {
  	var r = handler.set ?
  		handler.set(target, key, value, receiver) :
  		set(target, key, value, receiver);
  	if(r === false) {
  		throw new TypeError("'set' on proxy: trap returned falsish for property '" + key + "'");
  	}
  };
  window.VBProxyGetter = function(target, key, receiver, handler) {
  	if(handler.get) {
  		VBProxyVal = handler.get(target, key, receiver);
  	} else {
  		VBProxyVal = get(target, key, receiver);
  	}
  };

  function createVBProxyFactory(keys) {
  	var className = "VBProxyClass_" + (seq++);
  	var buffer = ["Class " + className];
  	buffer.push('	Public [__proto__]');
  	buffer.push('	Public [constructor]');
  	buffer.push('	Public [@@WeakMap]');
  	buffer.push('	Public [@@Target]');
  	buffer.push('	Public [@@Handler]');
  	var i, key, len = keys.length;
  	for(i = 0; i < len; i++) {
  		key = keys[i];
  		if(key.match(/[a-zA-Z0-9_$]/)) {
  			buffer.push(
  				'	Public Property Let [' + key + '](val)',
  				'		Call VBProxySetter([@@Target], "' + key + '", val, Me, [@@Handler])',
  				'	End Property',
  				'	Public Property Set [' + key + '](val)',
  				'		Call VBProxySetter([@@Target], "' + key + '", val, Me, [@@Handler])',
  				'	End Property',
  				'	Public Property Get [' + key + ']',
  				'		Call VBProxyGetter([@@Target], "' + key + '", Me, [@@Handler])',
  				'		On Error Resume Next', //必须优先使用set语句,否则它会误将数组当字符串返回
  				'		Set [' + key + '] = VBProxyVal',
  				'		If Err.Number = 0 Then',
  				'			Set VBProxyVal = Nothing',
  				'		Else',
  				'			[' + key + '] = VBProxyVal',
  				'			VBProxyVal = Null',
  				'		End If',
  				'		On Error Goto 0',
  				'	End Property');
  		}
  	}
  	buffer.push('End Class');

  	var factoryName = className + "_Factory";
  	buffer.push(
  		'Function ' + factoryName + '()',
  		'	Dim o',
  		'	Set o = New ' + className,
  		'	Set ' + factoryName + ' = o',
  		'End Function'
  	);
  	window.execScript(buffer.join('\n'), 'VBScript');
  	return factoryName;
  }
  function proxyArrayVB(me, target, handler) {
  	// TODO
  }

  // 火狐低版本内置了一个Proxy对象，可以通过typeof来区分
  var Proxy$1 = isFunction(Proxy$4) ? Proxy$4 : Proxy$2;

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

  var $inject_Proxy_revocable = Proxy$4 && Proxy$4.revocable || revocable;

  var Number$1 = window.Number;

  function isInteger(value) {
  	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
  }

  if(!Number$1.isInteger) {
  	Number$1.isInteger = isInteger;
  }

  var getOwnPropertyDescriptor$1 = Object$1.getOwnPropertyDescriptor;

  function getOwnPropertyDescriptor(obj, prop) {
  	if(obj == null) {
  		throw new TypeError("Cannot convert undefined or null to object");
  	}
  	if(typeof obj !== "object" && typeof obj !== "function") {
  		return;
  	}
  	var key = '@@desc:' + prop;
  	if(key in obj) {
  		var descriptor = obj[key];
  		if('value' in descriptor) {
  			descriptor.value = obj[prop];
  		}
  		return descriptor;
  	}
  	if(Object.hasOwn(obj, prop)) {
  		return {
  			value: obj[prop],
  			writable: true,
  			enumerable: String(prop).substring(0, 2) !== "__",
  			configurable: true
  		};
  	}
  };
  getOwnPropertyDescriptor.sham = true;
  function ie8_getOwnPropertyDescriptor(obj, prop) {
  	if(obj instanceof Object || obj instanceof NullProtoObject) {
  		return getOwnPropertyDescriptor.apply(Object, arguments);
  	} else {
  		if(obj == null) {
  			throw new TypeError("Cannot convert undefined or null to object");
  		}
  		if(typeof obj !== "object" && typeof obj !== "function") {
  			return;
  		}
  		return getOwnPropertyDescriptor$1.apply(Object, arguments);
  	}
  };
  ie8_getOwnPropertyDescriptor.sham = true;

  if(Object$1.getOwnPropertyDescriptor) {
  	Object$1.getOwnPropertyDescriptor = ie8_getOwnPropertyDescriptor;
  } else {
  	Object$1.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
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
        return get.apply(void 0, arguments);
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
          return set.apply(void 0, arguments);
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

  QUnit.test('Proxy#array', function (assert) {
    var getTime = 0;
    var setTime = 0;
    var arr = new Proxy$1([1, 2, 3], {
      get: function (target, prop, receiver) {
        if (prop === 'length') {
          getTime++;
        }
        return get.apply(void 0, arguments);
      },
      set: function (target, prop, value, receiver) {
        if (prop === 'length') {
          setTime++;
        }
        return set.apply(void 0, arguments);
      }
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

})();

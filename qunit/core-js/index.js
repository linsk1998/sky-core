(function() {

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function getDefaultExportFromNamespaceIfPresent(n) {
    return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
  }

  function getDefaultExportFromNamespaceIfNotNamed(n) {
    return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
  }

  function getAugmentedNamespace(n) {
    if(n.__esModule) return n;
    var a = Object.defineProperty({}, '__esModule', { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }

  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var es_symbol_iterator = {};

  var check = function(it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$g =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    (function() { return this; })() || Function('return this')();

  var global$f = global$g;

  var path$2 = global$f;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$e = function(it, key) {
    return hasOwnProperty.call(it, key);
  };

  var wellKnownSymbolWrapped = {};

  var shared$5 = { exports: {} };

  var isPure = false;

  var fails$k = function(exec) {
    try {
      return !!exec();
    } catch(error) {
      return true;
    }
  };

  var fails$j = fails$k;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$j(function() {
    return Object.defineProperty({}, 1, { get: function() { return 7; } })[1] != 7;
  });

  var objectDefineProperty = {};

  var isObject$c = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var global$e = global$g;
  var isObject$b = isObject$c;

  var document$1 = global$e.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$b(document$1) && isObject$b(document$1.createElement);

  var documentCreateElement$1 = function(it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$e = descriptors;
  var fails$i = fails$k;
  var createElement = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$e && !fails$i(function() {
    return Object.defineProperty(createElement('div'), 'a', {
      get: function() { return 7; }
    }).a != 7;
  });

  var isObject$a = isObject$c;

  var anObject$9 = function(it) {
    if(!isObject$a(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var isObject$9 = isObject$c;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$5 = function(input, PREFERRED_STRING) {
    if(!isObject$9(input)) return input;
    var fn, val;
    if(PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$9(val = fn.call(input))) return val;
    if(typeof (fn = input.valueOf) == 'function' && !isObject$9(val = fn.call(input))) return val;
    if(!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$9(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var DESCRIPTORS$d = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var anObject$8 = anObject$9;
  var toPrimitive$4 = toPrimitive$5;

  var nativeDefineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$6 = objectDefineProperty.f = DESCRIPTORS$d ? nativeDefineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$8(O);
    P = toPrimitive$4(P, true);
    anObject$8(Attributes);
    if(IE8_DOM_DEFINE$1) try {
      return nativeDefineProperty$1(O, P, Attributes);
    } catch(error) { /* empty */ }
    if('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var createPropertyDescriptor$5 = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var DESCRIPTORS$c = descriptors;
  var definePropertyModule$6 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$5;

  var createNonEnumerableProperty$9 = DESCRIPTORS$c ? function(object, key, value) {
    return definePropertyModule$6.f(object, key, createPropertyDescriptor$4(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };

  var global$d = global$g;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;

  var setGlobal$3 = function(key, value) {
    try {
      createNonEnumerableProperty$8(global$d, key, value);
    } catch(error) {
      global$d[key] = value;
    } return value;
  };

  var global$c = global$g;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$c[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var IS_PURE$3 = isPure;
  var store$2 = sharedStore;

  (shared$5.exports = function(key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.8.3',
    mode: IS_PURE$3 ? 'pure' : 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var shared$4 = shared$5.exports;

  var id$2 = 0;
  var postfix = Math.random();

  var uid$4 = function(key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$2 + postfix).toString(36);
  };

  var fails$h = fails$k;

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$h(function() {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var NATIVE_SYMBOL$2 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$2
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var global$b = global$g;
  var shared$3 = shared$5.exports;
  var has$d = has$e;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var WellKnownSymbolsStore$1 = shared$3('wks');
  var Symbol$1 = global$b.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

  var wellKnownSymbol$e = function(name) {
    if(!has$d(WellKnownSymbolsStore$1, name)) {
      if(NATIVE_SYMBOL$1 && has$d(Symbol$1, name)) WellKnownSymbolsStore$1[name] = Symbol$1[name];
      else WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore$1[name];
  };

  var wellKnownSymbol$d = wellKnownSymbol$e;

  var f$5 = wellKnownSymbolWrapped.f = wellKnownSymbol$d;

  var path$1 = path$2;
  var has$c = has$e;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$6 = objectDefineProperty.f;

  var defineWellKnownSymbol$6 = function(NAME) {
    var Symbol = path$1.Symbol || (path$1.Symbol = {});
    if(!has$c(Symbol, NAME)) defineProperty$6(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var defineWellKnownSymbol$5 = defineWellKnownSymbol$6;

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol$5('iterator');

  var toString$3 = {}.toString;

  var classofRaw$1 = function(it) {
    return toString$3.call(it).slice(8, -1);
  };

  var fails$g = fails$k;
  var classof$3 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$g(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function(it) {
    return classof$3(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$3 = function(it) {
    if(it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$2 = requireObjectCoercible$3;

  var toIndexedObject$8 = function(it) {
    return IndexedObject$1(requireObjectCoercible$2(it));
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$3 = function(argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var toInteger$2 = toInteger$3;

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$3 = function(argument) {
    return argument > 0 ? min$1(toInteger$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$1 = toInteger$3;

  var max$1 = Math.max;
  var min = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$2 = function(index, length) {
    var integer = toInteger$1(index);
    return integer < 0 ? max$1(integer + length, 0) : min(integer, length);
  };

  var toIndexedObject$7 = toIndexedObject$8;
  var toLength$2 = toLength$3;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = toIndexedObject$7($this);
      var length = toLength$2(O.length);
      var index = toAbsoluteIndex$1(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if(IS_INCLUDES && el != el) while(length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if(value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      } else for(; length > index; index++) {
        if((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var hiddenKeys$6 = {};

  var has$b = has$e;
  var toIndexedObject$6 = toIndexedObject$8;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$5 = hiddenKeys$6;

  var objectKeysInternal = function(object, names) {
    var O = toIndexedObject$6(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O) !has$b(hiddenKeys$5, key) && has$b(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(names.length > i) if(has$b(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys$1(O, enumBugKeys$2);
  };

  var DESCRIPTORS$b = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var anObject$7 = anObject$9;
  var objectKeys$1 = objectKeys$2;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  var objectDefineProperties = DESCRIPTORS$b ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$7(O);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while(length > index) definePropertyModule$5.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var path = path$2;
  var global$a = global$g;

  var aFunction$3 = function(variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$5 = function(namespace, method) {
    return arguments.length < 2 ? aFunction$3(path[namespace]) || aFunction$3(global$a[namespace])
      : path[namespace] && path[namespace][method] || global$a[namespace] && global$a[namespace][method];
  };

  var getBuiltIn$4 = getBuiltIn$5;

  var html$1 = getBuiltIn$4('document', 'documentElement');

  var shared$2 = shared$5.exports;
  var uid$2 = uid$4;

  var keys$1 = shared$2('keys');

  var sharedKey$4 = function(key) {
    return keys$1[key] || (keys$1[key] = uid$2(key));
  };

  var anObject$6 = anObject$9;
  var defineProperties$2 = objectDefineProperties;
  var enumBugKeys$1 = enumBugKeys$3;
  var hiddenKeys$4 = hiddenKeys$6;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$3 = sharedKey$4;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$3('IE_PROTO');

  var EmptyConstructor = function() { /* empty */ };

  var scriptTag = function(content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function(activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function() {
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
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch(error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys$1.length;
    while(length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
    return NullProtoObject();
  };

  hiddenKeys$4[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if(O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$6(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties$2(result, Properties);
  };

  var wellKnownSymbol$c = wellKnownSymbol$e;
  var create$3 = objectCreate;
  var definePropertyModule$4 = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$c('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if(ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule$4.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$3(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function(key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var store$1 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if(typeof store$1.inspectSource != 'function') {
    store$1.inspectSource = function(it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$2 = store$1.inspectSource;

  var global$9 = global$g;
  var inspectSource$1 = inspectSource$2;

  var WeakMap$2 = global$9.WeakMap;

  var nativeWeakMap = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource$1(WeakMap$2));

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$8 = global$g;
  var isObject$8 = isObject$c;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
  var objectHas = has$e;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$4;
  var hiddenKeys$3 = hiddenKeys$6;

  var WeakMap$1 = global$8.WeakMap;
  var set$1, get, has$a;

  var enforce = function(it) {
    return has$a(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function(TYPE) {
    return function(it) {
      var state;
      if(!isObject$8(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if(NATIVE_WEAK_MAP) {
    var store = shared$1.state || (shared$1.state = new WeakMap$1());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set$1 = function(it, metadata) {
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function(it) {
      return wmget.call(store, it) || {};
    };
    has$a = function(it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set$1 = function(it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty$7(it, STATE, metadata);
      return metadata;
    };
    get = function(it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$a = function(it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has$a,
    enforce: enforce,
    getterFor: getterFor
  };

  var objectGetOwnPropertyDescriptor = {};

  var objectPropertyIsEnumerable = {};

  'use strict';
  var nativePropertyIsEnumerable$1 = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !nativePropertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$4 = objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable$1;

  var DESCRIPTORS$a = descriptors;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$5;
  var toIndexedObject$5 = toIndexedObject$8;
  var toPrimitive$3 = toPrimitive$5;
  var has$9 = has$e;
  var IE8_DOM_DEFINE = ie8DomDefine;

  var nativeGetOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$3 = objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? nativeGetOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$5(O);
    P = toPrimitive$3(P, true);
    if(IE8_DOM_DEFINE) try {
      return nativeGetOwnPropertyDescriptor$2(O, P);
    } catch(error) { /* empty */ }
    if(has$9(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
  };

  var redefine$7 = { exports: {} };

  var global$7 = global$g;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
  var has$8 = has$e;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$2;
  var InternalStateModule$3 = internalState;

  var getInternalState$3 = InternalStateModule$3.get;
  var enforceInternalState = InternalStateModule$3.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$7.exports = function(O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if(typeof value == 'function') {
      if(typeof key == 'string' && !has$8(value, 'name')) {
        createNonEnumerableProperty$6(value, 'name', key);
      }
      state = enforceInternalState(value);
      if(!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if(O === global$7) {
      if(simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if(!unsafe) {
      delete O[key];
    } else if(!noTargetGet && O[key]) {
      simple = true;
    }
    if(simple) O[key] = value;
    else createNonEnumerableProperty$6(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$3(this).source || inspectSource(this);
  });

  var redefine$6 = redefine$7.exports;

  var objectGetOwnPropertyNames = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$3;

  var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  var f$2 = objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  var f$1 = objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$3 = getBuiltIn$5;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$5 = anObject$9;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$3 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$5(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$7 = has$e;
  var ownKeys$2 = ownKeys$3;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$2 = function(target, source) {
    var keys = ownKeys$2(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
    for(var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if(!has$7(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$f = fails$k;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE$1 ? false
        : typeof detection == 'function' ? fails$f(detection)
          : !!detection;
  };

  var normalize = isForced$1.normalize = function(string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE$1 = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$6 = global$g;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
  var redefine$5 = redefine$7.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties$1 = copyConstructorProperties$2;
  var isForced = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if(GLOBAL) {
      target = global$6;
    } else if(STATIC) {
      target = global$6[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$6[TARGET] || {}).prototype;
    }
    if(target) for(key in source) {
      sourceProperty = source[key];
      if(options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if(!FORCED && targetProperty !== undefined) {
        if(typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if(options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$5(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$5(target, key, sourceProperty, options);
    }
  };

  var requireObjectCoercible$1 = requireObjectCoercible$3;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$6 = function(argument) {
    return Object(requireObjectCoercible$1(argument));
  };

  var fails$e = fails$k;

  var correctPrototypeGetter = !fails$e(function() {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$6 = has$e;
  var toObject$5 = toObject$6;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER$2 = correctPrototypeGetter;

  var IE_PROTO = sharedKey$1('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER$2 ? Object.getPrototypeOf : function(O) {
    O = toObject$5(O);
    if(has$6(O, IE_PROTO)) return O[IE_PROTO];
    if(typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  'use strict';
  var fails$d = fails$k;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;
  var has$5 = has$e;
  var wellKnownSymbol$b = wellKnownSymbol$e;
  var IS_PURE$2 = isPure;

  var ITERATOR$2 = wellKnownSymbol$b('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function() { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if(!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if(PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$d(function() {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
  });

  if(NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if((!IS_PURE$2 || NEW_ITERATOR_PROTOTYPE) && !has$5(IteratorPrototype$2, ITERATOR$2)) {
    createNonEnumerableProperty$4(IteratorPrototype$2, ITERATOR$2, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$5 = objectDefineProperty.f;
  var has$4 = has$e;
  var wellKnownSymbol$a = wellKnownSymbol$e;

  var TO_STRING_TAG$3 = wellKnownSymbol$a('toStringTag');

  var setToStringTag$5 = function(it, TAG, STATIC) {
    if(it && !has$4(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
      defineProperty$5(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  'use strict';
  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$2 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$5;
  var setToStringTag$4 = setToStringTag$5;
  var Iterators$2 = iterators;

  var returnThis$1 = function() { return this; };

  var createIteratorConstructor$1 = function(IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$2(1, next) });
    setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var isObject$7 = isObject$c;

  var aPossiblePrototype$1 = function(it) {
    if(!isObject$7(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  var anObject$4 = anObject$9;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function() {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch(error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$4(O);
      aPossiblePrototype(proto);
      if(CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  'use strict';
  var $$e = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$3 = setToStringTag$5;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
  var redefine$4 = redefine$7.exports;
  var wellKnownSymbol$9 = wellKnownSymbol$e;
  var IS_PURE$1 = isPure;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;

  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol$9('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function() { return this; };

  var defineIterator$2 = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function(KIND) {
      if(KIND === DEFAULT && defaultIterator) return defaultIterator;
      if(!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch(KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function() { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if(anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if(IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if(!IS_PURE$1 && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if(setPrototypeOf$1) {
            setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
          } else if(typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            createNonEnumerableProperty$3(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$3(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        if(IS_PURE$1) Iterators$1[TO_STRING_TAG] = returnThis;
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if((!IS_PURE$1 || FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
      createNonEnumerableProperty$3(IterablePrototype, ITERATOR$1, defaultIterator);
    }
    Iterators$1[NAME] = defaultIterator;

    // export additional methods
    if(DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if(FORCED) for(KEY in methods) {
        if(BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$4(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$e({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  'use strict';
  var toIndexedObject$4 = toIndexedObject$8;
  var addToUnscopables = addToUnscopables$1;
  var Iterators = iterators;
  var InternalStateModule$2 = internalState;
  var defineIterator$1 = defineIterator$2;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$1(Array, 'Array', function(iterated, kind) {
    setInternalState$2(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$4(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function() {
    var state = getInternalState$2(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if(!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if(kind == 'keys') return { value: index, done: false };
    if(kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators.Arguments = Iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var es_object_toString = {};

  var wellKnownSymbol$8 = wellKnownSymbol$e;

  var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test$1) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$7 = wellKnownSymbol$e;

  var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function() { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function(it, key) {
    try {
      return it[key];
    } catch(error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$2 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function(it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O)
          // ES3 arguments fallback
          : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  'use strict';
  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$1 = classof$2;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$1(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$3 = redefine$7.exports;
  var toString$2 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if(!TO_STRING_TAG_SUPPORT) {
    redefine$3(Object.prototype, 'toString', toString$2, { unsafe: true });
  }

  var es_string_iterator = {};

  var toInteger = toInteger$3;
  var requireObjectCoercible = requireObjectCoercible$3;

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function(CONVERT_TO_STRING) {
    return function($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if(position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  'use strict';
  var charAt = stringMultibyte.charAt;
  var InternalStateModule$1 = internalState;
  var defineIterator = defineIterator$2;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$1 = InternalStateModule$1.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function(iterated) {
    setInternalState$1(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if(index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var web_domCollections_iterator = {};

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var global$5 = global$g;
  var DOMIterables = domIterables;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
  var wellKnownSymbol$6 = wellKnownSymbol$e;

  var ITERATOR = wellKnownSymbol$6('iterator');
  var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  for(var COLLECTION_NAME in DOMIterables) {
    var Collection = global$5[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    if(CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if(CollectionPrototype[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty$2(CollectionPrototype, ITERATOR, ArrayValues);
      } catch(error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
      if(!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty$2(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if(DOMIterables[COLLECTION_NAME]) for(var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if(CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty$2(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch(error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  }

  var es_symbol = {};

  var classof = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  var isArray$3 = Array.isArray || function isArray(arg) {
    return classof(arg) == 'Array';
  };

  var objectGetOwnPropertyNamesExternal = {};

  var toIndexedObject$3 = toIndexedObject$8;
  var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNames.f;

  var toString$1 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function(it) {
    try {
      return nativeGetOwnPropertyNames$2(it);
    } catch(error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f = objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]'
      ? getWindowNames(it)
      : nativeGetOwnPropertyNames$2(toIndexedObject$3(it));
  };

  var aFunction$2 = function(it) {
    if(typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var aFunction$1 = aFunction$2;

  // optional / simple context binding
  var functionBindContext = function(fn, that, length) {
    aFunction$1(fn);
    if(that === undefined) return fn;
    switch(length) {
      case 0: return function() {
        return fn.call(that);
      };
      case 1: return function(a) {
        return fn.call(that, a);
      };
      case 2: return function(a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function(a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function(/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var isObject$6 = isObject$c;
  var isArray$2 = isArray$3;
  var wellKnownSymbol$5 = wellKnownSymbol$e;

  var SPECIES$3 = wellKnownSymbol$5('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function(originalArray, length) {
    var C;
    if(isArray$2(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if(typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;
      else if(isObject$6(C)) {
        C = C[SPECIES$3];
        if(C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var bind = functionBindContext;
  var IndexedObject = indexedObject;
  var toObject$4 = toObject$6;
  var toLength$1 = toLength$3;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod = function(TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that, specificCreate) {
      var O = toObject$4($this);
      var self = IndexedObject(O);
      var boundFunction = bind(callbackfn, that, 3);
      var length = toLength$1(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
      var value, result;
      for(; length > index; index++) if(NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if(TYPE) {
          if(IS_MAP) target[index] = result; // map
          else if(result) switch(TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else switch(TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterOut
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod(7)
  };

  'use strict';
  var $$d = _export;
  var global$4 = global$g;
  var getBuiltIn$2 = getBuiltIn$5;
  var IS_PURE = isPure;
  var DESCRIPTORS$9 = descriptors;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var fails$c = fails$k;
  var has$3 = has$e;
  var isArray$1 = isArray$3;
  var isObject$5 = isObject$c;
  var anObject$3 = anObject$9;
  var toObject$3 = toObject$6;
  var toIndexedObject$2 = toIndexedObject$8;
  var toPrimitive$2 = toPrimitive$5;
  var createPropertyDescriptor$1 = createPropertyDescriptor$5;
  var nativeObjectCreate = objectCreate;
  var objectKeys = objectKeys$2;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
  var redefine$2 = redefine$7.exports;
  var shared = shared$5.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys$1 = hiddenKeys$6;
  var uid$1 = uid$4;
  var wellKnownSymbol$4 = wellKnownSymbol$e;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol$4 = defineWellKnownSymbol$6;
  var setToStringTag$2 = setToStringTag$5;
  var InternalStateModule = internalState;
  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE$1 = wellKnownSymbol$4('toPrimitive');
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$4.Symbol;
  var $stringify = getBuiltIn$2('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule$2.f;
  var nativeGetOwnPropertyNames$1 = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global$4.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = DESCRIPTORS$9 && fails$c(function() {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
      get: function() { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function(O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
    if(ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if(ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap = function(tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if(!DESCRIPTORS$9) symbol.description = description;
    return symbol;
  };

  var isSymbol = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == 'symbol';
  } : function(it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if(O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$3(O);
    var key = toPrimitive$2(P, true);
    anObject$3(Attributes);
    if(has$3(AllSymbols, key)) {
      if(!Attributes.enumerable) {
        if(!has$3(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if(has$3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$3(O);
    var properties = toIndexedObject$2(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function(key) {
      if(!DESCRIPTORS$9 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive$2(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if(this === ObjectPrototype && has$3(AllSymbols, P) && !has$3(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has$3(this, P) || !has$3(AllSymbols, P) || has$3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$2(O);
    var key = toPrimitive$2(P, true);
    if(it === ObjectPrototype && has$3(AllSymbols, key) && !has$3(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
    if(descriptor && has$3(AllSymbols, key) && !(has$3(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames$1(toIndexedObject$2(O));
    var result = [];
    $forEach(names, function(key) {
      if(!has$3(AllSymbols, key) && !has$3(hiddenKeys$1, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$2(O));
    var result = [];
    $forEach(names, function(key) {
      if(has$3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$3(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if(!NATIVE_SYMBOL) {
    $Symbol = function Symbol() {
      if(this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid$1(description);
      var setter = function(value) {
        if(this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if(has$3(this, HIDDEN) && has$3(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
      };
      if(DESCRIPTORS$9 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    redefine$2($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState(this).tag;
    });

    redefine$2($Symbol, 'withoutSetter', function(description) {
      return wrap(uid$1(description), description);
    });

    propertyIsEnumerableModule.f = $propertyIsEnumerable;
    definePropertyModule$2.f = $defineProperty;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function(name) {
      return wrap(wellKnownSymbol$4(name), name);
    };

    if(DESCRIPTORS$9) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      if(!IS_PURE) {
        redefine$2(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
    }
  }

  $$d({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
    defineWellKnownSymbol$4(name);
  });

  $$d({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function(key) {
      var string = String(key);
      if(has$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if(!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if(has$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function() { USE_SETTER = true; },
    useSimple: function() { USE_SETTER = false; }
  });

  $$d({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$9 }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  $$d({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  $$d({ target: 'Object', stat: true, forced: fails$c(function() { getOwnPropertySymbolsModule.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule.f(toObject$3(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if($stringify) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$c(function() {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    $$d({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while(arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if(!isObject$5(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if(!isArray$1(replacer)) replacer = function(key, value) {
          if(typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if(!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if(!$Symbol[PROTOTYPE][TO_PRIMITIVE$1]) {
    createNonEnumerableProperty$1($Symbol[PROTOTYPE], TO_PRIMITIVE$1, $Symbol[PROTOTYPE].valueOf);
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag$2($Symbol, SYMBOL);

  hiddenKeys$1[HIDDEN] = true;

  var es_symbol_description = {};

  // `Symbol.prototype.description` getter
  // https://tc39.es/ecma262/#sec-symbol.prototype.description
  'use strict';
  var $$c = _export;
  var DESCRIPTORS$8 = descriptors;
  var global$3 = global$g;
  var has$2 = has$e;
  var isObject$4 = isObject$c;
  var defineProperty$4 = objectDefineProperty.f;
  var copyConstructorProperties = copyConstructorProperties$2;

  var NativeSymbol = global$3.Symbol;

  if(DESCRIPTORS$8 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if(description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;

    var symbolToString = symbolPrototype.toString;
    var native = String(NativeSymbol('test')) == 'Symbol(test)';
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty$4(symbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = isObject$4(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if(has$2(EmptyStringDescriptionStore, symbol)) return '';
        var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    $$c({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  var es_date_toString = {};

  var redefine$1 = redefine$7.exports;

  var DatePrototype$1 = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING$1 = 'toString';
  var nativeDateToString = DatePrototype$1[TO_STRING$1];
  var getTime = DatePrototype$1.getTime;

  // `Date.prototype.toString` method
  // https://tc39.es/ecma262/#sec-date.prototype.tostring
  if(new Date(NaN) + '' != INVALID_DATE) {
    redefine$1(DatePrototype$1, TO_STRING$1, function toString() {
      var value = getTime.call(this);
      // eslint-disable-next-line no-self-compare
      return value === value ? nativeDateToString.call(this) : INVALID_DATE;
    });
  }

  var es_regexp_toString = {};

  'use strict';
  var anObject$2 = anObject$9;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function() {
    var that = anObject$2(this);
    var result = '';
    if(that.global) result += 'g';
    if(that.ignoreCase) result += 'i';
    if(that.multiline) result += 'm';
    if(that.dotAll) result += 's';
    if(that.unicode) result += 'u';
    if(that.sticky) result += 'y';
    return result;
  };

  'use strict';
  var redefine = redefine$7.exports;
  var anObject$1 = anObject$9;
  var fails$b = fails$k;
  var flags = regexpFlags;

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails$b(function() { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if(NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$1(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var es_array_slice = {};

  'use strict';
  var toPrimitive$1 = toPrimitive$5;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$5;

  var createProperty$1 = function(object, key, value) {
    var propertyKey = toPrimitive$1(key);
    if(propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var getBuiltIn$1 = getBuiltIn$5;

  var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

  var global$2 = global$g;
  var userAgent = engineUserAgent;

  var process = global$2.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if(v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if(userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if(!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if(match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var fails$a = fails$k;
  var wellKnownSymbol$3 = wellKnownSymbol$e;
  var V8_VERSION = engineV8Version;

  var SPECIES$2 = wellKnownSymbol$3('species');

  var arrayMethodHasSpeciesSupport$1 = function(METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION >= 51 || !fails$a(function() {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$2] = function() {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var DESCRIPTORS$7 = descriptors;
  var fails$9 = fails$k;
  var has$1 = has$e;

  var defineProperty$3 = Object.defineProperty;
  var cache = {};

  var thrower = function(it) { throw it; };

  var arrayMethodUsesToLength$1 = function(METHOD_NAME, options) {
    if(has$1(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if(!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has$1(options, 'ACCESSORS') ? options.ACCESSORS : false;
    var argument0 = has$1(options, 0) ? options[0] : thrower;
    var argument1 = has$1(options, 1) ? options[1] : undefined;

    return cache[METHOD_NAME] = !!method && !fails$9(function() {
      if(ACCESSORS && !DESCRIPTORS$7) return true;
      var O = { length: -1 };

      if(ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
      else O[1] = 1;

      method.call(O, argument0, argument1);
    });
  };

  'use strict';
  var $$b = _export;
  var isObject$3 = isObject$c;
  var isArray = isArray$3;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var toLength = toLength$3;
  var toIndexedObject$1 = toIndexedObject$8;
  var createProperty = createProperty$1;
  var wellKnownSymbol$2 = wellKnownSymbol$e;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
  var arrayMethodUsesToLength = arrayMethodUsesToLength$1;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
  var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

  var SPECIES$1 = wellKnownSymbol$2('species');
  var nativeSlice = [].slice;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$b({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$1(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if(isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if(typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if(isObject$3(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if(Constructor === null) Constructor = undefined;
        }
        if(Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
      for(n = 0; k < fin; k++, n++) if(k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var es_function_name = {};

  var DESCRIPTORS$6 = descriptors;
  var defineProperty$2 = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if(DESCRIPTORS$6 && !(NAME in FunctionPrototype)) {
    defineProperty$2(FunctionPrototype, NAME, {
      configurable: true,
      get: function() {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch(error) {
          return '';
        }
      }
    });
  }

  var es_object_defineProperty = {};

  var $$a = _export;
  var DESCRIPTORS$5 = descriptors;
  var objectDefinePropertyModile = objectDefineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  $$a({ target: 'Object', stat: true, forced: !DESCRIPTORS$5, sham: !DESCRIPTORS$5 }, {
    defineProperty: objectDefinePropertyModile.f
  });

  var es_object_setPrototypeOf = {};

  var $$9 = _export;
  var setPrototypeOf = objectSetPrototypeOf;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  $$9({ target: 'Object', stat: true }, {
    setPrototypeOf: setPrototypeOf
  });

  var es_object_isExtensible = {};

  var $$8 = _export;
  var fails$8 = fails$k;
  var isObject$2 = isObject$c;

  var nativeIsExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES$5 = fails$8(function() { nativeIsExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  $$8({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$5 }, {
    isExtensible: function isExtensible(it) {
      return isObject$2(it) ? nativeIsExtensible ? nativeIsExtensible(it) : true : false;
    }
  });

  var es_object_preventExtensions = {};

  var internalMetadata$1 = { exports: {} };

  var fails$7 = fails$k;

  var freezing = !fails$7(function() {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var hiddenKeys = hiddenKeys$6;
  var isObject$1 = isObject$c;
  var has = has$e;
  var defineProperty$1 = objectDefineProperty.f;
  var uid = uid$4;
  var FREEZING$2 = freezing;

  var METADATA = uid('meta');
  var id$1 = 0;

  var isExtensible = Object.isExtensible || function() {
    return true;
  };

  var setMetadata = function(it) {
    defineProperty$1(it, METADATA, {
      value: {
        objectID: 'O' + ++id$1, // object ID
        weakData: {}          // weak collections IDs
      }
    });
  };

  var fastKey = function(it, create) {
    // return a primitive with prefix
    if(!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if(!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if(!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if(!create) return 'E';
      // add missing metadata
      setMetadata(it);
      // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function(it, create) {
    if(!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if(!isExtensible(it)) return true;
      // not necessary to add metadata
      if(!create) return false;
      // add missing metadata
      setMetadata(it);
      // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze$1 = function(it) {
    if(FREEZING$2 && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = internalMetadata$1.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze$1
  };

  hiddenKeys[METADATA] = true;

  var internalMetadata = internalMetadata$1.exports;

  var $$7 = _export;
  var isObject = isObject$c;
  var onFreeze = internalMetadata$1.exports.onFreeze;
  var FREEZING$1 = freezing;
  var fails$6 = fails$k;

  var nativePreventExtensions = Object.preventExtensions;
  var FAILS_ON_PRIMITIVES$4 = fails$6(function() { nativePreventExtensions(1); });

  // `Object.preventExtensions` method
  // https://tc39.es/ecma262/#sec-object.preventextensions
  $$7({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$4, sham: !FREEZING$1 }, {
    preventExtensions: function preventExtensions(it) {
      return nativePreventExtensions && isObject(it) ? nativePreventExtensions(onFreeze(it)) : it;
    }
  });

  var es_object_getPrototypeOf = {};

  var $$6 = _export;
  var fails$5 = fails$k;
  var toObject$2 = toObject$6;
  var nativeGetPrototypeOf = objectGetPrototypeOf;
  var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

  var FAILS_ON_PRIMITIVES$3 = fails$5(function() { nativeGetPrototypeOf(1); });

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  $$6({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3, sham: !CORRECT_PROTOTYPE_GETTER$1 }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject$2(it));
    }
  });

  var DESCRIPTORS$4 = !!function() {
    try {
      return Object.defineProperty({}, 'a', {
        get: function get() {
          return 7;
        }
      }).a === 7;
    } catch(_unused) {
      /* empty */
    }
  }();
  var GLOBAL = Function('return this')();
  var NATIVE = GLOBAL.NATIVE || false;
  var TYPED_ARRAYS = {
    Float32Array: 4,
    Float64Array: 8,
    Int8Array: 1,
    Int16Array: 2,
    Int32Array: 4,
    Uint8Array: 1,
    Uint16Array: 2,
    Uint32Array: 4,
    Uint8ClampedArray: 1
  };
  var LITTLE_ENDIAN = function() {
    try {
      return new GLOBAL.Uint8Array(new GLOBAL.Uint16Array([1]).buffer)[0] === 1;
    } catch(_unused2) {
      return true;
    }
  }();
  var PROTO = !!Object.setPrototypeOf || '__proto__' in Object.prototype;
  var STRICT = !function() {
    return this;
  }();
  var STRICT_THIS = function() {
    return this;
  }();
  var FREEZING = !function() {
    try {
      return Object.isExtensible(Object.preventExtensions({}));
    } catch(_unused3) {
      return true;
    }
  }();
  var CORRECT_PROTOTYPE_GETTER = !function() {
    try {
      var F = function F() {
        /* empty */
      };

      F.prototype.constructor = null;
      return Object.getPrototypeOf(new F()) !== F.prototype;
    } catch(_unused4) {
      return true;
    }
  }();
  var WHITESPACES = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if(typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var REACT_ELEMENT_TYPE;

  function _jsx(type, props, key, children) {
    if(!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if(!props && childrenLength !== 0) {
      props = {
        children: void 0
      };
    }

    if(childrenLength === 1) {
      props.children = children;
    } else if(childrenLength > 1) {
      var childArray = new Array(childrenLength);

      for(var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    if(props && defaultProps) {
      for(var propName in defaultProps) {
        if(props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if(!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null
    };
  }

  function _asyncIterator(iterable) {
    var method;

    if(typeof Symbol !== "undefined") {
      if(Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator];
        if(method != null) return method.call(iterable);
      }

      if(Symbol.iterator) {
        method = iterable[Symbol.iterator];
        if(method != null) return method.call(iterable);
      }
    }

    throw new TypeError("Object is not async iterable");
  }

  function _AwaitValue(value) {
    this.wrapped = value;
  }

  function _AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function(resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if(back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;
        var wrappedAwait = value instanceof _AwaitValue;
        Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg) {
          if(wrappedAwait) {
            resume(key === "return" ? "return" : "next", arg);
            return;
          }

          settle(result.done ? "return" : "normal", arg);
        }, function(err) {
          resume("throw", err);
        });
      } catch(err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch(type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if(front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if(typeof gen["return"] !== "function") {
      this["return"] = undefined;
    }
  }

  if(typeof Symbol === "function" && Symbol.asyncIterator) {
    _AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
      return this;
    };
  }

  _AsyncGenerator.prototype.next = function(arg) {
    return this._invoke("next", arg);
  };

  _AsyncGenerator.prototype["throw"] = function(arg) {
    return this._invoke("throw", arg);
  };

  _AsyncGenerator.prototype["return"] = function(arg) {
    return this._invoke("return", arg);
  };

  function _wrapAsyncGenerator(fn) {
    return function() {
      return new _AsyncGenerator(fn.apply(this, arguments));
    };
  }

  function _awaitAsyncGenerator(value) {
    return new _AwaitValue(value);
  }

  function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {},
      waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function(resolve) {
        resolve(inner[key](value));
      });
      return {
        done: false,
        value: awaitWrap(value)
      };
    }

    ;

    if(typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function() {
        return this;
      };
    }

    iter.next = function(value) {
      if(waiting) {
        waiting = false;
        return value;
      }

      return pump("next", value);
    };

    if(typeof inner["throw"] === "function") {
      iter["throw"] = function(value) {
        if(waiting) {
          waiting = false;
          throw value;
        }

        return pump("throw", value);
      };
    }

    if(typeof inner["return"] === "function") {
      iter["return"] = function(value) {
        if(waiting) {
          waiting = false;
          return value;
        }

        return pump("return", value);
      };
    }

    return iter;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch(error) {
      reject(error);
      return;
    }

    if(info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function() {
      var self = this,
        args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if(!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if(protoProps) _defineProperties(Constructor.prototype, protoProps);
    if(staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineEnumerableProperties(obj, descs) {
    for(var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    if(Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);

      for(var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }

    return obj;
  }

  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for(var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if(value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  }

  function _defineProperty(obj, key, value) {
    if(key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function(target) {
      for(var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for(var key in source) {
          if(Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);

      if(typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if(Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if(enumerableOnly) symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if(i % 2) {
        ownKeys$1(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if(Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if(typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if(superClass) _setPrototypeOf(subClass, superClass);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if(typeof Reflect === "undefined" || !Reflect.construct) return false;
    if(Reflect.construct.sham) return false;
    if(typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() { }));
      return true;
    } catch(e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if(_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if(Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if(Class === null || !_isNativeFunction(Class)) return Class;

      if(typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if(typeof _cache !== "undefined") {
        if(_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _instanceof(left, right) {
    if(right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _getRequireWildcardCache() {
    if(typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function() {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if(obj && obj.__esModule) {
      return obj;
    }

    if(obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }

    var cache = _getRequireWildcardCache();

    if(cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for(var key in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if(desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj["default"] = obj;

    if(cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  function _newArrowCheck(innerThis, boundThis) {
    if(innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  function _objectDestructuringEmpty(obj) {
    if(obj == null) throw new TypeError("Cannot destructure undefined");
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if(source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for(i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if(excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if(source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if(Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for(i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if(excluded.indexOf(key) >= 0) continue;
        if(!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if(self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if(call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;

      if(hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if(object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if(typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if(!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if(desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function set(target, property, value, receiver) {
    if(typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if(base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if(desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if(!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if(desc) {
          if(!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);

    if(!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  function _taggedTemplateLiteral(strings, raw) {
    if(!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  function _taggedTemplateLiteralLoose(strings, raw) {
    if(!raw) {
      raw = strings.slice(0);
    }

    strings.raw = raw;
    return strings;
  }

  function _readOnlyError(name) {
    throw new TypeError("\"" + name + "\" is read-only");
  }

  function _writeOnlyError(name) {
    throw new TypeError("\"" + name + "\" is write-only");
  }

  function _classNameTDZError(name) {
    throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
  }

  function _temporalUndefined() { }

  function _tdz(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }

  function _temporalRef(val, name) {
    return val === _temporalUndefined ? _tdz(name) : val;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _slicedToArrayLoose(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if(Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if(Array.isArray(arr)) return arr;
  }

  function _maybeArrayLike(next, arr, i) {
    if(arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return _arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }

    return next(arr, i);
  }

  function _iterableToArray(iter) {
    if(typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if(typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if(i && _arr.length === i) break;
      }
    } catch(err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if(!_n && _i["return"] != null) _i["return"]();
      } finally {
        if(_d) throw _e;
      }
    }

    return _arr;
  }

  function _iterableToArrayLimitLoose(arr, i) {
    if(typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];

    for(var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if(i && _arr.length === i) break;
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if(!o) return;
    if(typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if(n === "Object" && o.constructor) n = o.constructor.name;
    if(n === "Map" || n === "Set") return Array.from(o);
    if(n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if(len == null || len > arr.length) len = arr.length;

    for(var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if(typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if(Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if(it) o = it;
        var i = 0;

        var F = function() { };

        return {
          s: F,
          n: function() {
            if(i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function(e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function() {
        it = o[Symbol.iterator]();
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if(!normalCompletion && it["return"] != null) it["return"]();
        } finally {
          if(didErr) throw err;
        }
      }
    };
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if(typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if(Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if(it) o = it;
        var i = 0;
        return function() {
          if(i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }

  function _skipFirstGeneratorNext(fn) {
    return function() {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    };
  }

  function _toPrimitive(input, hint) {
    if(typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];

    if(prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if(typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }

    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");

    return typeof key === "symbol" ? key : String(key);
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.');
  }

  function _initializerDefineProperty(target, property, descriptor, context) {
    if(!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if(context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if(desc.initializer === void 0) {
      Object.defineProperty(target, property, desc);
      desc = null;
    }

    return desc;
  }

  var id = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }

  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if(!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

    return _classApplyDescriptorGet(receiver, descriptor);
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

    _classApplyDescriptorSet(receiver, descriptor, value);

    return value;
  }

  function _classPrivateFieldDestructureSet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

    return _classApplyDescriptorDestructureSet(receiver, descriptor);
  }

  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if(!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }

    return privateMap.get(receiver);
  }

  function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    _classCheckPrivateStaticFieldDescriptor(descriptor, "get");

    return _classApplyDescriptorGet(receiver, descriptor);
  }

  function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    _classCheckPrivateStaticFieldDescriptor(descriptor, "set");

    _classApplyDescriptorSet(receiver, descriptor, value);

    return value;
  }

  function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    return method;
  }

  function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }

  function _classApplyDescriptorGet(receiver, descriptor) {
    if(descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if(descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if(!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }
  }

  function _classApplyDescriptorDestructureSet(receiver, descriptor) {
    if(descriptor.set) {
      if(!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v);
          }

        };
      }

      return descriptor.__destrObj;
    } else {
      if(!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }

  function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
    _classCheckPrivateStaticAccess(receiver, classConstructor);

    _classCheckPrivateStaticFieldDescriptor(descriptor, "set");

    return _classApplyDescriptorDestructureSet(receiver, descriptor);
  }

  function _classCheckPrivateStaticAccess(receiver, classConstructor) {
    if(receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
  }

  function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
    if(descriptor === undefined) {
      throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
  }

  function _decorate(decorators, factory, superClass, mixins) {
    var api = _getDecoratorsApi();

    if(mixins) {
      for(var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
    api.initializeClassElements(r.F, decorated.elements);
    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],
      initializeInstanceElements: function(O, elements) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element) {
            if(element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },
      initializeClassElements: function(F, elements) {
        var proto = F.prototype;
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element) {
            var placement = element.placement;

            if(element.kind === kind && (placement === "static" || placement === "prototype")) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },
      defineClassElement: function(receiver, element) {
        var descriptor = element.descriptor;

        if(element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver)
          };
        }

        Object.defineProperty(receiver, element.key, descriptor);
      },
      decorateClass: function(elements, decorators) {
        var newElements = [];
        var finishers = [];
        var placements = {
          "static": [],
          prototype: [],
          own: []
        };
        elements.forEach(function(element) {
          this.addElementPlacement(element, placements);
        }, this);
        elements.forEach(function(element) {
          if(!_hasDecorators(element)) return newElements.push(element);
          var elementFinishersExtras = this.decorateElement(element, placements);
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if(!decorators) {
          return {
            elements: newElements,
            finishers: finishers
          };
        }

        var result = this.decorateConstructor(newElements, decorators);
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;
        return result;
      },
      addElementPlacement: function(element, placements, silent) {
        var keys = placements[element.placement];

        if(!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }

        keys.push(element.key);
      },
      decorateElement: function(element, placements) {
        var extras = [];
        var finishers = [];

        for(var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);
          var elementObject = this.fromElementDescriptor(element);
          var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if(elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras = elementFinisherExtras.extras;

          if(newExtras) {
            for(var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }

            extras.push.apply(extras, newExtras);
          }
        }

        return {
          element: element,
          finishers: finishers,
          extras: extras
        };
      },
      decorateConstructor: function(elements, decorators) {
        var finishers = [];

        for(var i = decorators.length - 1; i >= 0; i--) {
          var obj = this.fromClassDescriptor(elements);
          var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

          if(elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if(elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for(var j = 0; j < elements.length - 1; j++) {
              for(var k = j + 1; k < elements.length; k++) {
                if(elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                  throw new TypeError("Duplicated element (" + elements[j].key + ")");
                }
              }
            }
          }
        }

        return {
          elements: elements,
          finishers: finishers
        };
      },
      fromElementDescriptor: function(element) {
        var obj = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor
        };
        var desc = {
          value: "Descriptor",
          configurable: true
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);
        if(element.kind === "field") obj.initializer = element.initializer;
        return obj;
      },
      toElementDescriptors: function(elementObjects) {
        if(elementObjects === undefined) return;
        return _toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },
      toElementDescriptor: function(elementObject) {
        var kind = String(elementObject.kind);

        if(kind !== "method" && kind !== "field") {
          throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
        }

        var key = _toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);

        if(placement !== "static" && placement !== "prototype" && placement !== "own") {
          throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
        }

        var descriptor = elementObject.descriptor;
        this.disallowProperty(elementObject, "elements", "An element descriptor");
        var element = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor)
        };

        if(kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
          this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
          this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
          element.initializer = elementObject.initializer;
        }

        return element;
      },
      toElementFinisherExtras: function(elementObject) {
        var element = this.toElementDescriptor(elementObject);

        var finisher = _optionalCallableProperty(elementObject, "finisher");

        var extras = this.toElementDescriptors(elementObject.extras);
        return {
          element: element,
          finisher: finisher,
          extras: extras
        };
      },
      fromClassDescriptor: function(elements) {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this)
        };
        var desc = {
          value: "Descriptor",
          configurable: true
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);
        return obj;
      },
      toClassDescriptor: function(obj) {
        var kind = String(obj.kind);

        if(kind !== "class") {
          throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");

        var elements = this.toElementDescriptors(obj.elements);
        return {
          elements: elements,
          finisher: finisher
        };
      },
      runClassFinishers: function(constructor, finishers) {
        for(var i = 0; i < finishers.length; i++) {
          var newConstructor = (0, finishers[i])(constructor);

          if(newConstructor !== undefined) {
            if(typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }

            constructor = newConstructor;
          }
        }

        return constructor;
      },
      disallowProperty: function(obj, name, objectType) {
        if(obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };
    return api;
  }

  function _createElementDescriptor(def) {
    var key = _toPropertyKey(def.key);

    var descriptor;

    if(def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false
      };
    } else if(def.kind === "get") {
      descriptor = {
        get: def.value,
        configurable: true,
        enumerable: false
      };
    } else if(def.kind === "set") {
      descriptor = {
        set: def.value,
        configurable: true,
        enumerable: false
      };
    } else if(def.kind === "field") {
      descriptor = {
        configurable: true,
        writable: true,
        enumerable: true
      };
    }

    var element = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype",
      descriptor: descriptor
    };
    if(def.decorators) element.decorators = def.decorators;
    if(def.kind === "field") element.initializer = def.value;
    return element;
  }

  function _coalesceGetterSetter(element, other) {
    if(element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  function _coalesceClassElements(elements) {
    var newElements = [];

    var isSameElement = function(other) {
      return other.kind === "method" && other.key === element.key && other.placement === element.placement;
    };

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var other;

      if(element.kind === "method" && (other = newElements.find(isSameElement))) {
        if(_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
          if(_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
          }

          other.descriptor = element.descriptor;
        } else {
          if(_hasDecorators(element)) {
            if(_hasDecorators(other)) {
              throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
            }

            other.decorators = element.decorators;
          }

          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc) {
    return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
  }

  function _optionalCallableProperty(obj, name) {
    var value = obj[name];

    if(value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }

    return value;
  }

  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if(!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    return fn;
  }

  function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }

  function _wrapRegExp(re, groups) {
    _wrapRegExp = function(re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = _wrapNativeSuper(RegExp);

    var _super = RegExp.prototype;

    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);

      _groups.set(_this, groups || _groups.get(re));

      return _this;
    }

    _inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function(str) {
      var result = _super.exec.call(this, str);

      if(result) result.groups = buildGroups(result, this);
      return result;
    };

    BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
      if(typeof substitution === "string") {
        var groups = _groups.get(this);

        return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function(_, name) {
          return "$" + groups[name];
        }));
      } else if(typeof substitution === "function") {
        var _this = this;

        return _super[Symbol.replace].call(this, str, function() {
          var args = [];
          args.push.apply(args, arguments);

          if(typeof args[args.length - 1] !== "object") {
            args.push(buildGroups(args, _this));
          }

          return substitution.apply(this, args);
        });
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    };

    function buildGroups(result, re) {
      var g = _groups.get(re);

      return Object.keys(g).reduce(function(groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }

  function createIterator(elements, methods) {
    var index = 0;
    var iterator = {
      called: false,
      next: function next() {
        iterator.called = true;
        return {
          value: elements[index++],
          done: index > elements.length
        };
      }
    };
    if(methods) for(var key in methods) {
      iterator[key] = methods[key];
    }
    return iterator;
  }
  function createIterable(elements, methods) {
    var _iterable;

    var iterable = (_iterable = {
      called: false,
      received: false
    }, _iterable[Symbol.iterator] = function() {
      iterable.received = true;
      var index = 0;
      var iterator = {
        next: function next() {
          iterable.called = true;
          return {
            value: elements[index++],
            done: index > elements.length
          };
        }
      };
      if(methods) for(var key in methods) {
        iterator[key] = methods[key];
      }
      return iterator;
    }, _iterable);
    return iterable;
  }
  function includes(target, wanted) {
    var _iterator = _createForOfIteratorHelper(target),
      _step;

    try {
      for(_iterator.s(); !(_step = _iterator.n()).done;) {
        var element = _step.value;
        if(wanted === element) return true;
      }
    } catch(err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return false;
  }
  function is(a, b) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return a === b ? a !== 0 || 1 / a === 1 / b : a != a && b != b;
  }
  var nativeSubclass = function() {
    try {
      if(Function("\n'use strict';\nclass Subclass extends Object { /* empty */ };\nreturn new Subclass() instanceof Subclass;\n\t\t")()) return Function('Parent', "\n'use strict';\nreturn class extends Parent { /* empty */ };\n\t\t");
    } catch(_unused) {
      /* empty */
    }
  }(); // export function timeLimitedPromise(time, fn) {
  // 	return Promise.race([
  // 		new Promise(fn), new Promise((resolve, reject) => {
  // 			setTimeout(reject, time);
  // 		}),
  // 	]);
  // }
  // // This function is used to force RegExp.prototype[Symbol.*] methods
  // // to not use the native implementation.
  // export function patchRegExp$exec(run) {
  // 	return assert => {
  // 		const originalExec = RegExp.prototype.exec;
  // 		// eslint-disable-next-line no-extend-native -- required for testing
  // 		RegExp.prototype.exec = function() {
  // 			return originalExec.apply(this, arguments);
  // 		};
  // 		try {
  // 			return run(assert);
  // 			// eslint-disable-next-line no-useless-catch -- in very old IE try / finally does not work without catch
  // 		} catch(error) {
  // 			throw error;
  // 		} finally {
  // 			// eslint-disable-next-line no-extend-native -- required for testing
  // 			RegExp.prototype.exec = originalExec;
  // 		}
  // 	};
  // }

  function isIterable(it) {
    var O = Object(it);
    return Symbol.iterator in O;
  }

  var _Object$prototype = Object.prototype,
    toString = _Object$prototype.toString,
    propertyIsEnumerable = _Object$prototype.propertyIsEnumerable;
  GLOBAL.USE_FUNCTION_CONSTRUCTOR = true;

  QUnit.assert.pushResult = function(options) {
    return QUnit.push(options.result, options.actual, options.expected, options.message);
  };

  QUnit.assert.arity = function(fn, length, message) {
    this.pushResult({
      result: fn.length === length,
      actual: fn.length,
      expected: length,
      message: message || "arity is " + length
    });
  };

  QUnit.assert.arrayEqual = function(a, b, message) {
    var result = true;

    if(a.length !== b.length) {
      result = false;
    } else {
      for(var i = 0, length = a.length; i < length; ++i) {
        if(!is(a[i], b[i])) {
          result = false;
          break;
        }
      }
    }

    this.pushResult({
      result: result,
      actual: [].slice.call(a),
      expected: [].slice.call(b),
      message: message
    });
  };

  QUnit.assert.epsilon = function(a, b, E, message) {
    this.pushResult({
      result: Math.abs(a - b) <= (E != null ? E : 1e-11),
      actual: a,
      expected: b,
      message: message
    });
  };

  QUnit.assert.isFunction = function(fn, message) {
    this.pushResult({
      result: typeof fn === 'function' || toString.call(fn).slice(8, -1) === 'Function',
      actual: false,
      expected: true,
      message: message || 'is function'
    });
  };

  QUnit.assert.isAsyncIterable = function(it, message) {// this.pushResult({
    // 	result: typeof it == 'object' && typeof it[ASYNC_ITERATOR] == 'function',
    // 	actual: false,
    // 	expected: true,
    // 	message: message || 'is async iterable',
    // });
  };

  QUnit.assert.isIterable = function(it, message) {
    this.pushResult({
      result: isIterable(it),
      actual: false,
      expected: true,
      message: message || 'is iterable'
    });
  };

  QUnit.assert.isIterator = function(it, message) {
    this.pushResult({
      result: typeof it === 'object' && typeof it.next === 'function',
      actual: false,
      expected: true,
      message: message || 'is iterator'
    });
  };

  QUnit.assert.looksNative = function(fn, message) {
    // this.pushResult({
    // 	result: /native code/.test(Function.prototype.toString.call(fn)),
    // 	actual: false,
    // 	expected: true,
    // 	message: message || 'looks native',
    // });
    this.ok(true, "no support looksNative");
  };

  QUnit.assert.name = function(fn, name, message) {
    if(typeof fn == 'function' && 'name' in fn) {
      this.pushResult({
        result: fn.name === name,
        actual: fn.name,
        expected: name,
        message: message || "name is '" + name + "'"
      });
    } else {
      this.pushResult({
        result: true,
        actual: true,
        expected: true,
        message: 'Function#name property test makes no sense'
      });
    }
  };

  QUnit.assert.enumerable = function(O, key, message) {
    if(DESCRIPTORS$4) {
      this.pushResult({
        result: propertyIsEnumerable.call(O, key),
        actual: false,
        expected: true,
        message: message || (typeof key === 'symbol' ? 'method' : "'" + key + "'") + " is enumerable"
      });
    } else {
      this.pushResult({
        result: true,
        actual: true,
        expected: true,
        message: 'Enumerability is not applicable'
      });
    }
  };

  QUnit.assert.nonEnumerable = function(O, key, message) {
    this.ok(true, "no support enumerable"); // if(DESCRIPTORS) {
    // 	this.pushResult({
    // 		result: !propertyIsEnumerable.call(O, key),
    // 		actual: false,
    // 		expected: true,
    // 		message: message || `${typeof key === 'symbol' ? 'method' : `'${key}'`} is non-enumerable`,
    // 	});
    // } else {
    // 	this.pushResult({
    // 		result: true,
    // 		actual: true,
    // 		expected: true,
    // 		message: 'Enumerability is not applicable',
    // 	});
    // }
  };

  QUnit.assert.notThrows = function(fn, message) {
    var _throws, result, error;

    try {
      result = fn();
      _throws = false;
    } catch(err) {
      _throws = true;
      error = err;
    }

    this.pushResult({
      result: !_throws && result,
      actual: _throws ? error : result,
      expected: _throws ? undefined : true,
      message: message || 'does not throw'
    });
  };

  QUnit.assert.same = function(a, b, message) {
    this.pushResult({
      result: is(a, b),
      actual: a,
      expected: b,
      message: message
    });
  };

  var es_object_defineProperties = {};

  var $$5 = _export;
  var DESCRIPTORS$3 = descriptors;
  var defineProperties$1 = objectDefineProperties;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  $$5({ target: 'Object', stat: true, forced: !DESCRIPTORS$3, sham: !DESCRIPTORS$3 }, {
    defineProperties: defineProperties$1
  });

  var es_object_getOwnPropertyDescriptor = {};

  var $$4 = _export;
  var fails$4 = fails$k;
  var toIndexedObject = toIndexedObject$8;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var DESCRIPTORS$2 = descriptors;

  var FAILS_ON_PRIMITIVES$2 = fails$4(function() { nativeGetOwnPropertyDescriptor(1); });
  var FORCED$1 = !DESCRIPTORS$2 || FAILS_ON_PRIMITIVES$2;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  $$4({ target: 'Object', stat: true, forced: FORCED$1, sham: !DESCRIPTORS$2 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
    }
  });

  var es_object_getOwnPropertyNames = {};

  var $$3 = _export;
  var fails$3 = fails$k;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;

  var FAILS_ON_PRIMITIVES$1 = fails$3(function() { return !Object.getOwnPropertyNames(1); });

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  $$3({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    getOwnPropertyNames: nativeGetOwnPropertyNames
  });

  var es_object_keys = {};

  var $$2 = _export;
  var toObject$1 = toObject$6;
  var nativeKeys = objectKeys$2;
  var fails$2 = fails$k;

  var FAILS_ON_PRIMITIVES = fails$2(function() { nativeKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$2({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return nativeKeys(toObject$1(it));
    }
  });

  var es_object_create = {};

  var $$1 = _export;
  var DESCRIPTORS$1 = descriptors;
  var create$1 = objectCreate;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  $$1({ target: 'Object', stat: true, sham: !DESCRIPTORS$1 }, {
    create: create$1
  });

  var es_symbol_toPrimitive = {};

  var defineWellKnownSymbol$3 = defineWellKnownSymbol$6;

  // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive
  defineWellKnownSymbol$3('toPrimitive');

  var es_date_toPrimitive = {};

  'use strict';
  var anObject = anObject$9;
  var toPrimitive = toPrimitive$5;

  var dateToPrimitive$1 = function(hint) {
    if(hint !== 'string' && hint !== 'number' && hint !== 'default') {
      throw TypeError('Incorrect hint');
    } return toPrimitive(anObject(this), hint !== 'number');
  };

  var createNonEnumerableProperty = createNonEnumerableProperty$9;
  var dateToPrimitive = dateToPrimitive$1;
  var wellKnownSymbol$1 = wellKnownSymbol$e;

  var TO_PRIMITIVE = wellKnownSymbol$1('toPrimitive');
  var DatePrototype = Date.prototype;

  // `Date.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
  if(!(TO_PRIMITIVE in DatePrototype)) {
    createNonEnumerableProperty(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
  }

  var es_symbol_toStringTag = {};

  var defineWellKnownSymbol$2 = defineWellKnownSymbol$6;

  // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag
  defineWellKnownSymbol$2('toStringTag');

  var es_json_toStringTag = {};

  var global$1 = global$g;
  var setToStringTag$1 = setToStringTag$5;

  // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag
  setToStringTag$1(global$1.JSON, 'JSON', true);

  var es_math_toStringTag = {};

  var setToStringTag = setToStringTag$5;

  // Math[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-math-@@tostringtag
  setToStringTag(Math, 'Math', true);

  var es_array_sort = {};

  'use strict';
  var fails$1 = fails$k;

  var arrayMethodIsStrict$1 = function(METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$1(function() {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function() { throw 1; }, 1);
    });
  };

  'use strict';
  var $ = _export;
  var aFunction = aFunction$2;
  var toObject = toObject$6;
  var fails = fails$k;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;

  var test = [];
  var nativeSort = test.sort;

  // IE8-
  var FAILS_ON_UNDEFINED = fails(function() {
    test.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails(function() {
    test.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD = arrayMethodIsStrict('sort');

  var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $({ target: 'Array', proto: true, forced: FORCED }, {
    sort: function sort(comparefn) {
      return comparefn === undefined
        ? nativeSort.call(toObject(this))
        : nativeSort.call(toObject(this), aFunction(comparefn));
    }
  });

  var es_symbol_species = {};

  var defineWellKnownSymbol$1 = defineWellKnownSymbol$6;

  // `Symbol.species` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.species
  defineWellKnownSymbol$1('species');

  var es_array_species = {};

  'use strict';
  var getBuiltIn = getBuiltIn$5;
  var definePropertyModule = objectDefineProperty;
  var wellKnownSymbol = wellKnownSymbol$e;
  var DESCRIPTORS = descriptors;

  var SPECIES = wellKnownSymbol('species');

  var setSpecies$1 = function(CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule.f;

    if(DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function() { return this; }
      });
    }
  };

  var setSpecies = setSpecies$1;

  // `Array[@@species]` getter
  // https://tc39.es/ecma262/#sec-get-array-@@species
  setSpecies('Array');

  var defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getOwnPropertyNames = Object.getOwnPropertyNames,
    getOwnPropertySymbols = Object.getOwnPropertySymbols,
    keys = Object.keys,
    create = Object.create;

  var _ref = GLOBAL.Reflect || {},
    ownKeys = _ref.ownKeys;

  QUnit.test('Symbol', function(assert) {
    assert.isFunction(Symbol);
    if(NATIVE) assert.strictEqual(Symbol.length, 0, 'arity is 0');
    assert.name(Symbol, 'Symbol');
    assert.looksNative(Symbol);
    var symbol1 = Symbol('symbol');
    var symbol2 = Symbol('symbol');
    assert.ok(symbol1 !== symbol2, 'Symbol("symbol") !== Symbol("symbol")');
    var object = {};
    object[symbol1] = 42;
    assert.ok(object[symbol1] === 42, 'Symbol() work as key');
    assert.ok(object[symbol2] !== 42, 'Various symbols from one description are various keys');

    if(DESCRIPTORS$4) {
      var count = 0; // eslint-disable-next-line no-unused-vars -- required for testing

      for(var key in object) {
        count++;
        console.log(key);
      }

      assert.ok(count === 0, 'object[Symbol()] is not enumerable');
    }
  });
  QUnit.test('Well-known Symbols', function(assert) {
    var wks = ['hasInstance', 'isConcatSpreadable', 'iterator', 'match', 'matchAll', 'replace', 'search', 'species', 'split', 'toPrimitive', 'toStringTag', 'unscopables'];

    for(var _i = 0, _wks = wks; _i < _wks.length; _i++) {
      var name = _wks[_i];
      assert.ok(name in Symbol, "Symbol." + name + " available"); // assert.ok(Object(Symbol[name]) instanceof Symbol, `Symbol.${name} is symbol`);
      // if(DESCRIPTORS) {
      //   const descriptor = getOwnPropertyDescriptor(Symbol, name);
      //   assert.ok(!descriptor.enumerble, 'non-enumerable');
      //   assert.ok(!descriptor.writable, 'non-writable');
      //   assert.ok(!descriptor.configurable, 'non-configurable');
      // }
    }
  });
  QUnit.test('Global symbol registry', function(assert) {
    assert.isFunction(Symbol["for"], 'Symbol.for is function');
    assert.nonEnumerable(Symbol, 'for');
    assert.strictEqual(Symbol["for"].length, 1, 'Symbol.for arity is 1');
    if(NATIVE) assert.strictEqual(Symbol["for"].name, 'for', 'Symbol.for.name is "for"');
    assert.looksNative(Symbol["for"], 'Symbol.for looks like native');
    assert.isFunction(Symbol.keyFor, 'Symbol.keyFor is function');
    assert.nonEnumerable(Symbol, 'keyFor');
    assert.strictEqual(Symbol.keyFor.length, 1, 'Symbol.keyFor arity is 1');
    assert.strictEqual(Symbol.keyFor.name, 'keyFor', 'Symbol.keyFor.name is "keyFor"');
    assert.looksNative(Symbol.keyFor, 'Symbol.keyFor looks like native');
    var symbol = Symbol["for"]('foo');
    assert.strictEqual(Symbol["for"]('foo'), symbol);
    assert.strictEqual(Symbol.keyFor(symbol), 'foo');
    assert["throws"](function() {
      return Symbol.keyFor('foo');
    }, 'throws on non-symbol');
  });
  QUnit.test('Symbol#@@toPrimitive', function(assert) {
    var symbol = Symbol();
    assert.isFunction(Symbol.prototype[Symbol.toPrimitive]);
    assert.same(symbol, symbol[Symbol.toPrimitive](), 'works');
  });
  QUnit.test('Symbol#@@toStringTag', function(assert) {
    assert.ok(Symbol.prototype[Symbol.toStringTag] === 'Symbol', 'Symbol::@@toStringTag is `Symbol`');
  });
  QUnit.test('Object.getOwnPropertySymbols', function(assert) {
    assert.isFunction(getOwnPropertySymbols);
    assert.nonEnumerable(Object, 'getOwnPropertySymbols');
    assert.strictEqual(getOwnPropertySymbols.length, 1, 'arity is 1');
    assert.name(getOwnPropertySymbols, 'getOwnPropertySymbols');
    assert.looksNative(getOwnPropertySymbols);
    var prototype = {
      q: 1,
      w: 2,
      e: 3
    };
    prototype[Symbol()] = 42;
    prototype[Symbol()] = 43;
    assert.deepEqual(getOwnPropertyNames(prototype).sort(), ['e', 'q', 'w']);
    assert.strictEqual(getOwnPropertySymbols(prototype).length, 2);
    var object = create(prototype);
    object.a = 1;
    object.s = 2;
    object.d = 3;
    object[Symbol()] = 44;
    assert.deepEqual(getOwnPropertyNames(object).sort(), ['a', 'd', 's']);
    assert.strictEqual(getOwnPropertySymbols(object).length, 1);
    assert.strictEqual(getOwnPropertySymbols(Object.prototype).length, 0);
    var primitives = [42, 'foo', false];

    var _loop = function _loop() {
      var value = _primitives[_i2];
      assert.notThrows(function() {
        return getOwnPropertySymbols(value);
      }, "accept " + typeof value);
    };

    for(var _i2 = 0, _primitives = primitives; _i2 < _primitives.length; _i2++) {
      _loop();
    }
  });

  if(JSON) {
    QUnit.test('Symbols & JSON.stringify', function(assert) {
      assert.strictEqual(JSON.stringify([1, Symbol('foo'), false, Symbol('bar'), {}]), '[1,null,false,null,{}]', 'array value');
      assert.strictEqual(JSON.stringify({
        symbol: Symbol('symbol')
      }), '{}', 'object value');

      if(DESCRIPTORS$4) {
        var object = {
          bar: 2
        };
        object[Symbol('symbol')] = 1;
        assert.strictEqual(JSON.stringify(object), '{"bar":2}', 'object key');
      }

      assert.strictEqual(JSON.stringify(Symbol('symbol')), undefined, 'symbol value');

      if(typeof Symbol() === 'symbol') {
        assert.strictEqual(JSON.stringify(Object(Symbol('symbol'))), '{}', 'boxed symbol');
      }

      assert.strictEqual(JSON.stringify(undefined, function() {
        return 42;
      }), '42', 'replacer works with top-level undefined');
    });
  }

  if(DESCRIPTORS$4) {
    QUnit.test('Symbols & descriptors', function(assert) {
      var d = Symbol('d');
      var e = Symbol('e');
      var f = Symbol('f');
      var i = Symbol('i');
      var j = Symbol('j');
      var prototype = {
        g: 'g'
      };
      prototype[i] = 'i';
      defineProperty(prototype, 'h', {
        value: 'h'
      });
      defineProperty(prototype, 'j', {
        value: 'j'
      });
      var object = create(prototype);
      object.a = 'a';
      object[d] = 'd';
      defineProperty(object, 'b', {
        value: 'b'
      });
      defineProperty(object, 'c', {
        value: 'c',
        enumerable: true
      });
      defineProperty(object, e, {
        configurable: true,
        writable: true,
        value: 'e'
      });
      var descriptor = {
        value: 'f',
        enumerable: true
      };
      defineProperty(object, f, descriptor);
      assert.strictEqual(descriptor.enumerable, true, 'defineProperty not changes descriptor object');
      assert.deepEqual(getOwnPropertyDescriptor(object, 'a'), {
        configurable: true,
        writable: true,
        enumerable: true,
        value: 'a'
      }, 'getOwnPropertyDescriptor a');
      assert.deepEqual(getOwnPropertyDescriptor(object, 'b'), {
        configurable: false,
        writable: false,
        enumerable: false,
        value: 'b'
      }, 'getOwnPropertyDescriptor b');
      assert.deepEqual(getOwnPropertyDescriptor(object, 'c'), {
        configurable: false,
        writable: false,
        enumerable: true,
        value: 'c'
      }, 'getOwnPropertyDescriptor c');
      assert.deepEqual(getOwnPropertyDescriptor(object, d), {
        configurable: true,
        writable: true,
        enumerable: true,
        value: 'd'
      }, 'getOwnPropertyDescriptor d');
      assert.deepEqual(getOwnPropertyDescriptor(object, e), {
        configurable: true,
        writable: true,
        enumerable: false,
        value: 'e'
      }, 'getOwnPropertyDescriptor e');
      assert.deepEqual(getOwnPropertyDescriptor(object, f), {
        configurable: false,
        writable: false,
        enumerable: true,
        value: 'f'
      }, 'getOwnPropertyDescriptor f');
      assert.strictEqual(getOwnPropertyDescriptor(object, 'g'), undefined, 'getOwnPropertyDescriptor g');
      assert.strictEqual(getOwnPropertyDescriptor(object, 'h'), undefined, 'getOwnPropertyDescriptor h');
      assert.strictEqual(getOwnPropertyDescriptor(object, i), undefined, 'getOwnPropertyDescriptor i');
      assert.strictEqual(getOwnPropertyDescriptor(object, j), undefined, 'getOwnPropertyDescriptor j');
      assert.strictEqual(getOwnPropertyDescriptor(object, 'k'), undefined, 'getOwnPropertyDescriptor k');
      assert.strictEqual(getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable, false, 'getOwnPropertyDescriptor on Object.prototype');
      assert.strictEqual(getOwnPropertyDescriptor(Object.prototype, d), undefined, 'getOwnPropertyDescriptor on Object.prototype missed symbol');
      assert.strictEqual(keys(object).length, 2, 'Object.keys');
      assert.strictEqual(getOwnPropertyNames(object).length, 3, 'Object.getOwnPropertyNames');
      assert.strictEqual(getOwnPropertySymbols(object).length, 3, 'Object.getOwnPropertySymbols');
      assert.strictEqual(ownKeys(object).length, 6, 'Reflect.ownKeys');
      delete object[e];
      object[e] = 'e';
      assert.deepEqual(getOwnPropertyDescriptor(object, e), {
        configurable: true,
        writable: true,
        enumerable: true,
        value: 'e'
      }, 'redefined non-enum key');
    });
    QUnit.test('Symbols & Object.defineProperties', function(assert) {
      var c = Symbol('c');
      var d = Symbol('d');
      var descriptors = {
        a: {
          value: 'a'
        }
      };
      descriptors[c] = {
        value: 'c'
      };
      defineProperty(descriptors, 'b', {
        value: {
          value: 'b'
        }
      });
      defineProperty(descriptors, d, {
        value: {
          value: 'd'
        }
      });
      var object = defineProperties({}, descriptors);
      assert.strictEqual(object.a, 'a', 'a');
      assert.strictEqual(object.b, undefined, 'b');
      assert.strictEqual(object[c], 'c', 'c');
      assert.strictEqual(object[d], undefined, 'd');
    });
    QUnit.test('Symbols & Object.create', function(assert) {
      var c = Symbol('c');
      var d = Symbol('d');
      var descriptors = {
        a: {
          value: 'a'
        }
      };
      descriptors[c] = {
        value: 'c'
      };
      defineProperty(descriptors, 'b', {
        value: {
          value: 'b'
        }
      });
      defineProperty(descriptors, d, {
        value: {
          value: 'd'
        }
      });
      var object = create(null, descriptors);
      assert.strictEqual(object.a, 'a', 'a');
      assert.strictEqual(object.b, undefined, 'b');
      assert.strictEqual(object[c], 'c', 'c');
      assert.strictEqual(object[d], undefined, 'd');
    });
    var constructors = ['Map', 'Set', 'Promise'];

    var _loop2 = function _loop2() {
      var name = _constructors[_i3];
      QUnit.test(name + "@@species", function(assert) {
        assert.strictEqual(GLOBAL[name][Symbol.species], GLOBAL[name], name + "@@species === " + name);
        var Subclass = create(GLOBAL[name]);
        assert.strictEqual(Subclass[Symbol.species], Subclass, name + " subclass");
      });
    };

    for(var _i3 = 0, _constructors = constructors; _i3 < _constructors.length; _i3++) {
      _loop2();
    }

    QUnit.test('Array@@species', function(assert) {
      assert.strictEqual(Array[Symbol.species], Array, 'Array@@species === Array');
      var Subclass = create(Array);
      assert.strictEqual(Subclass[Symbol.species], Subclass, 'Array subclass');
    });
    QUnit.test('Symbol.sham flag', function(assert) {
      assert.same(Symbol.sham, typeof Symbol() === 'symbol' ? undefined : true);
    });
  }

  QUnit.test('Symbol#description', function(assert) {
    assert.same(Symbol('foo').description, 'foo');
    assert.same(Symbol('').description, '');
    assert.same(Symbol(')').description, ')');
    assert.same(Symbol({}).description, '[object Object]');
    assert.same(Symbol(null).description, 'null');
    assert.same(Symbol(undefined).description, undefined);
    assert.same(Symbol().description, undefined);
    assert.same(Object(Symbol('foo')).description, 'foo');
    assert.same(Object(Symbol()).description, undefined); // if (DESCRIPTORS) {
    //   assert.ok(!Object.prototype.hasOwnProperty.call(Symbol('foo'), 'description'));
    //   const descriptor = Object.getOwnPropertyDescriptor(Symbol.prototype, 'description');
    //   assert.same(descriptor.enumerable, false);
    //   assert.same(descriptor.configurable, true);
    //   assert.same(typeof descriptor.get, 'function');
    // }

    if(typeof Symbol() == 'symbol') {
      assert.same(Symbol('foo').toString(), 'Symbol(foo)');
      assert.same(String(Symbol('foo')), 'Symbol(foo)');
      assert.same(Symbol('').toString(), 'Symbol()');
      assert.same(String(Symbol('')), 'Symbol()');
      assert.same(Symbol().toString(), 'Symbol()');
      assert.same(String(Symbol()), 'Symbol()');
    }
  });

  var es_symbol_asyncIterator = {};

  var defineWellKnownSymbol = defineWellKnownSymbol$6;

  // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator
  defineWellKnownSymbol('asyncIterator');

  QUnit.test('Symbol.asyncIterator', function(assert) {
    assert.ok('asyncIterator' in Symbol, 'Symbol.asyncIterator available');
    assert.nonEnumerable(Symbol, 'asyncIterator');
    assert.ok(Object(Symbol.asyncIterator) instanceof Symbol, 'Symbol.asyncIterator is symbol');

    if(DESCRIPTORS$4) {
      var descriptor = Object.getOwnPropertyDescriptor(Symbol, 'asyncIterator');
      assert.ok(!descriptor.enumerble, 'non-enumerable');
      assert.ok(!descriptor.writable, 'non-writable');
      assert.ok(!descriptor.configurable, 'non-configurable');
    }
  });

  // import "./es.object.create";
  // import "./es.object.define-properties";
  // import "./es.object.define-property";
  // import "./es.object.entries";
  // import "./es.object.from-entries";
  // import "./es.object.get-own-property-descriptor";
  // import "./es.object.get-own-property-descriptors";
  // import "./es.object.get-own-property-names";
  // import "./es.object.get-prototype-of";
  // import "./es.object.is";
  // import "./es.object.keys";
  // import "./es.object.set-prototype-of";
  // import "./es.object.values";
  // import "./es.set";
  // import "./es.map";

}());

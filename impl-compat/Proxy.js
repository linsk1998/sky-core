import { slice } from "../native/Array/prototype/slice";
import { isFunction } from "../utils/isFunction";
import { proxyFunction } from "../impl-modern/Proxy";
import { set } from "../impl-compat/Reflect/set";
import { get } from "../impl-compat/Reflect/get";
import { getPrototypeOf } from "../impl-compat/Object/getPrototypeOf";

export function Proxy(target, handler) {
	if(this instanceof Proxy) {
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

export function proxyObjectVB(me, target, handler) {
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
// window.VBProxyMethod = function(args, target, key, receiver, handler) {
// 	var method;
// 	if(handler.get) {
// 		method = handler.get(target, key, receiver);
// 	} else {
// 		method = get(target, key, receiver);
// 	}
// 	return method.apply(receiver, args);
// };

function createVBProxyFactory(keys) {
	var className = "VBProxyObject_" + (seq++);
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

var arrayMethods = [
	'entries', 'every', 'forEach', 'keys', 'values', '@@iterator',
	'at', 'find', 'findIndex', 'findLast', 'findLastIndex', 'includes', 'indexOf', 'lastIndexOf', 'some',
	'join', 'map', 'reduce', 'reduceRight',
	'concat', 'copyWithin', 'filter', 'flat', 'flatMap', 'slice', 'toReversed', 'toSorted', 'toSpliced', 'with',
	'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift',
];

export function proxyArrayVB(me, target, handler) {
	me = VBProxyArrayFactory();
	me.__proto__ = getPrototypeOf(target);
	me.constructor = target.constructor;
	me['@@Target'] = target;
	me['@@Handler'] = handler;
	arrayMethods.forEach(function(key) {
		me[key] = function() {
			var method = VBProxyArrayGetter(target, key, me, handler);
			return method.apply(target, arguments);
		};
	});
	return me;
}

window.VBProxyArraySetter = function(target, key, value, receiver, handler) {
	if(handler.set) {
		if(handler.set(target, key, value, receiver) === false) {
			throw new TypeError("'set' on proxy: trap returned falsish for property '" + key + "'");
		}
	} else {
		target[key] = value;
	}
};
window.VBProxyArrayGetter = function(target, key, receiver, handler) {
	if(handler.get) {
		return handler.get(target, key, receiver);
	} else {
		return get(target, key, receiver);
	}
};
window.VBProxyArrayMethod = function(target, key, receiver, handler) {
	var method = VBProxyArrayGetter(target, key, receiver, handler);
	var args = slice.call(arguments, 4);
	return method.apply(target, args);
};


var buffer = [
	"Class VBProxyArray",
	'	Public [__proto__]',
	'	Public [constructor]',
	'	Public [@@WeakMap]',
	'	Public [@@Target]',
	'	Public [@@Handler]'
];
var i = arrayMethods.length;
while(i--) {
	buffer.push('	Public [' + arrayMethods[i] + ']');
}
buffer = buffer.concat([
	'	Public Function valueOf()',
	'		valueOf = VBProxyArrayMethod([@@Target], "valueOf", Me, [@@Handler])',
	'	End Function',
	'	Public Function toLocaleString()',
	'		toLocaleString = VBProxyArrayMethod([@@Target], "toLocaleString", Me, [@@Handler])',
	'	End Function',
	'	Public Function toString()',
	'		toString = VBProxyArrayMethod([@@Target], "toString", Me, [@@Handler])',
	'	End Function',
	'	Public Property Get Default()',
	'		Default = Me.toString()',
	'	End Property',

	'	Public Property Let [length](val)',
	'		Call VBProxySetter([@@Target], "length", val, Me, [@@Handler])',
	'	End Property',
	'	Public Property Get [length]',
	'		[length] = VBProxyArrayGetter([@@Target], "length", Me, [@@Handler])',
	'	End Property',
	'End Class',
	'Function VBProxyArrayFactory()',
	'	Dim o',
	'	Set o = New VBProxyArray',
	'	Set VBProxyArrayFactory = o',
	'End Function'
]);
window.execScript(buffer.join('\n'), 'VBScript');
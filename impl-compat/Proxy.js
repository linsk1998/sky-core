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
export function proxyArrayVB(me, target, handler) {
	// TODO
}

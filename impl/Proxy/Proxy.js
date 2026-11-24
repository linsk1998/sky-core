import { isFunction } from "../../utils/isFunction";
import { anObject } from "../../utils/anObject";
import { slice } from "../../native/Array/prototype/slice";
import apply from "sky-core/pure/Reflect/apply";
import construct from "sky-core/pure/Reflect/construct";
import get from "sky-core/pure/Reflect/get";
import set from "sky-core/pure/Reflect/set";

export function Proxy(target, handler) {
	if(this instanceof Proxy) {
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

export function proxyFunction(me, target, handler) {
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
				return apply(target, this, arguments);
			}
		}
	};
	ProxyFunction.prototype = target.prototype;
	return ProxyFunction;
}
export function proxyObject(me, target, handler) {
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
import { ProxyArray, TARGET_KEY, HANDLER_KEY, arrayMethods } from "./ProxyArray";

export function proxyArray(me, target, handler) {
	// es5 版比 es3 版多出的能力：length 截持（实例自身的访问器）与下标读取
	//（原型链挂 target，沿链读到元素）。
	// 顺序：先在 ProxyArray 实例（原型链不含数组）上定义 length 访问器，
	// 再 setPrototypeOf 到 target——顺序颠倒会触发 Gecko 1.9.2 的
	// length-redeclaration；挂完原型后，ProxyArray.prototype 的共享方法被
	// target → Array.prototype 上的原生方法遮蔽，故需重新覆盖为共享方法。
	me = new ProxyArray();
	proxyProperty('length', me, target, handler);
	Object.setPrototypeOf(me, target);
	me.constructor = target.constructor;
	me[TARGET_KEY] = target;
	me[HANDLER_KEY] = handler;
	overrideMethods(me);
	return me;
}

function overrideMethods(me) {
	var proto = ProxyArray.prototype;
	var i = arrayMethods.length;
	while(i--) {
		me[arrayMethods[i]] = proto[arrayMethods[i]];
	}
}

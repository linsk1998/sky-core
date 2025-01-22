import { anObject } from "../utils/anObject";
import { slice } from "../native/Array/prototype/slice";

export function Proxy(target, handler) {
	if(this instanceof Proxy) {
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
				return Reflect.construct(target, arguments, this);
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
				return Reflect.get(target, key, this);
			}
		},
		set: function(value) {
			var r = handler.set ?
				handler.set(target, key, value, this) :
				Reflect.set(target, key, value, this);
			if(r === false) {
				throw new TypeError("'set' on proxy: trap returned falsish for property '" + key + "'");
			}
		}
	});
}
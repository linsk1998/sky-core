import { accessor } from "../support/accessor";
import { isFunction } from "../utils/isFunction";
import { proxyFunction, proxyArray, proxyObject } from "../impl-modern/Proxy";
import { proxyArrayVB, proxyObjectVB } from "../impl-compat/Proxy";

export function Proxy(target, handler) {
	if(this instanceof Proxy) {
		if(!target || !handler) throw new TypeError("Cannot create proxy with a non-object as target or handler");
		if(isFunction(target)) {
			return proxyFunction(this, target, handler);
		} else {
			if(accessor) {
				if(Array.isArray(target)) {
					return proxyArray(this, target, handler);
				} else {
					return proxyObject(this, target, handler);
				}
			} else {
				if(Array.isArray(target)) {
					return proxyArrayVB(this, target, handler);
				} else {
					return proxyObjectVB(this, target, handler);
				}
			}
		}
	} else {
		throw TypeError("Constructor Proxy requires 'new'");
	}
};

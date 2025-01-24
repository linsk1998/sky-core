import { isFunction } from "../utils/isFunction";
import { proxyFunction } from "../impl-modern/Proxy";

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

export function proxyObjectVB(me, target, handler) {
	var keys = [];
	var methods = [];
	for(var key in target) {
		if(!Object.hasOwn(target, key) && isFunction(target[key])) {
			methods.push(key);
		} else {
			keys.push(key);
		}
	}
	// TODO
	return me;
}
export function proxyArrayVB(me, target, handler) {
	// TODO
}

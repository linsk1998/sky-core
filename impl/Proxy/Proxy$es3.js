import { isFunction } from "../../utils/isFunction";
import { proxyFunction } from "./Proxy";
import { proxyArray$es3 } from "./proxyArray$es3";

// es3 降级实现（无访问器环境）：
// 数组代理放弃 length 截持与下标，仅通过方法调用触发截持；对象代理直接返回原对象。
export function Proxy$es3(target, handler) {
	if(this instanceof Proxy$es3) {
		if(!target || !handler) throw new TypeError("Cannot create proxy with a non-object as target or handler");
		if(isFunction(target)) {
			return proxyFunction(this, target, handler);
		} else if(Array.isArray(target)) {
			return proxyArray$es3(this, target, handler);
		} else {
			return proxyObject$es3(this, target, handler);
		}
	} else {
		throw TypeError("Constructor Proxy requires 'new'");
	}
};

// 对象代理在 es3 环境无法截持，直接返回原对象
export function proxyObject$es3(me, target, handler) {
	return target;
}

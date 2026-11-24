import { ProxyArray, TARGET_KEY, HANDLER_KEY } from "./ProxyArray";

// es3 数组代理：放弃 length 截持与下标，仅通过方法调用触发截持。
// length 不截持但仍可用：创建时取自 target，每次方法调用后同步。
export function proxyArray$es3(me, target, handler) {
	me = new ProxyArray();
	me.constructor = target.constructor;
	me[TARGET_KEY] = target;
	me[HANDLER_KEY] = handler;
	me.length = target.length;
	return me;
}

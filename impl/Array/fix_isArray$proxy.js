import { TARGET_KEY } from "../Proxy/ProxyArray";

// 数组代理（见 impl/Proxy/ProxyArray）以 @@target 为识别标记，
// 原生 isArray 不识别：传入原 isArray，返回补充了 @@target 识别的修复版
export function fix_isArray$proxy(base) {
	return function isArray(obj) {
		return base(obj) || !!(obj && obj[TARGET_KEY]);
	};
}

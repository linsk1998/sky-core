import { toString } from "../../native/Object/prototype/toString";

// @@target 是数组代理的识别标记（见 impl/Proxy/proxyArray$es3）
var TARGET_KEY = '@@target';

export function isArray(obj) {
	return toString.call(obj) === '[object Array]' || !!(obj && obj[TARGET_KEY]);
}

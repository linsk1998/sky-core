import { toString } from "../../native/Object/prototype/toString";
import { TARGET_KEY } from "../Proxy/ProxyArray";

// @@target 是数组代理的识别标记（见 impl/Proxy/ProxyArray），属于 isArray 实现的一部分
export function isArray(obj) {
	return toString.call(obj) === '[object Array]' || !!(obj && obj[TARGET_KEY]);
}

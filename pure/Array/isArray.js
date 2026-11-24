import { Array } from "../../native/Array";
import { isArray as impl_isArray } from "../../impl/Array/isArray";

var nativeIsArray = Array.isArray;
// 数组代理（见 impl/Proxy/proxyArray$es3）以 @@target 为识别标记，
// 原生 isArray 不识别，须在原有判定之上补充
export default nativeIsArray ? function isArray(obj) {
	return nativeIsArray(obj) || !!(obj && obj['@@target']);
} : impl_isArray;

import { log } from "../../native/Math/log";
import { LN2 } from "../../native/Math/LN2";

// from MDN
export function clz32(x) {
	var asUint = x >>> 0; // 将x转换为Uint32类型
	if(asUint === 0) {
		return 32;
	}
	return 31 - (log(asUint) / LN2 | 0) | 0; // "| 0"相当于Math.floor
}
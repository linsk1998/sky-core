import { isPrimitive } from "../../utils/isPrimitive";
import { allSymbols } from "../Symbol/Symbol";

// 通用兜底实现：无 getOwnPropertyNames/getOwnPropertySymbols 的环境用 for-in 枚举自有键，
// "@@" 前缀键经 allSymbols 还原为 Symbol polyfill 的符号
export function ownKeys(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	for(var key in obj) {
		if(Object.hasOwn(obj, key)) {
			if(key.slice(0, 2) === "@@") {
				if(key in allSymbols) {
					arr.push(allSymbols[key]);
				}
			} else {
				arr.push(key);
			}
		}
	}
	return arr;
}

import { isPrimitive } from "../../utils/isPrimitive";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { allSymbols } from "../Symbol/Symbol";

// 有 getOwnPropertyNames、无 getOwnPropertySymbols 的环境：
// 枚举自有键名，"@@" 前缀键经 allSymbols 还原为 Symbol polyfill 的符号
export function ownKeys$property(obj) {
	var arr = [];
	if(isPrimitive(obj)) {
		return arr;
	}
	var keys = getOwnPropertyNames(obj);
	var len = keys.length;
	for(var i = 0; i < len; i++) {
		var key = keys[i];
		if(key.slice(0, 2) === "@@") {
			if(key in allSymbols) {
				arr.push(allSymbols[key]);
			}
		} else {
			arr.push(key);
		}
	}
	return arr;
}

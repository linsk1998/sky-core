import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";

// 有 getOwnPropertySymbols 的环境：自有键名与自有符号直接拼接
export function ownKeys$symbol(obj) {
	return getOwnPropertyNames(obj).concat(getOwnPropertySymbols(obj));
}

// enumSetLikeHelper: 遍历 set-like 对象的 keys 迭代器
// 负责调 o.keys() + 校验返回值是对象，其余壳逻辑复用 enumIteratorHelper
import { enumIteratorHelper } from "../Iterator/enumIteratorHelper";

export function enumSetLikeHelper(o) {
	var it = o.keys();

	if(it === null || (typeof it !== 'object' && typeof it !== 'function')) {
		throw new TypeError('Set-like object keys method must return an object');
	}

	return enumIteratorHelper(it);
}

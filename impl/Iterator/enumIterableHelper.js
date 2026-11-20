import "sky-core/polyfill/Array/prototype/@@iterator";
import "sky-core/polyfill/String/prototype/@@iterator";
import iterator from "sky-core/pure/Symbol/iterator";
import { enumIteratorHelper } from "./enumIteratorHelper";

// 从 utils/createIteratorHelper 迁移而来
// 遍历可迭代对象：调用 o[Symbol.iterator]() 拿到迭代器再走 enumIteratorHelper
export function enumIterableHelper(o) {
	var it = o[iterator];

	if(!it) return null;

	it = it.call(o);
	return enumIteratorHelper(it);
}

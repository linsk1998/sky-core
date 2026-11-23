import { Error as native_Error } from "../../native/Error";
import { toString } from "../../native/Object/prototype/toString";

export function isError(obj) {
	// [[ErrorData]] 内部槽无法直接探测，Object.prototype.toString 的品牌检查是唯一跨 realm 可用的手段
	// DOMException 按规范也带 [[ErrorData]]，但它的 Symbol.toStringTag 会让 tag 变成 "DOMException"
	// Error.prototype 自己没有 [[ErrorData]]，而 Firefox 4- 把它的 tag 也报成 "Error"，只能显式排除
	var tag = toString.call(obj);
	return (tag === '[object Error]' || tag === '[object DOMException]') && obj !== native_Error.prototype;
}

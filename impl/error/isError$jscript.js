import { toString } from "../../native/Object/prototype/toString";

// jscript（IE6~8）裁剪版：宿主对象（含 DOMException）的 tag 一律是 [object Object]，
// DOMException 分支不会命中；Error.prototype 的 tag 误报是 Gecko 特性（FF4-），也与 jscript 无关
export function isError$jscript(obj) {
	return toString.call(obj) === '[object Error]';
}

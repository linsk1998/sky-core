import { Error } from "../../native/Error";
import { DOMException } from "../../native/DOMException";
import { isError } from "../../impl/error/isError";

// 通用版：不带 tier 的构建和 es2015 都走这里，新浏览器上原生 Error.isError 会把带 [[ErrorData]] 的 DOMException 误判成 false（Safari18.4+ / WebKit bug 292727），这种原生不保留
// 老浏览器没有原生实现，前半句短路，不会去 new 一个不可构造的 DOMException
if(!Error.isError || !Error.isError(new DOMException(""))) {
	Error.isError = isError;
}

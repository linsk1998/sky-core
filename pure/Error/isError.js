import { Error } from "../../native/Error";
import { DOMException } from "../../native/DOMException";
import { isError } from "../../impl/error/isError";

// 通用版：不带 tier 的构建和 es2015 都走这里，新浏览器上原生 Error.isError 会把带 [[ErrorData]] 的 DOMException 误判成 false（Safari18.4+ / WebKit bug 292727），这种原生不采用
// 原生不存在时前半句短路，不会去 new DOMException
var native_isError = Error.isError;

export default native_isError && native_isError(new DOMException("")) ? native_isError : isError;

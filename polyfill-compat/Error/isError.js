import { Error } from "../../native/Error";
import { isError$jscript } from "../../impl/error/isError$jscript";

// compat（IE6~8）必然无原生 Error.isError，直接安装 jscript 裁剪版
// （DOMException 判定与 Error.prototype 误报排除在该环境均为死代码，见实现注释）
Error.isError = isError$jscript;

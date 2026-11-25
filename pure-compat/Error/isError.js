import { isError$jscript } from "../../impl/error/isError$jscript";

// compat（IE6~8）必然无原生 Error.isError，直接导出 jscript 裁剪版
export default isError$jscript;

import { Error } from "../../native/Error";
import { isError } from "../../impl/error/isError";

// legacy / modern 两层共用这份（createRollupPlugin 的 legacy:["legacy","modern"] 会回落到这里；
// compat 有专属的 isError$jscript 裁剪版）
// 这些层的浏览器都早于原生 Error.isError，不会有原生误判 DOMException 的情况，无需合规探测
export default Error.isError || isError;

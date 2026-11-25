import { Error } from "../../native/Error";
import { isError } from "../../impl/error/isError";

// legacy / modern 两层共用这份（createRollupPlugin 的 legacy:["legacy","modern"] 会回落到这里；
// compat 有专属的 isError$jscript 裁剪版）
// 这些层的浏览器都早于原生 Error.isError（Chrome134+ / Firefox138+ / Safari18.4+），不存在原生误判 DOMException 的情况，只补缺失
if(!Error.isError) {
	Error.isError = isError;
}

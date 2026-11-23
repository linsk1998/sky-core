import { Error } from "../../native/Error";
import { isError } from "../../impl/error/isError";

// compat / legacy / modern 三层共用这份（createRollupPlugin 的 compat:["compat","modern"]、legacy:["legacy","modern"] 会回落到这里）
// 这些层的浏览器都早于原生 Error.isError，不会有原生误判 DOMException 的情况，无需合规探测
export default Error.isError || isError;

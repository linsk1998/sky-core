import { structuredClone } from "../impl/structuredClone$jscript";

// compat（IE6~8）必然无原生 structuredClone，直接导出 jscript 裁剪版
export default structuredClone;

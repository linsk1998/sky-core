import { structuredClone } from "../impl/structuredClone$jscript";

// compat（IE6~8）必然无原生 structuredClone，直接安装 jscript 裁剪版
window.structuredClone = structuredClone;

import { structuredClone } from "../impl/structuredClone";

// legacy 线必然无原生 structuredClone；浏览器能力跨度大（有无 Node/Event、有无 gOPD），
// 通用版的 utils 分派判定对各环境安全，故不走 modern 的 $es5 裁剪版
window.structuredClone = structuredClone;

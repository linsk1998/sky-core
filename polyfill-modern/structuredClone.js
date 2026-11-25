import { structuredClone } from "../impl/structuredClone$es5";

// modern tier 各浏览器均无原生 structuredClone（Chrome98/FF94/Safari15.4 起，都在 es2015 范围），直接安装 es5 裁剪版
window.structuredClone = structuredClone;

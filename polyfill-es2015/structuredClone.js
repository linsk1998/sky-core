import { structuredClone as native_structuredClone } from "../native/structuredClone";
import { structuredClone } from "../impl/structuredClone$es6";
import { fix_structuredClone$error } from "../impl/fix_structuredClone$error";

// es2015 tier 混合：Chrome98+/FF94+/Safari15.4+ 有原生（火狐克隆 Error 不保留原型，
// 需 fix 包装），更早的走 $es6 裁剪版
window.structuredClone = native_structuredClone ? fix_structuredClone$error(native_structuredClone) : structuredClone;

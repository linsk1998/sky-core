import { Reflect } from "../../polyfill/Reflect";
import { ownKeys } from "../../impl/Reflect/ownKeys";

// compat（IE6~8）必然无 getOwnPropertyNames/getOwnPropertySymbols，直接安装 for-in 版，
// 避免把 base 入口的能力探测与其他变体一并打包进来
Reflect.ownKeys = ownKeys;

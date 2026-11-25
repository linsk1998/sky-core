import { Reflect } from "../../polyfill/Reflect";
import { deleteProperty$es3 as deleteProperty } from "../../impl/Reflect/deleteProperty$es3";

// compat（IE6~8）无访问器，必然无原生 Reflect，直接安装 @@desc: 描述符存储版
Reflect.deleteProperty = deleteProperty;

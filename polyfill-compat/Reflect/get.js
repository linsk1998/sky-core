import { Reflect } from "../../polyfill/Reflect";
import { get$es3 as get } from "../../impl/Reflect/get$es3";

// compat（IE6~8）无访问器，必然无原生 Reflect，直接安装 @@desc: 描述符存储版
Reflect.get = get;

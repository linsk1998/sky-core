import { get$es3 as get } from "../../impl/Reflect/get$es3";

// compat（IE6~8）必然无原生 Reflect，直接导出 @@desc: 描述符存储版
export default get;

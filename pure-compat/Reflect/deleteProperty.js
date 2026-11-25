import { deleteProperty$es3 as deleteProperty } from "../../impl/Reflect/deleteProperty$es3";

// compat（IE6~8）必然无原生 Reflect，直接导出 @@desc: 描述符存储版
export default deleteProperty;

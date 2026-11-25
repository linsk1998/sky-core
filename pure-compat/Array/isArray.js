import { isArray } from "../../impl/Array/isArray";

// compat（IE6~8）必然无原生 isArray，直接用 toString 实现
export default isArray;

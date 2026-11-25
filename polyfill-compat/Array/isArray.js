import { Array } from "../../native/Array";
import { isArray } from "../../impl/Array/isArray";

// compat（IE6~8）必然无原生 isArray，直接安装 toString 实现
Array.isArray = isArray;

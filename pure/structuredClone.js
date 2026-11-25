import { structuredClone as native_structuredClone } from "../native/structuredClone";
import { structuredClone } from "../impl/structuredClone";
import { fix_structuredClone$error } from "../impl/fix_structuredClone$error";

// 有原生时也要包装：火狐等原生克隆 Error 不保留原型与自定义字段
export default native_structuredClone ? fix_structuredClone$error(native_structuredClone) : structuredClone;

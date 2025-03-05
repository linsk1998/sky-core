import { structuredClone as native_structuredClone } from "../native/structuredClone";
import { structuredClone } from "../impl/structuredClone";
import { structuredClone$fix } from "../impl-es2015/structuredClone";

export default native_structuredClone ? structuredClone$fix : structuredClone;
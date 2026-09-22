import { structuredClone as native_structuredClone } from "../native/structuredClone";
import { structuredClone, structuredClone$fix } from "../impl-es2015/structuredClone";

window.structuredClone = native_structuredClone ? structuredClone$fix : structuredClone;
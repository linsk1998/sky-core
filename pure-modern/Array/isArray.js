import { isArray as native_isArray } from "../../native/Array/isArray";
import { isArray } from "../../impl/Array/isArray";
import { fix_isArray$proxy } from "../../impl/Array/fix_isArray$proxy";

export default native_isArray ? fix_isArray$proxy(native_isArray) : isArray;

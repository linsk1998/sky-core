import { Error as native_Error } from "../native/Error";
import { fix_Error$proto } from "../impl/error/fix_Error$proto";

window.Error = fix_Error$proto(native_Error.prototype);
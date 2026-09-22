import { Error as native_Error } from "../native/Error";
import { fix_Error$proto } from "../impl/error/fix_Error$proto";

try {
	throw new native_Error("", { cause: 1 });
} catch(e) {
	if(!('cause' in e)) {
		window.Error = fix_Error$proto(native_Error.prototype);
	}
}

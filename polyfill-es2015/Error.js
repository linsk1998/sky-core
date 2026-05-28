import { Error as native_Error } from "../native/Error";
import { fix_Error$class } from "../impl/error/fix_Error$class";

try {
	throw new native_Error("", { cause: 1 });
} catch(e) {
	if(!('cause' in e)) {
		window.Error = fix_Error$class(native_Error);
	}
}

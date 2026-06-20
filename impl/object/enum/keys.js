import { Symbol } from "sky-core/pure/Symbol";
import { keys as native_keys } from "../../../native/Object/keys";
import { keys$es3 } from "./keys$es3";
import { keys$fixSymbol } from "./keys$fixSymbol";

export function keys(obj) {
	if(!native_keys) {
		return keys$es3(obj);
	} else if(Symbol) {
		return native_keys(obj);
	} else {
		return keys$fixSymbol(obj);
	}
}

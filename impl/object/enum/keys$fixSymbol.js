import { keys } from "../../../native/Object/keys";
import { isNotSymbolKey } from "./isNotSymbolKey";

export function keys$fixSymbol(obj) {
	return keys.call(Object, obj).filter(isNotSymbolKey);
}

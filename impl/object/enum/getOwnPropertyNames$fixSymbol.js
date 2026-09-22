import { getOwnPropertyNames } from "../../../native/Object/getOwnPropertyNames";
import { isNotSymbolKey } from "./isNotSymbolKey";

export function getOwnPropertyNames$fixSymbol(obj) {
	return getOwnPropertyNames(obj).filter(isNotSymbolKey);
}


import { getOwnPropertySymbols as symbol_getOwnPropertySymbols } from "../../impl-compat/Symbol/constructor";
if(!Object.getOwnPropertySymbols) {
	Object.getOwnPropertySymbols = symbol_getOwnPropertySymbols;
}
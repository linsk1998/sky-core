import { Object } from "../../native/Object";
import { getOwnPropertySymbols as symbol_getOwnPropertySymbols } from "../../impl/Symbol/constructor";
if(!Object.getOwnPropertySymbols) {
	Object.getOwnPropertySymbols = symbol_getOwnPropertySymbols;
}
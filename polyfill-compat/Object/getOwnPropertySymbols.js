import { Object } from "../../native/Object";
import { getOwnPropertySymbols } from "../../impl-compat/Symbol/constructor";
if(!Object.getOwnPropertySymbols) {
	Object.getOwnPropertySymbols = getOwnPropertySymbols;
}
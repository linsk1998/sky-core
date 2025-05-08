import { Object } from "../../native/Object";
import { getOwnPropertySymbols } from "../../impl-compat/Symbol";
if(!Object.getOwnPropertySymbols) {
	Object.getOwnPropertySymbols = getOwnPropertySymbols;
}
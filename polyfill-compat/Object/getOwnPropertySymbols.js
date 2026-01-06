import { Object } from "../../native/Object";
import { getOwnPropertySymbols } from "../../impl-compat/Object/getOwnPropertySymbols";

if(!Object.getOwnPropertySymbols) {
	Object.getOwnPropertySymbols = getOwnPropertySymbols;
}
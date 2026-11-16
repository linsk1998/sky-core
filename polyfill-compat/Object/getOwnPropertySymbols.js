import { Object } from "../../native/Object";
import { getOwnPropertySymbols } from "../../impl/object/enum/getOwnPropertySymbols";

if(!Object.getOwnPropertySymbols) {
	Object.getOwnPropertySymbols = getOwnPropertySymbols;
}
import { Object } from "../../native/Object";
import { fromEntries } from "../../impl/Object/fromEntries";
if(!Object.fromEntries) {
	Object.fromEntries = fromEntries;
}
import { Object } from "../../native/Object";
import { fromEntries } from "../../impl/object/fromEntries";

if(!Object.fromEntries) {
	Object.fromEntries = fromEntries;
}
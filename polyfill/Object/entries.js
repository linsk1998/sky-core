import { Object } from "../../native/Object";
import { entries } from "../../impl/object/enum/entries";

if(!Object.entries) {
	Object.entries = entries;
}
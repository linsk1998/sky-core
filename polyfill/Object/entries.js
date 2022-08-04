import { Object } from "../../native/Object";
import { entries } from "../../impl/Object/entries";
if(!Object.entries) {
	Object.entries = entries;
}
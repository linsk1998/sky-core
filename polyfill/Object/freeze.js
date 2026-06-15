import { Object } from "../../native/Object";
import { freeze } from "../../impl/object/restrict/freeze";
if(!Object.freeze) {
	Object.freeze = freeze;
}
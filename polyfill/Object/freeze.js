
import { freeze } from "../../impl/Object/freeze";
if(!Object.freeze) {
	Object.freeze = freeze;
}
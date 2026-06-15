import { Object } from "../../native/Object";
import { values } from "../../impl/object/enum/values";

if(!Object.values) {
	Object.values = values;
}
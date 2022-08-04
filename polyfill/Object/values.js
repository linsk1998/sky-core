import { Object } from "../../native/Object";
import { values } from "../../impl/Object/values";
if(!Object.values) {
	Object.values = values;
}
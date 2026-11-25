import { Object } from "../../native/Object";
import { isSealed } from "../../impl/object/restrict/isSealed";

if(!Object.isSealed) {
	Object.isSealed = isSealed;
}
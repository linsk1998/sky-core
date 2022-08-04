import { Object } from "../../native/Object";
import { isSealed } from "../../impl/Object/isSealed";

if(!Object.isSealed) {
	Object.isSealed = isSealed;
}
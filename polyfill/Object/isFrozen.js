import { Object } from "../../native/Object";
import { isFrozen } from "../../impl/object/restrict/isFrozen";

if(!Object.isFrozen) {
	Object.isFrozen = isFrozen;
}
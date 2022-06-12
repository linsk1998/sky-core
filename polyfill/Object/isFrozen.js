import { Object } from "../../native/Object";
import { isFrozen } from "../../impl/Object/isFrozen";

if(!Object.isFrozen) {
	Object.isFrozen = isFrozen;
}
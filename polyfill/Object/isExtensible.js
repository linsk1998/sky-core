import { Object } from "../../native/Object";
import { isExtensible } from "../../impl/object/restrict/isExtensible";

if(!Object.isExtensible) {
	Object.isExtensible = isExtensible;
}
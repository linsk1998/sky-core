
import { isExtensible } from "../../impl/Object/isExtensible";

if(!Object.isExtensible) {
	Object.isExtensible = isExtensible;
}
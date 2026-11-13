import { Object } from "../../native/Object";
import { hasOwn } from "../../impl/object/enum/hasOwn";

if(!Object.hasOwn) {
	Object.hasOwn = hasOwn;
}

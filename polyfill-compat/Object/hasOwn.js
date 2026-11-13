import { Object } from "../../native/Object";
import { hasOwn$jscript } from "../../impl/object/enum/hasOwn$jscript";

if(!Object.hasOwn) {
	Object.hasOwn = hasOwn$jscript;
}

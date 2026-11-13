import { Object } from "../../native/Object";
import { hasEnumBug } from "../../utils/hasEnumBug";
import { hasOwn } from "../../impl/object/enum/hasOwn";
import { hasOwn$jscript } from "../../impl/object/enum/hasOwn$jscript";

if(!Object.hasOwn) {
	if(hasEnumBug) {
		Object.hasOwn = hasOwn$jscript;
	} else {
		Object.hasOwn = hasOwn;
	}
}
